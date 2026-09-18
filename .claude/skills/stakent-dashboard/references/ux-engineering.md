# Rebuilding as a UX engineer, not a screenshot matcher

A visual copy that matches the reference pixel for pixel can still be a bad
product. The reference is **one state, at one width, with ideal content**. It is
maybe 5% of what you have to ship. The other 95% — every other width, every
interaction state, every content length, every input device — is not in the image,
and nobody will hand it to you.

This is the part of the job where you stop transcribing and start designing.

## What the screenshot does not contain

For every component you rebuild, decide these before you call it done:

| dimension | what the mockup shows | what you must decide |
|---|---|---|
| **width** | one, usually ~1440 | 360 → 1920, and where it changes shape |
| **state** | rest | hover, focus-visible, active, disabled, loading, error |
| **content** | ideal length | a 40-character name, a 9-figure amount, an empty list |
| **input** | a mouse | touch, keyboard, screen reader |
| **motion** | frozen | what animates, and what happens under `prefers-reduced-motion` |

If you cannot answer one of these from the design, that is a real question for
whoever owns the product — not a gap to paper over silently.

## Responsive is a priority decision, not a shrink

The instinct is "make it fit". That produces a phone screen that technically has no
horizontal scroll and is still unusable.

A worked example from this project. The Sequence top bar holds a menu button, a
search field, a date range, a period selector and Export. On a phone the first fix
— letting the row wrap — removed the sideways scroll and produced **218px of chrome
before any content**, on an 844px screen. A quarter of the viewport spent on
controls nobody opened the app to use.

The second fix asked what is actually primary:

- **Search** is primary → shares row one with the menu button, `flex: 1`.
- **Date range, period, Export** are secondary → row two, in a strip that scrolls
  sideways *on purpose*. Every function stays reachable; none of them costs vertical
  space it has not earned.

Result: 122px instead of 218px, everything still reachable. The overflow was the
symptom; the hierarchy was the bug.

The same reasoning applies to the balance banner: four actions will not fit one
phone row, and wrapping left a lone overflow `…` button orphaned on a row of its
own, which reads as breakage. Two by two, full-width targets, done.

## Don't put desktop affordances on a phone

The search field shows a `⌘ + F` hint. On a phone there is no Command key, so the
hint is decoration pretending to be help. Hide it below the breakpoint.

Audit for the rest of this family: hover-only reveals, right-click menus, tooltips
with content that exists nowhere else, drag targets under 44px, and text that says
"click".

## Interactive things must look and behave interactive

If a mockup shows a slider, ship a control that responds to pointer, touch **and**
keyboard. The pattern that costs nothing:

```html
<div class="slider">
  <input type="range" aria-label="Contribution period in months" />
  <span class="knob" aria-hidden="true"></span>
</div>
```

`input` at `opacity: 0` stretched over the drawn track, the visible knob as a
sibling, `:focus-visible ~ .knob` for the ring. You get the native semantics, the
native keyboard handling and full control of the pixels.

Conversely, do not invent interactions the design does not imply. A filter chip in
a static rebuild can toggle its own appearance; it should not pretend to filter
data that does not exist. Say so in a comment.

## States the design never shows

- **Loading** — something that replaces the content must be replaced by something,
  not by a collapse of the layout.
- **Empty** — an empty table is not zero rows of nothing; it is a sentence.
- **Error** — the gallery's skill viewer cannot always reach a file. It renders the
  reason **and a link that does work**, rather than an empty panel. An error state
  that leaves the user with a next action is a feature; a blank box is a bug.
- **Long content** — a name that wraps, an amount with four more digits, a label in
  German. Test with the worst plausible string, not the demo one.

## Accessibility is a build step, not a review step

None of this is expensive if you do it while writing the component:

- Landmarks (`<aside>`, `<header>`, `<main>`, `<nav>`), and one `<h1>`.
- `aria-pressed` on toggles, `aria-selected` on tabs, `aria-expanded` on
  disclosures, `aria-current="page"` on the active nav item.
- `aria-label` on every icon-only button. "More" is not a label; "More actions" is.
- A visible `:focus-visible` ring everywhere, including on custom controls.
- Charts get `role="img"` and one accurate sentence. Nineteen unlabelled bars are
  noise to a screen reader.
- Respect `prefers-reduced-motion`, and never park content at `opacity: 0` waiting
  for an observer — the first still frame is what a thumbnail, a shared link and a
  skimming reader all get.

## Semantic color is not brand color

The Sequence brand green `#00d47e` is ~1.9:1 on white — fine as a bar fill,
illegible as a 12px label. The design needs a second, darker green `#008229` for
type. Name the tokens for their job (`--green` vs `--pos`) or someone will reach
for the brand color on a label and ship unreadable text while believing they were
being faithful.

Same rule for status: success, warning and danger are a scale the user reads at a
glance. They are not decoration and they are not the accent.

## Content is design material

- Real copy, including the boring parts. The legal disclaimer at the bottom of a
  transfer screen is part of why it reads as a real product.
- `font-variant-numeric: tabular-nums` wherever figures stack. Proportional digits
  in a column of money is the most common tell of a rebuilt fintech screen.
- Name things the way a user would: a person manages *notifications*, not *webhook
  config*. A button says what happens — "Publish", then a toast that says
  "Published".

## Verify the behaviour, not just the picture

A screenshot comparison cannot see a scroll container that moves sideways, a focus
ring that never appears, or a tap target that is 28px. Drive the page:

- Every breakpoint you support, checking **every scroll container** — see
  `verification.md`, where exactly this went wrong.
- Tab through the whole page; every stop visible, order sensible.
- Open the drawer, close it with Escape and with the scrim.
- Measure the top chrome's height on a phone and ask whether it earned that space.

## The honest report

When you hand the work back, separate what you verified from what you inferred.
"No horizontal scroll at 390px" is a claim you can check in one line. "It feels
right on a phone" is not. On this project I reported the first and the user found
the second — sideways movement on a real phone — because my check measured the
document while the app shell scrolled the pane inside it. The fix was one CSS
property; the lesson was about the claim, not the code.
