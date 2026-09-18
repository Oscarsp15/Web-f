# The Sequence screens, region by region

## Dashboard

### Sidebar

272px, `#f5f7f9`, hairline on the right, full viewport height with its own scroll.

- Brand lockup: the shield mark in teal, the wordmark at 19px/700, and a collapse
  button pushed right.
- Two labelled groups — `GENERAL` (Dashboard, Payment, Transaction, Cards) and
  `SUPPORT` (Capital, Vaults, Reports, Earn). The label is 11px, 600, +0.6px
  tracking, uppercase, in `--ink-3`.
- `Cards` carries a chevron (expandable); `Earn` carries a `€ 150` pill in the
  green tint.
- The **active** item is white with the soft lift shadow, not a tinted fill. In a
  light UI on a grey rail, "raised and white" is the available emphasis; a colored
  fill would be louder than this design ever gets.
- Pinned to the bottom: Settings, Help, a Pro Mode row with a real toggle, a user
  chip (avatar, name, email, chevron) in a bordered white box, and a centered
  copyright line.

### Top bar

Search field with a `⌘ + F` hint on the right of the input; on the far right a date
range button, a "Last 30 days" select and Export. All three are the same quiet
button: white, hairline border, 38px.

### Balance banner

Full-width teal panel, `--r-lg`. Label at 13.5px in 78% white; the amount at
clamp(26px, 3.2vw, 34px)/500 with tabular figures; a green-tinted delta beside it.
Actions pushed right: **Add** in brand green with dark-green text, **Send** and
**Request** as translucent white on teal, and an overflow `…` icon button.

The background carries the brand's rounded-square motif at about 7% white —
oversized outlined squares, cropped by the panel. Keep it *barely* visible; render
it with `preserveAspectRatio="xMaxYMid slice"` so the squares stay square and crop
at the left rather than stretching into rectangles.

### Cash flow

Card head: a swap icon in teal, the title, then a Weekly/Daily segmented control
and a Manage button pushed right.

The chart is a diverging bar chart — see `charts.md`. To its right, separated by a
vertical hairline (which becomes a horizontal one when the layout stacks), the
income and expense totals: a 40px icon tile, a label, a 22px amount and a delta.
Income's tile is teal, expense's is brand green.

### Three account cards

Icon, label, "Last 30 days" pushed right; a large amount with a delta; a
`vs. … Last Period` footnote in `--ink-3`. Compact — about 120px tall. If yours are
near 200px, you have not reset `<p>` margins.

### Recent activity

Table with `TYPE / AMOUNT / STATUS / METHOD` headers at 11px/600 with tracking,
between two hairlines. Each row: a circular soft-green mark with a direction icon,
the counterparty name, then `kind · date` beneath it; the amount with its secondary
currency beneath; a status pill (Success in green tint, Pending in grey); the
method with a masked number beneath.

Every cell's secondary line is a block-level element — if the primary is an inline
`<b>` the two run together on one line, which is a real bug I shipped once.

Wrap the table in `overflow-x: auto` with a `min-width` on the table itself, so
narrow viewports scroll the table rather than the page.

### My Cards

A teal card face at `aspect-ratio: 1.62`, with the motif again at 7% white, an
italic VISA wordmark, a masked number, and the balance at the bottom. A green sliver
peeks out from behind the top edge to suggest a second card in the stack.

## Transfer flow

A separate page; no sidebar.

- **Bar**: brand lockup at the left, a four-step rail centered (Amount → Recipient
  → Review → Pay), a close button at the right that returns to the dashboard. The
  current step's dot is brand green with a soft ring; the rest are hollow with a
  grey border; a 2px connector runs between them. Hide the rail on phones rather
  than letting it squeeze.
- **Column**: 640px, centered, generous vertical rhythm.
- **Amount field**: a bordered 14px-radius box with the currency symbol, a 24px
  input, and a currency button carrying a small circular flag (draw the flags —
  don't fetch images for two of them).
- **Fee breakdown**: a bordered panel whose rows are prefixed by faint operator
  glyphs — `·`, `·`, `−`, then a rule, then `=` and `×`. Those operators are what
  make the panel read as a calculation instead of a list; they are the single most
  characteristic detail on the screen. Linked labels get a subtle underline with
  offset.
- **Recipient gets**: the same field component with the other currency.
- **Arrival line**, then a small square "schedule" icon button beside a full-width
  teal Continue button.
- **Disclaimer** at the bottom in `--ink-3`, max ~62 characters wide. Keep the real
  legal copy; it is part of why a fintech screen reads as real rather than as a
  mock.
