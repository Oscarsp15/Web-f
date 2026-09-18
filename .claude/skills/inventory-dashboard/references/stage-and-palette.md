# The stage, the palette, and the ratio

## An app card on a decorated ground

This genre — pastel admin UI as sold on Envato and Dribbble — does not present a
full-bleed application. It presents a **card**:

- a padded stage in the page's accent tint,
- the product title sitting outside the card, top-left,
- dotted fields in the corners as decoration,
- the app itself with a large radius (26px here) and a wide, soft, tinted shadow.

The shadow is the part most often got wrong. It is `0 24px 60px rgba(83, 66, 140,
.1)` — large, offset downward, and **violet**, because the ground is lavender. A
neutral black shadow under a card on a coloured field reads as grime, the same
lesson as the warm sheet in the Camellia skill and the cool grey in Sequence.

Draw the decoration in CSS, not markup. Two pseudo-elements on the stage carry the
dot fields, which keeps the DOM about the product:

```css
.stage::before,
.stage::after {
  background-image: radial-gradient(#d8d2f2 1.4px, transparent 1.5px);
  background-size: 15px 15px;
}
```

Hide them below the phone breakpoint. Decoration that costs layout on a small screen
is not decoration any more.

## The blooms behind the side panel

The reference's app card is not flat: its left third carries a soft warm bloom,
pink fading into lavender, under the search panel. Two overlapping radial gradients
on a pseudo-element, behind everything, with `pointer-events: none`:

```css
.app::before {
  inset: 0 auto 0 0; width: 420px;
  background: radial-gradient(90% 70% at 18% 22%, var(--wash-pink), transparent 70%),
              radial-gradient(80% 60% at 6% 62%, var(--wash-lav), transparent 72%);
}
```

Everything above it needs `position: relative; z-index: 1` or the panel content
disappears under the wash.

## Measure the ratio, not just the hexes

Running the colour-family mode over the whole cover (the technique in
`../../editorial-workbook/references/motif-and-palette.md`) returns both the values
and **how much of the image each one occupies**:

```
#fcfbff  43.6%   the app surface
#efecff  34.3%   the lavender stage
#b492ff   2.2%   the violet accent
#fca1b0   0.24%  the coral used in the charts
```

That distribution is the design. Almost four fifths of the picture is one of two
near-whites; the accent appears on one button, one promo card, one active rail icon
and the selected checkbox; the coral exists only inside two small charts.

Reproduce the ratio and the rebuild feels right before anything is aligned. Spend
the violet on a second button or tint a few table rows with it and the page stops
looking like this design, even though every colour is correct.

## Sampling notes specific to a pastel UI

- Surfaces are within a few points of each other (`#fcfbff` against `#efecff`), so
  average a 9×9 block — a single pixel cannot separate them.
- Text is dark on light, so the **darkest** pixel in the glyph box is the text
  colour, the mirror of the dark-UI rule.
- The ink came back `#39393c` / `#5b595d` / `#a8a7ac`: a neutral grey ramp with no
  blue in it. Habit says "slate" for an admin UI; the measurement says otherwise,
  and the measurement is the design.

## One source only

Envato's product pages return 403 to `curl` (bot protection), so only the cover
preview was available. That is worth stating plainly in the build: everything
outside that single view — other screens, hover states, the grid view's real
design — is inferred, not copied. A rebuild from one image is still a rebuild, but
the reader should know which parts were seen and which were reasoned.
