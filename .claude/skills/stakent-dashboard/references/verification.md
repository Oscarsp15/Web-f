# Verifying a rebuild, and what to say about it

A copy is not done when it looks right in your head. These are the checks that
caught real defects on this project, in the order they caught them.

## The rig

One Playwright script, run after every meaningful change:

```js
const browser = await chromium.launch();
for (const [name, w, h] of [['desktop', 1440, 980], ['mobile', 390, 844]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await page.goto('http://localhost:8098/', { waitUntil: 'load' });
  await page.waitForTimeout(500);
  console.log(name, await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    cards: document.querySelectorAll('.asset-card').length,
    // ...counts for anything rendered by JS
  })), errors);
  await page.screenshot({ path: `${name}.png` });
}
```

Counting rendered nodes is worth as much as the screenshot: it fails loudly when a
module throws halfway and leaves an empty container that a thumbnail would show as
"a bit of blank space".

## Checks

**Horizontal overflow must be exactly 0 — in every scroll container, not just the
document.** This is the check I got wrong, and a user found it on a real phone
after I had reported the page clean.

With an app-shell layout the document never scrolls:

```css
.app  { height: 100dvh; overflow: hidden; }
.main { overflow-y: auto; }          /* overflow-x computes to auto as well */
```

so `document.documentElement.scrollWidth - clientWidth` is **0 by construction**,
while `.main` slides sideways under the user's thumb. Check every element whose
computed `overflow-x` is `auto` or `scroll`, plus the document:

```js
const INTENTIONAL = ['table-wrap', 'topbar__right'];   // deliberate scrollers
const bad = [];
const check = (el, label) => {
  const over = el.scrollWidth - el.clientWidth;
  if (over > 1 && !INTENTIONAL.some((c) => el.classList?.contains(c))) {
    bad.push(`${label} +${over}px`);
  }
};
check(document.documentElement, 'document');
document.querySelectorAll('*').forEach((el) => {
  const ox = getComputedStyle(el).overflowX;
  if (ox === 'auto' || ox === 'scroll') check(el, el.className);
});
```

Two traps inside the fix itself:

1. **Do not excuse an element because an ancestor clips it.** My first corrected
   checker skipped any node with a clipping ancestor — which skipped `.main`,
   whose parent is `overflow: hidden`. It reported all-clear while 14px of
   sideways scroll remained.
2. **Allowlist deliberate scrollers explicitly**, by class. A wide table inside
   `overflow-x: auto` is the designed behaviour; silently excusing *every*
   `auto` container hides real bugs.

Both offenders on this project were the same shape: a flex row without
`flex-wrap`. A top bar with three long buttons, and a card head with three action
buttons — neither could wrap, so both pushed the pane sideways at 390px. Run the
check at 360, 390, 414, 768, 1024 and 1440; 24 combinations across four pages took
seconds and is the difference between "looks fine" and "is fine".

When something does overflow, find the culprit rather than guessing:

```js
const vw = document.documentElement.clientWidth;
[...document.querySelectorAll('*')]
  .map((el) => ({ el, r: el.getBoundingClientRect() }))
  .filter(({ r }) => r.right > vw + 1 && r.width > 0)
  .slice(0, 15)
  .map(({ el, r }) => `${el.tagName}.${el.className} right=${Math.round(r.right)}`);
```

This is what identified the cascade bug: the offender was `.search`, which was
supposed to be `display: none` at that width.

**Computed colors match the measured targets.** `getComputedStyle` on the real
elements, compared against the table from the measuring pass. This caught two
surfaces still wired to the old token after a palette rewrite.

**Geometry claims get measured, not eyeballed.** "The sidebar looks longer than the
content" became a specific 12px number by reading `getBoundingClientRect().bottom`
on both columns at full scroll, at two viewport heights. Fix, re-measure, quote the
numbers.

**The webfont actually applied.** A silent fallback looks fine and is not the
design. Compare the computed `font-family` and, if you want certainty, the rendered
width of a test string against the fallback stack.

**Keyboard**: Tab through the nav, chips, slider and tabs; every stop visible.

## The side-by-side

Screenshot your build at the reference's proportions, then stack the reference
above it at the same width in a throwaway page and capture both. Differences that
are invisible when flipping between two windows are obvious when they are 40px
apart on one image.

Expect a scale difference: a mockup exported at 1600px wide may represent a 1728px
or 1440px canvas, so your type can be proportionally larger while every internal
ratio is right. Do not chase that by shrinking everything — check the *relationships*
instead.

## Reporting

State what you could not check, in the same breath as what you could.

Real example from this project: the sandbox proxy broke TLS for Chromium, so the
font CDN was unreachable in-browser. The screenshots were taken with the same
`.woff2` injected as a base64 `@font-face`, and the published page's font loading
was verified only at the HTTP level — the stylesheet returns 200 with four weights.
That is a materially weaker claim than "I saw it render", and saying so is the
difference between a report someone can act on and one they have to re-check.

Likewise, when a deploy is involved: "pushed" is not "published". Confirm the
workflow run concluded, that the URL returns 200, and that the served asset
actually contains the change — for ES modules also check the MIME type, since a
wrong `Content-Type` leaves the shell rendered and every import dead.

```bash
curl -s -o /dev/null -w '%{http_code} %{content_type}\n' "$base/assets/js/app.js"
curl -s "$base/assets/css/tokens.css" | grep -- '--bg:'
```

## Correcting yourself

When a measurement contradicts something you already asserted, say so plainly and
move on — including when the earlier claim was one you volunteered as evidence. On
this project I described the reference's parentheses as "squared" and used it as a
font-matching criterion; measuring showed they are 3 pixels wide, where no claim
about shape is supportable. One sentence, correction made, work continues.
