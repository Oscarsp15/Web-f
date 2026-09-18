---
name: stakent-dashboard
description: Rebuild a dark crypto-staking dashboard in the Stakent style, or any dark data-dense product UI from a screenshot. Use when someone asks to copy or recreate a dashboard design from an image, when they report that a rebuilt page's colors or typeface "don't match" the reference, or when they need the measuring technique (pixel sampling, per-glyph font ranking) that makes a copy faithful instead of approximate.
---

# Stakent — dark staking dashboard

Turn a dashboard screenshot into a working page whose color and type **match** the
original rather than merely resembling it.

## Two rules

**Measure the reference; do not eyeball it.**

On this project every value I chose by eye was caught by the user as wrong, and
every value I measured survived review. The page looked fine at each stage — that
is exactly why eyeballing is dangerous. "A dark dashboard" and *this* dark
dashboard differ by about ten points of lightness and a hue cast you cannot name
from memory.

**Then design everything the screenshot does not contain.** A mockup is one state,
at one width, with ideal content — maybe 5% of what ships. Matching it perfectly
and stopping there produces a page that is pixel-correct at 1440 and unusable on a
phone. That happened here: the rebuild was reported clean and a user found the
content pane sliding sideways under their thumb.

## Order of work

1. **Read every reference image first.** If one of them is a brand guide, the
   identity is handed to you and the job changes completely — see the sibling skill
   `sequence-fintech`.
2. **Measure the palette** before writing CSS → `references/measuring-color.md`
3. **Rank typefaces by glyph overlap** → `references/font-matching.md`
4. **Build** on the module layout, watching the four traps →
   `references/architecture.md`
5. **Design the 95% the screenshot does not contain** — other widths, interaction
   states, empty and error content, touch and keyboard →
   `references/ux-engineering.md`
6. **Verify, then report honestly** → `references/verification.md`

## What the measurements actually said

Worth internalizing before your first guess on the next design:

| surface | my guess | measured |
|---|---|---|
| sidebar / topbar | `#14161d` | `#060610` |
| content ground | `#101218` | `#090913` |
| cards | `#181b23` **with a gradient** | `#0b0b15`, **flat** |
| primary text | `#e9ebf2` | `#ffffff` |

The cards had no gradient at all — I had invented one. The neutrals are
violet-cast (R≈G, B a few points higher), not blue-grey. And the muted text
measured *lighter* than I guessed while the surfaces measured *darker*: guessing
compresses contrast toward the middle.

For type, mean per-glyph IoU across seven candidates put **General Sans** first at
.752 and the Space Grotesk I had picked by eye **last** at .589.

## Screen anatomy

Sidebar: brand lockup, a two-way segmented control, a nav list with badges and a
`Beta` tag, an expandable positions group, a promo card pinned to the bottom.
Top bar: user chip, an accent-filled primary action, notifications with a count,
search, settings. Content: an eyebrow line with a count chip, a large heading with
filter chips pushed right, three asset cards each carrying a big rate, a delta and
a sparkline that bleeds to the card's edges; a gradient promo card beside them.
Below: a panel with a position summary, a custom ruler slider, four metric tabs
and four stat tiles the tabs rewrite.

## Non-negotiables

- Only `tokens.css` carries raw colors.
- A component's responsive overrides live in that component's file, or a later
  stylesheet silently beats the media query — this is how the mobile menu button
  became invisible.
- Reset `p` margins with the headings; a 26px number carries a 26px default margin
  and inflates every card.
- The shell owns the viewport (`height: 100dvh; overflow: hidden`) and the content
  pane scrolls inside it, so both columns end together.
- Chart geometry is generated from the data, never hand-authored.
- No figure appears in two files.

## Provenance

The visual design is a Dribbble shot by its author; the implementation is original
code. Never trace a commercial typeface's outlines — rank free faces and pick one,
or fork an OFL face and adjust it under a new name.
