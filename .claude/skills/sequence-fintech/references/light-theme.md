# Light-theme craft

A dark UI separates surfaces with lightness — five steps between `#060610` and
`#13131b` are legible as a hierarchy. A light UI has almost no room to do that:
white on near-white is one or two points. The separation has to come from
somewhere else.

## Hairlines and a whisper of shadow

```css
--hairline:   #e6e9ee;
--hairline-2: #eef1f5;             /* inside a card: rows, sub-dividers */
--lift: 0 1px 2px rgba(2, 32, 42, 0.04);
```

Cards are `#ffffff` on `#e0e5eb`, with a 1px hairline **and** the lift. Either one
alone is not enough: the border defines the edge, the shadow says which side is on
top. Resist stacking anything heavier — this design is flat and crisp, and a 12px
blur turns it into a different, softer product.

Note the shadow color is not black. `rgba(2, 32, 42, .04)` carries the ink's blue
cast; a neutral black shadow on a cool grey ground reads as dirt.

## Emphasis without fills

The active nav item in the sidebar is **white with the lift**, on the grey rail.
That is the light-theme equivalent of the dark theme's lighter fill: the element
comes forward rather than changing hue. Save colored fills for things that are
genuinely brand moments — the balance banner, the primary button, the chart.

## Radii and rhythm

Consistent and generous: ~14px on cards and fields, ~10px on buttons and icon
tiles, pill on chips and status badges. A light UI with mixed radii looks
unfinished in a way a dark one hides.

## Type

- Ink `#001c2c` for primary, `#4a5665` for secondary, `#7d8594` for muted labels
  and footnotes.
- `font-variant-numeric: tabular-nums` everywhere amounts stack — the table, the
  stat cards, the chart axis, the balance. Proportional figures in a column of
  money is the most common tell of a rebuilt fintech screen.
- Uppercase micro-labels (`GENERAL`, table headers) at 11px/600 with +0.5–0.6px
  tracking. Uppercase without tracking looks cramped at that size.

## Icons

1.5px stroke on a 24×24 grid — one notch lighter than the 1.6px that suits a dark
theme, because dark backgrounds visually thicken light strokes and light ones do
the opposite.

Square icon tiles (40px, `--r-md`) take a solid brand fill with a contrasting
glyph: white on teal, dark green on brand green. Never brand green with white.

## Status colors

Success is `--pos` text on `--pos-soft`; pending is `--ink-3` on a neutral tint.
Both are quiet. In a banking UI, a loud "Pending" chip reads as an error, and the
row's meaning should come from its content, not from how much the badge shouts.
