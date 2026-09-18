---
name: inventory-dashboard
description: Rebuild an inventory, warehouse or catalogue admin dashboard — a searchable stock table with expandable item detail, a stats side panel and a soft pastel stage. Use when the reference is a data-table product rather than a chart dashboard, when rows expand in place to show detail, or when the design is presented as an app card floating on a decorated background.
---

# Inventory — pastel admin dashboard

Fourth in this set. Where Stakent and Sequence are chart dashboards and Camellia is
print, this one is a **table product**: the screen exists to find a row and open it.
That changes what "faithful" means — get the table wrong and no amount of matching
lavender saves it.

## The stage, not the shell

This genre presents the app as a **card floating on a decorated background**, not as
a full-bleed application. So the outer page is a padded stage with the title above
it, dotted fields in the corners, and the app itself a 26px-radius card with a large
soft shadow.

That is a different structure from the dashboard skills, and their `height: 100dvh;
overflow: hidden` shell still applies — but to the *card*, not the document. The
card owns the height; the table scrolls inside it.

Draw the decoration in CSS rather than adding markup for it:

```css
.stage::before { background-image: radial-gradient(#d8d2f2 1.4px, transparent 1.5px);
                 background-size: 15px 15px; }
```

## What actually matters here

1. **The expandable row** — the one real interaction. See
   `references/table-and-detail.md`; the border treatment is the fiddly part.
2. **The search must search.** The panel is titled "Search for items". A search box
   that only looks like one is the single dishonest thing you can put on this
   screen, and it costs ten lines to make real.
3. **The palette ratio** — `references/stage-and-palette.md`. The accent is 2.2% of
   the reference; almost everything is quiet field.

## Measured palette

```
lavender stage  #efecff   (34.3% of the reference)
app surface     #fcfbff   (43.6%)
panel/cards     #ffffff   warm bloom #f8e7f4   lav bloom #ece8fb
violet          #b492ff   deep #8f6bff   soft #e9e2ff
coral (charts)  #fca1b0   line #f8798d   sky #64c3ff
ink #39393c     ink-2 #5b595d   ink-3 #a8a7ac   line #ececf2
```

The ink is neutral grey-black, not blue — unusual for this genre and worth not
"correcting" toward a blue-tinted slate out of habit.

## Type

Poppins, by measurement. The cover is 1370px wide and the title "Inventory
Dashboard" is ~24px tall, which is comfortably above the resolution floor that
stopped the glyph ranking on the Camellia sheet, so the method from
`../stakent-dashboard/references/font-matching.md` applies in full.

Mean IoU over `a e o y D b`, segmented from the title with connected components
(18 components, matching the 18 letters):

| font | mean |
|---|---|
| **Poppins** | **.826** |
| Outfit | .801 |
| Plus Jakarta Sans | .724 |
| Manrope | .710 |
| Nunito | .688 |
| Montserrat | .685 |
| Quicksand | .598 |

Poppins takes four of the six glyphs and the scores are high in absolute terms
(.8+), which is a stronger match than any of the other rebuilds in this repo.

## Traps met on this build

- **`<span class="thumb">` with a width does nothing.** A span is inline; the
  thumbnail collapsed to a hairline until it got `display: block`. Any "box" you
  build from a span needs its display set.
- **White copy over white cut-out shapes.** The promo card's decorative circles are
  white; the paragraph above them disappeared where they overlapped. Constrain the
  copy's measure rather than moving the art.
- **A detail grid whose image does not span its rows** leaves a void the size of the
  missing cells. `grid-row: span 3` on the image, and fields that fill 3×3.

## Still true from the other skills

Only `tokens.css` carries raw colours; a component's responsive overrides live in
that component's file; reset `p` margins; generate chart geometry from data; no
figure in two files; and check **every scroll container** at every breakpoint —
`../stakent-dashboard/references/verification.md`.

## Provenance

The design is an Envato Elements item by its author. Only the cover preview was
available — the product pages return 403 to anything but a browser — so this was
rebuilt from one image, and the layout beyond that single view is inferred. The
implementation is original code; the product photography is replaced by drawn
placeholders.
