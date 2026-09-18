# Architecture, and the traps that actually bit

Plain ES modules, no bundler, no framework, no dependencies. Everything a static
host can serve, which is the point: the page loads from GitHub Pages with nothing
but the files in the repo.

```
index.html                  # semantic shell — renders before JS runs
assets/css/tokens.css       # :root tokens + reset. The only file with raw colors
assets/css/layout.css       # shell, grids, breakpoints
assets/css/components.css   # every repeated object
assets/js/data.js           # single source of truth for every figure
assets/js/icons.js          # data-icon placeholders, hydrated on load
assets/js/sparkline.js      # chart geometry generated from the series
assets/js/coin-logos.js     # inline SVG marks
assets/js/components/*.js   # one module per region of the screen
assets/js/app.js            # bootstrap
```

## Static shell, data-driven lists

`index.html` carries the structural chrome — sidebar, top bar, section
containers — so the page renders something even if a module fails or the network
stalls. The **repeating, data-bearing** parts (asset cards, sidebar positions,
stat tiles) render from `data.js`.

The rule is not "server-render everything" or "render everything in JS". It is:
**no figure appears in two files.** When the stake balance lives both in the HTML
and in the object that drives the period slider, they drift. One object, several
consumers.

## Only tokens.css holds raw colors

After any palette change, grep the other stylesheets:

```bash
grep -nE "#[0-9a-fA-F]{3,8}" assets/css/layout.css assets/css/components.css \
  | grep -v "rgba(255, 255, 255"
```

What survives should be a short list of deliberate exceptions: text on an accent
fill, gradient stops, a hard-coded translucent white. Anything else is a color
that will not follow the next retheme.

## The cascade trap that cost a round

`components.css` loads after `layout.css`. Both are authored by the same person on
the same day, so it is easy to put a component's base rule in one and its
responsive override in the other:

```css
/* layout.css */
@media (max-width: 720px) { .search { display: none; } }

/* components.css — loaded LATER */
.search { display: flex; }
```

Equal specificity, later file wins, **the media query is irrelevant**. The search
box never hid, and the mobile menu button — same shape of bug — never appeared, so
the drawer was unreachable on a phone. The symptom was 236px of horizontal
overflow at 390px wide, which is how it was found.

Rule: **a component's responsive overrides live in the same file as the
component.** Layout-level breakpoints (grid column counts, shell behaviour) belong
in `layout.css` because the selectors they touch are only defined there.

## The `<p>` margin trap

Reset `p` along with the headings. A browser's default `p { margin: 1em 0 }` is
computed from the paragraph's **own** font-size, so a 26px number carries a 26px
margin. On the Sequence build this silently inflated every stat card from 120px to
199px; the cards looked deliberately airy rather than broken, which is why it took
a measurement to notice:

```js
// children total 76px, container reports 199px -> the gap is margin, not layout
[...card.children].map((k) => k.getBoundingClientRect().height)
```

Reset `p` in the same block as `h1..h4` and `ul`, and let `gap` do the spacing.

## Shell height

A dashboard is not a document:

```css
.app  { height: 100vh; height: 100dvh; overflow: hidden; }
.main { overflow-y: auto; min-height: 0; }
```

Without this the sidebar caps at the viewport while the page grows with the
content, and the two columns end at visibly different heights — reported by the
user, twice, in two different forms. `min-height: 0` on the scrolling flex child is
required or it refuses to shrink below its content.

Then match the content pane's bottom padding to the sidebar's. At full scroll the
last panel and the sidebar's footer card should land on the same line; a 12px
mismatch reads as "the sidebar is longer" and was, in fact, reported that way.

## Charts from data

Never hand-author path data. Generate it:

- **Sparkline** — map the series into the viewBox, convert to cubic beziers with a
  Catmull-Rom spline (control points at `p1 ± (p2 − p0)/6`), then add the area
  fill by closing the same path to the baseline, a dashed rule at the opening
  level, sampled node dots, and an emphasized endpoint with a halo.
- **Diverging bars** — one scale for both directions and the zero line drawn once,
  or the bars will not meet it. Leave `viewBox` room for the outermost labels and
  the endpoint halo.

Give every drawn shape an explicit `fill`, take chart text color from the theme
tokens, and make sure every axis label names a value the chart actually reaches.

## Icons

A registry of 24×24 stroke paths plus `data-icon="name"` placeholders in the
markup, hydrated once on load. This keeps the HTML readable, makes size a per-use
decision, and means an icon is changed in one place.

Watch the selector when the placeholder wraps the SVG: `.tab svg { margin-left:
auto }` does nothing, because the flex item is the wrapping `<span>`, not the
`<svg>` inside it. Target `[data-icon]`.

## Accessibility that costs nothing

Landmarks (`<aside>`, `<header>`, `<main>`, `<nav>`), `aria-pressed` on toggles,
`aria-selected` on tabs, `aria-expanded` on the accordion, `aria-current="page"` on
the active nav item, `aria-label` on every icon-only button, and a visible
`:focus-visible` ring.

For a custom slider, put a real `<input type="range">` at `opacity: 0` over the
drawn track and style the knob as a sibling. Pointer, touch and keyboard all work,
and `:focus-visible ~ .knob` gives the focus ring.
