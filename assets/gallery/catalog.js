/**
 * catalog.js — what the gallery lists.
 *
 * `skill.files` is a manifest rather than a directory listing, because a static
 * host cannot be asked what is in a folder. Add a reference doc here when you
 * add one to the skill.
 */

export const DESIGNS = [
  {
    id: 'stakent',
    name: 'Stakent',
    kind: 'Crypto staking dashboard',
    theme: 'Dark',
    blurb:
      'A dark, data-dense staking dashboard: reward-rate sparklines, a liquid-staking ' +
      'promo card and a positions panel with tabbed metrics.',
    built: [
      'Palette sampled pixel by pixel from the reference',
      'Typeface ranked by per-glyph pixel overlap across 7 candidates',
      'Sparklines generated with a Catmull-Rom spline',
    ],
    screens: [
      { label: 'Dashboard', href: './designs/stakent/', preview: './assets/previews/stakent.png' },
    ],
    skill: {
      id: 'stakent-dashboard',
      base: './.claude/skills/stakent-dashboard/',
      files: [
        { path: 'SKILL.md', label: 'SKILL.md' },
        { path: 'references/measuring-color.md', label: 'Measuring color' },
        { path: 'references/font-matching.md', label: 'Font matching' },
        { path: 'references/architecture.md', label: 'Architecture' },
        { path: 'references/verification.md', label: 'Verification' },
      ],
    },
  },
  {
    id: 'sequence',
    name: 'Sequence',
    kind: 'Business banking dashboard',
    theme: 'Light',
    blurb:
      'A light fintech product: a teal balance banner, a diverging cash-flow chart, ' +
      'an activity table, and a four-step transfer flow on its own screen.',
    built: [
      'Brand guide supplied the typeface and both colors with their tint ramps',
      'Neutrals and state colors measured from the screens',
      'Diverging bar chart drawn from one scale and one zero line',
    ],
    screens: [
      { label: 'Dashboard', href: './designs/sequence/', preview: './assets/previews/sequence.png' },
      { label: 'Transfer', href: './designs/sequence/send.html', preview: './assets/previews/sequence-send.png' },
    ],
    skill: {
      id: 'sequence-fintech',
      base: './.claude/skills/sequence-fintech/',
      files: [
        { path: 'SKILL.md', label: 'SKILL.md' },
        { path: 'references/brand-spec.md', label: 'Brand spec' },
        { path: 'references/screens.md', label: 'Screens' },
        { path: 'references/charts.md', label: 'Charts' },
        { path: 'references/light-theme.md', label: 'Light theme' },
      ],
    },
  },
];

export const REPO = 'https://github.com/Oscarsp15/Web-f';
