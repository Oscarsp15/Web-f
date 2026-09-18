# Identifying a typeface from a screenshot

The premise: dashboards in this genre are usually set in a commercial grotesque —
Aeonik, PP Neue Montreal, Söhne — so the job is not "name the font" but "find the
closest free face", and closeness is measurable. Do not pick from memory. I did,
chose Space Grotesk, and it ranked **last of seven** when finally measured.

## Getting the candidate files

In a sandboxed environment the browser frequently cannot reach font CDNs (TLS
through the egress proxy fails) while `curl` can. So fetch with `curl` and serve
locally.

**Google Fonts** — the CSS contains several `@font-face` blocks, one per unicode
subset. The **last** one is `latin`; the first is usually `latin-ext` or cyrillic
and is missing most of what you want to test:

```bash
UA='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36'
curl -s -A "$UA" "https://fonts.googleapis.com/css2?family=DM+Sans:wght@500" -o dmsans.css
url=$(grep -o "https://fonts.gstatic.com[^)]*\.woff2" dmsans.css | tail -1)
curl -s -o dmsans.woff2 "$url"
```

Without the desktop user-agent Google serves `.ttf` instead of `.woff2`.

**Fontshare** — URLs in their CSS are protocol-relative, so prepend the scheme:

```bash
curl -s "https://api.fontshare.com/v2/css?f%5B%5D=general-sans@500" -o gs.css
url=$(grep -o "//cdn\.fontshare\.com[^')]*\.woff2" gs.css | head -1)
curl -s -o general-sans.woff2 "https:${url}"
```

Sanity-check the file sizes. A 4KB "woff2" is a subset with almost no glyphs; a
real latin subset is 13–26KB.

Candidates worth testing for the Aeonik/Neue Montreal family: **General Sans,
Switzer, Satoshi** (Fontshare) and **DM Sans, Onest, Instrument Sans** (Google).
Include whatever you were about to pick by eye, so the comparison is honest.

## Do not score whole phrases

My first attempt rendered "Top Staking Assets" per candidate and compared it to a
crop. The ranking flipped between test strings — Satoshi won the heading, Switzer
won the digits, Space Grotesk won a third string — because **letter-spacing
dominates the pixel overlap**. You end up measuring tracking, not letterforms.

Score single glyphs. They have no tracking.

## Segmenting glyphs out of the reference

Find them structurally. Hand-guessed crop coordinates were wrong on my first try —
the cell I labelled `g` actually contained "As" — and a wrong crop produces a
confident, meaningless number.

Threshold the region, then run 8-connected component labelling:

```js
const components = ({ m, w, h }, minArea) => {
  const seen = new Uint8Array(w * h);
  const boxes = [];
  for (let i = 0; i < w * h; i++) {
    if (!m[i] || seen[i]) continue;
    const stack = [i];
    seen[i] = 1;
    let x0 = w, y0 = h, x1 = -1, y1 = -1, area = 0;
    while (stack.length) {
      const q = stack.pop();
      const qx = q % w, qy = (q - qx) / w;
      area++;
      if (qx < x0) x0 = qx; if (qx > x1) x1 = qx;
      if (qy < y0) y0 = qy; if (qy > y1) y1 = qy;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const nx = qx + dx, ny = qy + dy;
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
        const ni = ny * w + nx;
        if (m[ni] && !seen[ni]) { seen[ni] = 1; stack.push(ni); }
      }
    }
    if (area >= minArea) boxes.push({ x0, y0, x1, y1, w: x1 - x0 + 1, h: y1 - y0 + 1 });
  }
  return boxes.sort((a, b) => a.x0 - b.x0);
};
```

Then identify by structure:

- **`g`** — in "Top Staking Assets" the only descenders are `p` and `g`, so take
  the components whose bottom sits below the median bottom, and keep the rightmost.
- **digits** — sort by x and index into the string, but *write out the string after
  removing the components you filtered*. In `31.39686` the decimal point is dropped
  by a height filter, leaving `3 1 3 9 6 8 6`; index 3 is the `9` and index 4 is a
  `6`. I originally mapped index 4 to `9` and spent a round comparing a `6` against
  every candidate's `9`, which produced a uniformly terrible column that looked
  like a real finding.

Print the boxes and eyeball one magnified crop before trusting the run.

## Scoring

Normalize each mask's bounding box into a fixed square and compute intersection
over union:

```js
const iou = (a, b) => {
  let inter = 0, union = 0;
  for (let i = 0; i < a.length; i++) {
    const u = a[i] | b[i];
    if (u) { union++; if (a[i] & b[i]) inter++; }
  }
  return inter / union;
};
```

Render the candidate glyph large (130px) into its own canvas, merge all its
components (the dot of an `i` is separate), normalize identically, compare.

**Drop very narrow glyphs from the mean.** Normalizing a `1`, `l` or `i` bounding
box to a square stretches it enormously, so a small difference in the flag swings
the score from 0.78 to 0.12. In my run Switzer scored `.784` on the `1` while every
other candidate sat near `.20` — an artifact, not a finding, and it was enough to
flip the overall ranking. Use `g 3 6 8 9 a S`.

## The result, for calibration

Mean IoU over `g 3 6 8 9`:

| font | g | 3 | 9 | 6 | 8 | mean |
|---|---|---|---|---|---|---|
| General Sans | .582 | .762 | .805 | .792 | .820 | **.752** |
| Satoshi | .563 | .501 | .855 | .811 | .823 | .711 |
| DM Sans | **.676** | .823 | .527 | .516 | .811 | .671 |
| Switzer | .590 | .837 | .543 | .523 | .787 | .656 |
| Instrument Sans | .568 | .833 | .484 | .492 | .813 | .638 |
| Onest | .562 | .770 | .518 | .515 | .784 | .630 |
| Space Grotesk | .563 | .539 | .552 | .538 | .752 | .589 |

Absolute values around .6–.8 are normal; the reference glyph is 20–45px tall and
resampling blurs it, so perfect overlap is unreachable. Only the ranking matters.

Note DM Sans wins the `g` while General Sans wins the round digits. When the winner
differs per glyph, weigh by what the design shows most — this dashboard is wall to
wall large numerals, so the digits decide.

## Confirm with your eyes

Build a sheet: the reference crops upscaled (`image-rendering: pixelated`, scale
each crop so it renders ~150px tall) in the top row, each candidate below at the
same size. The numbers rank; the sheet catches the case where the numbers are
measuring something other than what you think.

## Claims to avoid

At the reference's resolution a parenthesis was **3 pixels wide**. I had asserted
the design used "squared parentheses" as a distinguishing trait. Nothing at 3px
supports a claim about shape. Before citing a feature as evidence, check that the
feature is actually resolvable in the source.

## Licensing

Before committing a font binary, confirm redistribution is permitted. OFL (most of
Google Fonts) explicitly allows it, including modification, with a name change if
the font carries a Reserved Font Name. If you cannot read the license text —
Fontshare's license page is a client-rendered SPA that `curl` cannot extract —
**do not self-host**. Load from the foundry's own CDN and record in the README why
the binary is not vendored. Shipping a font whose terms you have not read is not a
judgment call to make on someone else's repository.
