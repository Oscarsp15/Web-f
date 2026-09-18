# Measuring color from a reference image

Everything here exists because eyeballing failed. On this project every value I
picked by eye was wrong by enough to be noticed, and every value I measured
survived review.

## Why a canvas, and why same-origin

Reading pixels needs `CanvasRenderingContext2D.getImageData`, which throws a
`SecurityError` on a canvas tainted by a cross-origin — or `file://` — image.
Serving the reference over plain HTTP from the same origin as the page doing the
reading is the whole trick:

```bash
cd <folder with the reference>
python3 -m http.server 8099
```

```js
const page = await browser.newPage();
await page.goto('http://localhost:8099/');   // same origin as the image below
const result = await page.evaluate(async () => {
  const img = new Image();
  img.src = '/design.jpg';                    // same origin -> canvas stays clean
  await img.decode();
  const c = document.createElement('canvas');
  c.width = img.width;
  c.height = img.height;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(img, 0, 0);
  // ... sample here
});
```

`willReadFrequently: true` matters: without it Chromium keeps the canvas on the
GPU and every `getImageData` round-trips, which turns a few hundred samples into
a visible stall.

## Sampling flat surfaces

Average a block. Never trust one pixel — JPEG chroma subsampling and ringing move
a single pixel by several points, and PNG screenshots of gradients dither.

```js
const hex = (r, g, b) =>
  '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');

const avg = (ctx, x, y, size = 9) => {
  const d = ctx.getImageData(x - (size >> 1), y - (size >> 1), size, size).data;
  let r = 0, g = 0, b = 0;
  for (let i = 0; i < d.length; i += 4) { r += d[i]; g += d[i + 1]; b += d[i + 2]; }
  const n = d.length / 4;
  return hex(r / n, g / n, b / n);
};
```

Pick the sample point in the middle of a genuinely flat region: away from borders,
text, icons and the edge of a gradient. If two candidate points disagree by more
than a point or two, one of them is on something you did not intend to sample.

## Sampling text

**Do not average text.** Anti-aliasing blends each stroke toward the background,
so the mean of a glyph's box is a color that appears nowhere in the design — it is
always somewhere between the type color and the surface.

Take the extreme instead:

```js
// Dark UI: the brightest pixel in the box. Light UI: the darkest.
const textColor = (ctx, x0, y0, w, h, dark = true) => {
  const d = ctx.getImageData(x0, y0, w, h).data;
  let best = [0, 0, 0];
  let bestL = dark ? -1 : 1e9;
  for (let i = 0; i < d.length; i += 4) {
    const L = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
    if (dark ? L > bestL : L < bestL) { bestL = L; best = [d[i], d[i + 1], d[i + 2]]; }
  }
  return hex(...best);
};
```

The extreme pixel errs toward the background, never past it, so it is a lower
bound on how light (or an upper bound on how dark) the real type color is. On thin
small text at 12px the stroke may never reach full opacity, so treat the result as
"this or slightly more extreme".

A useful sanity check: if the primary text samples at `#ffffff` or `#000000` you
have your answer exactly, because the extreme cannot overshoot.

## Sample the whole ladder, not one surface

Dark product UIs typically have four or five surfaces within ten points of each
other, and a copy feels wrong when the *ordering* or the *spacing* of that ladder
is off, even if each individual value looks plausible. Sample every step:

- the outermost chrome (sidebar, top bar)
- the content ground
- card fill — **and the top and bottom of each card**, which is how you discover
  whether a gradient exists at all
- nested surfaces (a stat card inside a panel)
- active rows, chips, segmented-control tracks and their selected pill
- buttons, both the accent fill and any translucent variant
- every gradient's stops, sampled along its axis

What this produced on Stakent, against what I had guessed:

| surface | guessed | measured |
|---|---|---|
| sidebar / topbar | `#14161d` | `#060610` |
| content ground | `#101218` | `#090913` |
| cards, panels | `#181b23` with a gradient | `#0b0b15`, flat |
| nested stat cards | `#181b23` | `#10101a` |
| active nav row, chips | `#1d212a` | `#13131b` |
| primary text | `#e9ebf2` | `#ffffff` |
| secondary text | `#a1a7b6` | `#97979f` |
| muted text | `#6c7382` | `#8c8d8f` |
| accent (buttons) | `#bdaaf8` | `#bfb2fd` |

Two findings were structural rather than cosmetic:

1. **The cards have no gradient.** Top and bottom sampled identically. I had built
   a `linear-gradient(180deg, …)` from imagination.
2. **The neutrals are violet-cast** — R≈G with B a few points higher — not the
   blue-grey I assumed. That is the difference between "a dark dashboard" and
   *this* dark dashboard.

Also note the muted text came out **lighter** than my guess while the surfaces came
out **darker**. Guessing compresses contrast toward the middle; measuring does not.

## Gradients

Sample along the gradient's axis at five or six points and reconstruct rather than
approximating with two stops. The Stakent promo card:

```
top-left  #020317   top-right #010214
mid-left  #0d082a   mid-right #04041a
low-left  #7e66bc   low-mid   #5e45a0   low-right #7057b2
```

That ordering says the glow rises from the **bottom edge, centered**, not from a
corner — which is what I had built. Rebuilt as a radial at `50% 110%` over a dark
vertical base.

## Verifying your own build

Same rig, pointed at your page instead of the image. `getComputedStyle` is enough
and is more robust than re-screenshotting:

```js
const bg = (sel) => getComputedStyle(document.querySelector(sel)).backgroundColor;
```

Compare each measured target against the corresponding computed value. On Stakent
this caught two surfaces I had wired to the wrong token after the palette rewrite
(the sidebar was still on `--panel`, the stat cards still on `--card`).

## Contrast

After matching a measured palette, check the muted text against its surface. If it
lands under about 4.5:1, keep the hue from the reference and lift only the
lightness — and say that you did. Silently shipping unreadable text to match a
mockup is not fidelity, it is a bug.
