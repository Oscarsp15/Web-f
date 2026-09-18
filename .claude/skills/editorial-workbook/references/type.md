# Choosing the type when the reference is too small to measure

## The glyph-ranking method has a resolution floor

The sibling skill `stakent-dashboard` ranks candidate typefaces by per-glyph pixel
overlap against glyphs segmented out of the reference. On a 1600px dashboard
screenshot, a heading glyph is 20–45px tall and that works.

This reference is **600px wide**, and the cover heading is about 14px tall. At that
size a glyph is a dozen pixels of antialiasing; IoU between two candidates is noise,
and a ranking built on it would be a confident number with nothing behind it.

So: say so, and fall back to a visual comparison done properly.

```html
<!-- upscale the crop, don't smooth it -->
<div style="image-rendering: pixelated;
            background-image: url(/reference.jpg);
            background-size: 2400px 4772px;      /* 4x the natural size */
            background-position: -1224px -360px;
            width: 520px; height: 200px"></div>
```

Then render each candidate beneath it at a comparable size and look. State in the
write-up that this was a visual judgement, not a measured one. An honest "I judged
this by eye because the source has 14 pixels of heading" is worth more than a table
of IoU scores the image cannot support.

## What to look for, in order

At 4x the crop resolves enough to answer three questions, and they are the ones
that matter:

1. **Stroke contrast** — how different are the thick and thin strokes? This
   reference is *low* contrast, which immediately eliminates the didones. Playfair
   Display, the default reach for "elegant serif", has hairlines this design does
   not have.
2. **Serif weight and bracketing** — sturdy, bracketed serifs here, not the fine
   flat ones of a Cormorant or a Crimson. Those two read as too delicate at any
   size.
3. **Weight** — DM Serif Display is a display *bold*; against an even, book-weight
   heading it is plainly too heavy.

Candidates worth having on the sheet: Lora, EB Garamond, Spectral, Libre
Baskerville, Crimson Pro, Playfair Display, Cormorant Garamond, DM Serif Display,
Instrument Serif. Nine costs one render.

The pick here was **Lora**: low contrast, sturdy bracketed serifs, a book weight
that matches, and a large enough x-height to hold up in the small page footers.

## The second face

The reference's labels — `FOR COACHES`, `CAMELLIA SILLS`, `PHARETRA DICTUMST` — are
letterspaced uppercase sans at a very small size. That is a distinct role, not a
fallback, and it carries as much of the template's character as the serif does.

**Jost** works: geometric, light, and it holds tracking at 10px without the letters
falling apart. Set those labels at 10–11px with 1.4–1.6px of tracking; inside a
page, express the tracking in `cqw` so it scales with the type.

Two faces is the whole system here. A third would be a fourth voice in a design
whose restraint is the point.

## Rendering type inside a scalable page

Everything inside `.page` is in container query units, tracking included:

```css
.page__title   { font-size: 9cqw; letter-spacing: -0.14cqw; }
.page__eyebrow { font-size: 2.1cqw; letter-spacing: 0.22cqw; }
.page__foot    { font-size: 1.9cqw; letter-spacing: 0.24cqw; }
```

The negative tracking on the display size and the positive tracking on the small
caps are both proportional, so a thumbnail is a true miniature of the page rather
than the same page with the wrong spacing.
