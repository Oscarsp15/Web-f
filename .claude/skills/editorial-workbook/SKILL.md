---
name: editorial-workbook
description: Rebuild an editorial or print-derived layout — a workbook, brand template, lookbook or course kit — as a web page. Use when the reference is a page template rather than a product UI, when the sheet shows many page variants at once, when the design leans on a repeated shape motif and letterspaced small caps, or when the original is full of photography you have no right to use.
---

# Camellia — editorial workbook template

Third in this set, and the first that is **not a product UI**. That difference is
the whole skill: the two dashboard skills assume a screen that gets operated, and
almost none of their instincts transfer to a page that gets printed.

## What changes when the reference is print

| | product UI | page template |
|---|---|---|
| unit of layout | the viewport | a fixed-ratio sheet |
| scroll | a pane scrolls inside a fixed shell | the document scrolls, normally |
| hierarchy | interactive affordances | typographic rhythm and white space |
| repetition | components reused across states | one page system reused across 100 pages |
| content | real data | placeholder text, which *is* the product |
| success | operable | reads as a printed artefact |

Concretely: do **not** reach for `height: 100dvh; overflow: hidden` here. That
pattern is right for a dashboard and wrong for a sheet of samples. Let the page
scroll.

## The unit is a page, and it must scale

Every sample on the sheet is the same object at three sizes — a 120px thumbnail in
the wall, a 260px page in a row, a 520px hero. Hard-coded `px` type inside it
breaks at two of the three.

Use **container queries**: `container-type: inline-size` on `.page`, then express
everything inside it in `cqw`. A title at `9cqw` is 9% of its page's width whether
the page is a thumbnail or the hero, so the internal proportions of the layout —
which is what a page template actually is — survive every size.

```css
.page { container-type: inline-size; aspect-ratio: 0.773; }  /* 8.5 x 11 in */
.page__title { font-size: 9cqw; line-height: 1.02; }
.page__eyebrow { font-size: 2.1cqw; letter-spacing: 0.22cqw; }
```

Note the tracking is in `cqw` too. Letterspacing that stays at `1.6px` while the
type scales from 6px to 48px is the tell of a template rebuilt without this.

## Photography you cannot use

The reference is built on portraits. They belong to their photographer, and a
rebuild has no licence to them.

Draw the image wells instead — and draw them as **graphics, not as pseudo-photos**.
My first attempt filled each arch with a soft figure-shaped mass; it read as an
out-of-focus photograph, i.e. as a rendering fault rather than a choice. Replacing
it with concentric arcs in the template's own clay says "image goes here" and reads
as art direction. Say in the page's own colophon that the portraits were replaced
and why.

## Keep the Latin

The reference's filler — *Class ridiculus facilisi lobortis* — is not something to
replace with real prose. On a template the placeholder **is** the content: it is
what the buyer sees and what shows how the layout behaves with text. Swapping it
for real copy misrepresents the product. Keep it where the original had it, and use
real language only for the presentation copy around the pages.

## References

- `references/motif-and-palette.md` — the arch, the measured warm palette, and why
  the "most saturated pixel" trick fails on a cream sheet
- `references/type.md` — choosing the serif when the reference is too small to
  measure, and the resolution floor of the glyph-ranking method
- Shared with the other skills: `../stakent-dashboard/references/ux-engineering.md`
  and `../stakent-dashboard/references/verification.md`

## Measured palette

```
sheet  #f0e7e0   (the presentation ground, 15.6% of the reference)
paper  #fbf8f4   clay #a45c45   clay-deep #8c4b37
tint   #cf9f8c   wash #ecd9cf
ink    #241d19   ink-2 #6b5f57   ink-3 #9d9088   rule #ddd1c7
```

Warm near-black, never `#000`, on cream. And the page shadow carries the ground's
hue — `rgba(80, 56, 42, .06)` — because a neutral grey shadow on a warm sheet reads
as dirt.

## Still true from the other skills

- Only `tokens.css` carries raw colours.
- A component's responsive overrides live in that component's file.
- Reset `p` margins with the headings.
- No figure appears in two files; the pages render from `data.js`.
- Check **every scroll container** at every breakpoint, not just the document.

## Provenance

The design is a Canva workbook template presented on Behance by its author. This is
an original implementation: no assets, fonts or photography from the original are
included, and the image areas are drawn.
