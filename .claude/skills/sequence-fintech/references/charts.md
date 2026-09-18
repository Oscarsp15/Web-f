# The diverging cash-flow chart

Income above a zero line, expense below, one bar pair per day.

## One scale, one zero line

The failure mode is applying the scale twice — once for the upward bars and once
for the downward ones — which leaves the two halves disagreeing about where zero
is by a pixel or two. The give-away is a hairline gap or overlap along the axis.

```js
const max = 5;            // € 5K
const min = -3;           // € 3K, drawn below
const span = max - min;
const y = (v) => PAD.top + ((max - v) / span) * plotH;
const zero = y(0);        // computed once, used by both directions and the axis
```

Both bars are then positioned relative to that single `zero`:

```js
const incH = Math.max(2, zero - y(d.income) - gap);
const expH = Math.max(2, y(-d.expense) - zero - gap);
// income: y = zero - gap - incH      expense: y = zero + gap
```

The `gap` (about 3px) is deliberate: in the reference the two bars of a day do not
touch the axis, they clear it. `Math.max(2, …)` keeps a near-zero day visible as a
stub rather than vanishing.

## Scale and layout

- `viewBox="0 0 720 260"` with `preserveAspectRatio="none"` and a CSS width of
  100%: the chart stretches horizontally with its card while the vertical scale
  stays fixed. Padding: 44 left (axis labels), 8 right, 14 top, 26 bottom (date
  ticks).
- Bar width: `Math.min(14, slot * 0.46)` where `slot = plotW / bars.length`. The
  cap stops bars from becoming slabs when there are few days.
- Radius 2.5 on every bar, both ends. The reference rounds the outer end and the
  rounding at the axis end is hidden behind the gap anyway.

## Axis and grid

Gridlines only at values the chart actually reaches: `€ 5K`, `€ 0`, `€ 3K`.
Labels are right-aligned at `PAD.left - 10`, baseline nudged `+4` to sit visually
centered on the line.

Date ticks are vertical `--hairline-2` lines at evenly spaced sample days, with the
label centered beneath at `VIEW.h - 8`. Four labels across ~19 bars: step by
`bars.length / ticks.length` rather than hard-coding indices, so the data can grow.

The zero line is drawn **last**, over the bars, in `--ink-3` at 45% opacity, so it
reads as an axis rather than as another gridline.

## Color and theming

Income `var(--teal)`, expense `var(--green)` — the two brand colors, which is what
makes this chart look like this brand rather than like a chart. Chart text takes
`fill: var(--ink-3)` from CSS, not a literal, so it follows the tokens.

Every drawn shape gets an explicit `fill`. An SVG shape with no fill attribute
inherits black, which is invisible on a dark theme and wrong on a light one.

## Accessibility

The `<svg>` gets `role="img"` and an `aria-label` that states what the chart shows
and over what period. Nineteen unlabelled bars are noise to a screen reader; one
accurate sentence is not.
