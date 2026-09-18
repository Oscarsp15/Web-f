---
name: sequence-fintech
description: Build a light-theme fintech dashboard and money-transfer flow in the Sequence style — teal and green on near-white, diverging cash-flow bars, balance banner, activity table, stepper checkout. Use when recreating a banking or payments UI from a screenshot, when a brand guide image accompanies the design, or when a design specifies Helvetica and you must decide what to actually ship on the web.
---

# Sequence — light fintech dashboard

Companion to `stakent-dashboard`. That skill extracts a spec from pixels; this one
is about **complying with a spec you were handed** — a different job, and an easier
one, provided you notice you were handed it.

## The one rule

**Read every reference image before writing anything.**

The Sequence set was four images. Three were screens; the fourth was a Mini Brand
Guide naming the typeface and both brand colors with their tint ramps. Starting
with the screens would have meant measuring my way toward an answer that was
already written down.

Then measure anyway — to *confirm* the guide, not to decide. Sampling the dashboard
returned exactly `#025864` and `#00d47e`. That agreement is the useful signal: the
screens and the guide are the same version of the brand.

## Order of work

1. **Inventory the references.** Guide present? → `references/brand-spec.md`
2. **Build the token file from the guide plus measured neutrals.** Guides never
   document hairlines, hovers or state colors; measure those.
3. **Lay out the screens** → `references/screens.md`
4. **The chart is the hard part** → `references/charts.md`
5. **Light-theme craft** — hairlines over fills → `references/light-theme.md`
6. **Verify and report** — reuse `stakent-dashboard/references/verification.md`.

## The three things most likely to go wrong

**Two greens, not one.** `--green` `#00d47e` is for fills (chart bars, the Add
button, the card face). `--pos` `#008229` is for text. The brand green is ~1.9:1 on
white and illegible as 12px type; using it on a label while believing you are being
faithful is the trap. Separate tokens, named for their job.

**Helvetica is not shippable.** No free web license, on no free CDN. Ship
`"Helvetica Neue", Helvetica, Arimo, Arial, "Liberation Sans", sans-serif`: Apple
devices get the real face, everyone else gets Arimo, which is metrically compatible
with Arial and therefore with Helvetica, so line breaks are identical everywhere.
Not Inter — different metrics, different voice. Say so in the README; "we used
Helvetica" would be false on most machines.

**Default `<p>` margins.** A browser's `1em` margin is computed from the
paragraph's own font-size, so a 26px amount carries a 26px margin. This inflated
every stat card here from 120px to 199px and looked like deliberate airiness rather
than a bug. Reset `p` alongside `h1..h4`.

## Brand values

```
teal    #025864   #2a737d   #538d96   #7ba8ae   #a4c3c7
green   #00d47e   #29db93   #52e2a7   #7ae9bc   #a3f0d1

ground  #e0e5eb   rail #f5f7f9   surface #ffffff
hairline #e6e9ee  ink #001c2c    ink-2 #4a5665   ink-3 #7d8594
positive text #008229          negative text #ee0037
```

## Non-negotiables

Shared with `stakent-dashboard`, and each one is here because it broke something:

- Only `tokens.css` carries raw colors.
- A component's responsive overrides live in that component's file, or a later
  stylesheet silently beats the media query.
- The shell owns the viewport (`height: 100dvh; overflow: hidden`); the content
  pane scrolls inside it.
- Chart geometry is generated from data, with one scale and one zero line.
- No figure appears in two files — `data.js` is the source for every screen.
- Tables get `overflow-x: auto` on a wrapper so the page never scrolls sideways.

## Provenance

The visual design is a Dribbble shot by its author (brand guide credited to
Dipa.inhouse); the implementation is original code, and no third-party brand assets
are vendored — the flags, the card motif and every icon are drawn.
