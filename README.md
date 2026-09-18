# Design Rebuilds

Product designs reconstructed in plain HTML, CSS and JavaScript — no framework, no
bundler, no dependencies — each one published alongside **the skill that documents
how it was made**.

**Live:** https://oscarsp15.github.io/Web-f/

## What's here

| Design | Screens | Theme | Skill |
|---|---|---|---|
| **Stakent** — crypto staking dashboard | Dashboard | Dark | `.claude/skills/stakent-dashboard/` |
| **Sequence** — business banking | Dashboard, Transfer | Light | `.claude/skills/sequence-fintech/` |

The gallery at the root lists both, links to each screen, and renders the skill
documents in place — it fetches the same `.md` files Claude Code loads, so there is
no second copy to drift.

## Structure

```
index.html                      # the gallery
assets/gallery/                 # gallery styles, catalogue, markdown renderer
assets/previews/                # real screenshots of each design
designs/stakent/                # dark staking dashboard
designs/sequence/               # light fintech dashboard + transfer flow
.claude/skills/<name>/SKILL.md  # the recipe, with references/ alongside
```

Every design follows the same layout: `assets/css/{tokens,layout,components}.css`
and `assets/js/` with one module per region, a single `data.js` holding every
figure, and an `icons.js` registry. Only `tokens.css` carries raw colors.

## The method

Both skills exist because copying a design by eye does not work. The short version:

- **Measure the reference.** Serve the image over HTTP, read its pixels from a
  canvas, average blocks for surfaces and take the extreme pixel for text. On
  Stakent this showed the cards had no gradient at all and the neutrals were
  violet-cast — neither of which I had guessed.
- **Rank typefaces by glyph, not by vibe.** Segment individual glyphs out of the
  reference with connected-component analysis and score candidates by pixel
  overlap. General Sans won at .752 mean IoU; the Space Grotesk I had originally
  chosen by eye came last at .589.
- **If a brand guide is in the set, it outranks your measurements** for brand
  colors — and your measurements still decide the neutrals, which guides never
  document.

The full write-ups, including the mistakes that cost a round, are in the skills.

## Fonts, honestly

- **Stakent** uses **General Sans** loaded from Fontshare's CDN. It is not
  self-hosted: the ITF license text could not be verified from the development
  environment, and vendoring a font binary whose terms you have not read is not a
  call to make on someone else's repository.
- **Sequence**'s brand guide specifies **Helvetica**, which has no free web
  license. The stack is `"Helvetica Neue", Helvetica, Arimo, Arial, "Liberation
  Sans"` — Apple devices get the real face, everyone else gets Arimo, metrically
  compatible with Arial and so with Helvetica, which keeps the layout identical
  across platforms. Saying "we used Helvetica" would be false on most machines.
- The **gallery** deliberately loads no webfont at all. It is monochrome and uses
  the system stack so the thumbnails carry the color and the index loads with zero
  external requests.

## Development

ES modules need to be served over HTTP, not opened as `file://`:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Deployment

`.github/workflows/deploy-pages.yml` publishes the repository root to GitHub Pages
on every push to `main`. Pages source must be set to **GitHub Actions** in
Settings → Pages. `.nojekyll` is required — without it Jekyll strips the
`.claude/` directory and the gallery cannot load the skill documents.

## Credits

Both designs are Dribbble shots by their original authors (the Sequence brand guide
is credited in the shot to Dipa.inhouse). The code here is an original
implementation written for front-end practice: no assets, code or fonts from the
originals are included, and the coin marks, flags and icons are all drawn.
