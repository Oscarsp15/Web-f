/**
 * data.js — every page in the workbook template, as data.
 *
 * The reference is a 100-page Canva template presented as a sheet of samples.
 * Its Latin filler is kept verbatim where the original used it: on a template
 * the placeholder text IS the content, and replacing it with real prose would
 * misrepresent what the product is.
 */

export const BRAND = {
  name: 'Camellia',
  suite: 'Course Workbook',
  seal: 'C',
  kicker: '100 Pages Workbook',
  edition: 'Luctus Edition',
  year: '1987',
};

/** The thumbnail wall in the hero: nine sample spreads. */
export const WALL = [
  {
    kind: 'quote', tone: 'clay',
    eyebrow: '01',
    title: 'Class ridiculus facilisi lobortis.',
  },
  { kind: 'portrait', tone: 'paper', eyebrow: 'Pharetra.', title: 'Pharetra.', arch: 'soft' },
  { kind: 'split', tone: 'paper', eyebrow: 'Cubilia.', title: 'Cubilia.',
    text: 'Laoreet est.' },
  {
    kind: 'list', tone: 'paper', eyebrow: 'Checklist',
    title: 'Things You Need.',
    items: ['Nulla facilisi', 'Rutrum quisque', 'Tortor congue', 'Sem placerat'],
  },
  { kind: 'welcome', tone: 'paper', eyebrow: 'Introduction', title: 'Welcome.',
    text: 'Vel elit the phasellus magna congue dolor quis natoque.' },
  { kind: 'quote', tone: 'paper', eyebrow: 'Our Successful Students',
    title: '“Ullamcorper vel turpis erat eget luctus habitasse aliquet.”',
    small: true },
  { kind: 'portrait', tone: 'paper', eyebrow: 'Catalogue', title: '', arch: 'full' },
  {
    kind: 'map', tone: 'clay', eyebrow: 'Reach',
    title: 'Worldwide Maps.',
  },
  { kind: 'portrait', tone: 'paper', eyebrow: 'Coaching', title: '', arch: 'soft' },
];

/** Four cover treatments — the "Cover Designs." band. */
export const COVERS = [
  {
    id: 'arch-right',
    caption: 'Arch right',
    layout: 'arch-right',
    eyebrow: ['Pharetra dictumst', 'posuere facilisis', BRAND.year],
    title: 'Course<br />Workbook.',
    sub: 'For Coaches',
    badge: 'Beginner Course',
    author: { name: 'Ross Matsumura', role: 'Success Story' },
    rule: 'Camellia Sills',
    meta: [
      'Magna facilisis ad praesent',
      'Ultricies vehicula aliquam',
      'Tincidunt cubilia ex sodales leo',
      'Ad nisl suspendisse porttitor',
    ],
  },
  {
    id: 'stacked',
    caption: 'Stacked rule',
    layout: 'stacked',
    eyebrow: ['Camellia Sills', 'Course Reference'],
    title: 'Course<br />Workbook.',
    sub: 'For Coaches',
    author: { name: 'Ross Matsumura', role: 'Success Story' },
    rule: 'Camellia Sills',
    meta: ['Magna facilisis', 'Ultricies vehicula', 'Tincidunt cubilia'],
  },
  {
    id: 'arch-left',
    caption: 'Arch left',
    layout: 'arch-left',
    eyebrow: ['Pellentesque', 'Habitant morbi'],
    title: 'Course<br />Workbook.',
    sub: 'For Coaches',
    text: 'Pulvinar tristique magna eget ullamcorper dictumst posuere facilisis.',
    rule: 'Camellia Sills',
  },
  {
    id: 'framed',
    caption: 'Framed portrait',
    layout: 'framed',
    eyebrow: ['Camellia Sills', BRAND.year],
    title: 'Course<br />Workbook.',
    sub: 'For Coaches',
    badge: 'Advanced',
    rule: 'Camellia Sills',
  },
];

/** Four contents treatments — the "Table of Contents." band. */
export const CONTENTS = [
  {
    id: 'plain',
    caption: 'Numbered list',
    layout: 'list',
    title: 'Contents.',
    eyebrow: ['Camellia Sills'],
    items: [
      ['Your First Title Here', 'Nunc dapibus rhoncus'],
      ['Your Second Title Here', 'Vestibulum tincidunt'],
      ['Your Third Title Here', 'Aenean sagittis mauris'],
      ['Your Fourth Title Here', 'Curabitur imperdiet'],
      ['Your Fifth Title Here', 'Donec vel elit magna'],
      ['Your Sixth Title Here', 'Integer congue metus'],
    ],
  },
  {
    id: 'inside',
    caption: 'Two columns with portrait',
    layout: 'two-col',
    title: "What's Inside.",
    eyebrow: ['Camellia Sills'],
    items: [
      ['First Title Here', 'Nunc dapibus'],
      ['Second Title Here', 'Vestibulum'],
      ['Third Title Here', 'Aenean sagittis'],
      ['Fourth Title Here', 'Curabitur'],
      ['Fifth Title Here', 'Donec vel elit'],
      ['Sixth Title Here', 'Integer congue'],
    ],
  },
  {
    id: 'upcoming',
    caption: 'Vertical title',
    layout: 'vertical',
    title: 'Upcoming Lessons.',
    eyebrow: ['Camellia Sills'],
    items: [
      ['First Title Here', 'Nunc dapibus rhoncus'],
      ['Second Title Here', 'Vestibulum tincidunt'],
      ['Third Title Here', 'Aenean sagittis mauris'],
      ['Fourth Title Here', 'Curabitur imperdiet'],
    ],
  },
  {
    id: 'course',
    caption: 'With channel list',
    layout: 'channels',
    title: 'Course Contents.',
    sub: 'For Coaches',
    eyebrow: ['Camellia Sills'],
    items: [
      ['First Title', 'Nunc dapibus'],
      ['Second Title', 'Vestibulum'],
      ['Third Title', 'Aenean sagittis'],
      ['Fourth Title', 'Curabitur'],
    ],
    channels: ['Instagram', 'Pinterest', 'Facebook'],
  },
];

export const BANDS = {
  covers: {
    title: 'Cover Designs.',
    text:
      'Choose the cover that fits your audience style. Four are drawn here, so one ' +
      'can carry a second workbook without redrawing the system. Get them captivated ' +
      'at first sight.',
  },
  contents: {
    title: 'Table of Contents.',
    text:
      'Map out the entire contents across these pages, laid out so your audience can ' +
      'find what they are looking for in a snap.',
  },
};
