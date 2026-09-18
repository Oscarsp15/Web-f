# The arch, and measuring a warm palette

## One shape carries the whole template

Strip this design down and what is left is an arch: a rectangle with a semicircular
top. It appears as a portrait well, as a full circle, as a softened dome, as a
colour band. That single motif is what makes 100 pages read as one product.

Draw it with the radius tied to the container, not to pixels:

```css
.arch        { border-radius: 50cqw 50cqw 0 0; }  /* a true semicircle at any size */
.arch--full  { border-radius: 50cqw; }
.arch--soft  { border-radius: 46% 46% 6% 6%; }
```

`50cqw` is half the container's width, so the curve stays a semicircle whether the
page is a thumbnail or the hero. A fixed `border-radius: 120px` would flatten on a
small page and over-round on a large one — the give-away that a motif was drawn at
one size only.

When you identify a motif like this, apply it to **more than the obvious element**.
Here: the portrait wells, the author avatar, the badge, the seal in the lockup, and
the softened dome on the contents pages. A motif used once is a shape; used across
the system it is an identity.

## Measuring a warm, low-contrast sheet

The dashboards in the sibling skills are dark, with big separations between
surfaces. A cream editorial sheet is the opposite: the ground, the paper and the
tinted panels sit within twenty points of each other, and the accent occupies well
under 1% of the image.

**The "most saturated pixel" trick fails here.** With saturation computed as
`(max − min) / max`, a near-black antialiased text pixel like `#411103` scores
higher than the flat terracotta you are trying to find. Sampling the accent this
way returned near-black three times.

What works is a **mode over colour families**: quantise every pixel of the sheet,
count the bins, then take the most populous bin inside each family.

```js
const bins = new Map();
for (let k = 0; k < d.length; k += 4) {
  const key = `${d[k] >> 3}_${d[k + 1] >> 3}_${d[k + 2] >> 3}`;
  const e = bins.get(key) || { n: 0, r: 0, g: 0, b: 0 };
  e.n++; e.r += d[k]; e.g += d[k + 1]; e.b += d[k + 2];
  bins.set(key, e);
}
const all = [...bins.values()]
  .map((e) => ({ n: e.n, r: e.r / e.n, g: e.g / e.n, b: e.b / e.n }))
  .sort((a, z) => z.n - a.n);

// the accent: reddish, mid-lightness
all.filter((e) => e.r > 130 && e.r - e.b > 45 && e.g > 80 && e.g < 170)[0];
```

A flat fill is, by definition, the most common colour in its family. That returned:

```
clay   #a45c45   (0.7% of the sheet — small, but dominant in its family)
paper  #faf6f3 / #fcf9f5
sheet  #f0e7e0   (15.6%, the single most common colour)
shade  #ede4dd, #e4dbd4
```

The percentages are worth reading, not just the hexes. The accent being under 1% of
a presentation sheet tells you how sparingly to use it: two solid cards out of nine,
a badge, a seal, a page number. Reproduce that ratio and the rebuild feels right
even before anything is aligned.

## Warm neutrals need warm everything

- Ink is `#241d19`, a warm near-black. Pure `#000` on cream looks like a printing
  error.
- The page shadow is `rgba(80, 56, 42, 0.06)` — the ground's hue at low alpha. A
  neutral grey shadow on a warm sheet reads as dirt, the same way a black shadow on
  a cool grey does in the Sequence build.
- Rules are `#ddd1c7`, not grey. Every hairline in an editorial layout is visible
  type-adjacent furniture; a cool rule on warm paper looks like a different design.

## Ratio before pixels

The sheet is a print template, so pages keep a paper ratio (`0.773` for US Letter)
rather than filling anything. Set it once as a token and let `aspect-ratio` do the
work. It is also what lets a page be dropped into a three-up wall, a four-up row or
a hero without a single size being written twice.
