# Working from a brand guide

## Read every image before starting

The Sequence reference arrived as four images. Three were screens; the fourth was
a "Mini Brand Guide" carrying the typeface and the two brand colors with their tint
ramps. Opening the screens first and starting to measure would have been wasted
work on the part that the guide answers exactly.

Whenever a set of references is handed over, look at all of them before writing
anything. A guide, a style tile, a component sheet or even a screenshot of a design
system page changes the method from *extract* to *comply*.

## Measure anyway — to confirm, not to decide

Sampling the dashboard returned `#025864` for the banner and `#00d47e` for the
chart bars: exactly the guide's values. That agreement is the useful result,
because it tells you the screens and the guide are the same version of the brand.

When they disagree:

- **Brand colors** — the guide wins. A screen may be an older export.
- **Neutrals, hairlines, state colors, hovers** — the measurement wins. Guides
  almost never document the grey a divider uses, and inventing one is how a build
  drifts.

## The official ramps

Each step is roughly 20% toward white. Sampled from the guide's swatches:

```
teal    #025864   #2a737d   #538d96   #7ba8ae   #a4c3c7
green   #00d47e   #29db93   #52e2a7   #7ae9bc   #a3f0d1
```

Use these and nothing between them. A tint you mixed yourself will be close enough
to look like a mistake rather than a decision.

## Neutrals and states, measured from the screens

```
page ground     #e0e5eb     sidebar     #f5f7f9     surface     #ffffff
hairline        #e6e9ee     hairline-2  #eef1f5
ink             #001c2c     ink-2       #4a5665     ink-3       #7d8594
positive text   #008229     negative text  #ee0037
```

Note the ink is `#001c2c` — a near-black with a blue cast, not `#111`. Light
themes have very little room to separate surfaces by lightness, so the few points
of hue in the ink and the hairline are doing real work.

## Two greens, deliberately

`--green` (`#00d47e`) is the **fill** green: chart bars, the Add button, the card
face. `--pos` (`#008229`) is the **type** green: "+15.8%", "45.0%".

The brand green is roughly 1.9:1 against white — unreadable as 12px text. The
darker green clears 4.5:1. Keep them as separate tokens with names that say what
they are for, or someone will reach for the brand color on a label and ship
illegible type while believing they were being faithful.

The same split applies to the pill backgrounds: `--pos-soft` (`#e6f6ec`) behind
`--pos` text, never brand green behind white.

## Helvetica

The guide says Helvetica, in Bold / SemiBold / Medium / Regular. Helvetica is not
free-licensed for web embedding and is on no free CDN, so a `@font-face` for it is
not an option. What ships:

```css
--ui: "Helvetica Neue", Helvetica, Arimo, Arial, "Liberation Sans", sans-serif;
```

- Apple devices resolve `Helvetica Neue` and render the real thing.
- Everyone else falls to **Arimo** (Google Fonts, OFL), metrically compatible with
  Arial, which is metrically compatible with Helvetica. Same advance widths, so
  line breaks and layout are identical across platforms even though the letterforms
  differ slightly — that metric compatibility is the entire reason to choose Arimo
  over a "nicer" grotesque.
- Do not substitute Inter. Its taller x-height and more open apertures read as a
  different brand, and it is not metrically compatible, so your line breaks move.

Write this down in the README. Claiming "we used Helvetica" would be false on most
machines that load the page.
