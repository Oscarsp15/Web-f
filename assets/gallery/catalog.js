/**
 * catalog.js — what the gallery lists, in both languages.
 *
 * `skill.files` is a manifest rather than a directory listing, because a static
 * host cannot be asked what is in a folder. Add a reference doc here when you
 * add one to the skill.
 *
 * Skill documents are served in the active language from `<base>es/<path>`, with
 * the English original as the fallback. English stays the source of truth — it is
 * the file Claude Code loads — and every translation says so in its own header, so
 * a reader always knows which copy can drift.
 */

export const UI = {
  en: {
    label: 'English',
    other: 'Español',
    eyebrow: 'Rebuilt from reference',
    title: 'Design rebuilds,<br />and the recipes behind them',
    intro:
      "Each entry is a product design reconstructed in plain HTML, CSS and JavaScript — " +
      "no framework, no bundler, nothing a static host can't serve. Alongside every " +
      'rebuild sits the skill that documents how it was made: how the palette was ' +
      'measured, how the typeface was identified, and which mistakes cost a round.',
    stats: [
      ['2', 'designs'],
      ['3', 'screens'],
      ['11', 'skill documents'],
      ['0', 'dependencies'],
    ],
    openDesign: 'Open the design',
    readSkill: 'Read the skill',
    openShot: 'Open',
    skillSuffix: 'skill',
    loading: 'Loading…',
    docsNote: 'The English original is the source of truth — it is the file the agent loads.',
    fallbackNote: 'No Spanish version of this document yet; showing the English original.',
    errorTitle: 'This document could not be loaded here',
    errorLead: 'Read it in the repository:',
    footer: 'Rebuilt for practice. Each design belongs to its original author on Dribbble.',
    source: 'Source on GitHub',
    close: 'Close',
  },
  es: {
    label: 'Español',
    other: 'English',
    eyebrow: 'Reconstruido desde la referencia',
    title: 'Diseños reconstruidos,<br />y la receta de cada uno',
    intro:
      'Cada entrada es un diseño de producto reconstruido en HTML, CSS y JavaScript ' +
      'puros: sin framework, sin bundler, nada que un host estático no pueda servir. ' +
      'Junto a cada reconstrucción está la skill que documenta cómo se hizo: cómo se ' +
      'midió la paleta, cómo se identificó la tipografía y qué errores costaron una ronda.',
    stats: [
      ['2', 'diseños'],
      ['3', 'pantallas'],
      ['11', 'documentos de skill'],
      ['0', 'dependencias'],
    ],
    openDesign: 'Abrir el diseño',
    readSkill: 'Leer la skill',
    openShot: 'Abrir',
    skillSuffix: 'skill',
    loading: 'Cargando…',
    docsNote:
      'El original en inglés es la fuente de verdad: es el fichero que carga el agente.',
    fallbackNote:
      'Aún no hay versión en español de este documento; se muestra el original en inglés.',
    errorTitle: 'Este documento no se ha podido cargar aquí',
    errorLead: 'Léelo en el repositorio:',
    footer:
      'Reconstruido como práctica. Cada diseño pertenece a su autor original en Dribbble.',
    source: 'Código en GitHub',
    close: 'Cerrar',
  },
};

export const DESIGNS = [
  {
    id: 'stakent',
    name: 'Stakent',
    theme: 'dark',
    kind: { en: 'Crypto staking dashboard', es: 'Panel de staking cripto' },
    themeLabel: { en: 'Dark', es: 'Oscuro' },
    blurb: {
      en:
        'A dark, data-dense staking dashboard: reward-rate sparklines, a liquid-staking ' +
        'promo card and a positions panel with tabbed metrics.',
      es:
        'Un panel de staking oscuro y denso en datos: sparklines de tasa de recompensa, ' +
        'una tarjeta promocional de liquid staking y un panel de posiciones con pestañas.',
    },
    built: {
      en: [
        'Palette sampled pixel by pixel from the reference',
        'Typeface ranked by per-glyph pixel overlap across 7 candidates',
        'Sparklines generated with a Catmull-Rom spline',
      ],
      es: [
        'Paleta muestreada píxel a píxel desde la referencia',
        'Tipografía elegida midiendo el solape por glifo entre 7 candidatas',
        'Sparklines generadas con un spline de Catmull-Rom',
      ],
    },
    screens: [
      {
        label: { en: 'Dashboard', es: 'Panel' },
        href: './designs/stakent/',
        preview: './assets/previews/stakent.png',
      },
    ],
    skill: {
      id: 'stakent-dashboard',
      base: './.claude/skills/stakent-dashboard/',
      files: [
        { path: 'SKILL.md', label: 'SKILL.md' },
        { path: 'references/measuring-color.md', label: { en: 'Measuring color', es: 'Medir color' } },
        { path: 'references/font-matching.md', label: { en: 'Font matching', es: 'Tipografía' } },
        { path: 'references/architecture.md', label: { en: 'Architecture', es: 'Arquitectura' } },
        { path: 'references/ux-engineering.md', label: { en: 'UX engineering', es: 'UX engineering' } },
        { path: 'references/verification.md', label: { en: 'Verification', es: 'Verificación' } },
      ],
    },
  },
  {
    id: 'sequence',
    name: 'Sequence',
    theme: 'light',
    kind: { en: 'Business banking dashboard', es: 'Banca para empresas' },
    themeLabel: { en: 'Light', es: 'Claro' },
    blurb: {
      en:
        'A light fintech product: a teal balance banner, a diverging cash-flow chart, ' +
        'an activity table, and a four-step transfer flow on its own screen.',
      es:
        'Un producto fintech claro: banner de saldo en verde azulado, gráfico de flujo de ' +
        'caja divergente, tabla de actividad y un flujo de transferencia de cuatro pasos.',
    },
    built: {
      en: [
        'Brand guide supplied the typeface and both colors with their tint ramps',
        'Neutrals and state colors measured from the screens',
        'Diverging bar chart drawn from one scale and one zero line',
      ],
      es: [
        'El brand guide aportó la tipografía y ambos colores con sus rampas',
        'Neutros y colores de estado medidos desde las pantallas',
        'Gráfico divergente dibujado con una sola escala y una sola línea de cero',
      ],
    },
    screens: [
      {
        label: { en: 'Dashboard', es: 'Panel' },
        href: './designs/sequence/',
        preview: './assets/previews/sequence.png',
      },
      {
        label: { en: 'Transfer', es: 'Transferencia' },
        href: './designs/sequence/send.html',
        preview: './assets/previews/sequence-send.png',
      },
    ],
    skill: {
      id: 'sequence-fintech',
      base: './.claude/skills/sequence-fintech/',
      files: [
        { path: 'SKILL.md', label: 'SKILL.md' },
        { path: 'references/brand-spec.md', label: { en: 'Brand spec', es: 'Marca' } },
        { path: 'references/screens.md', label: { en: 'Screens', es: 'Pantallas' } },
        { path: 'references/charts.md', label: { en: 'Charts', es: 'Gráficos' } },
        { path: 'references/light-theme.md', label: { en: 'Light theme', es: 'Tema claro' } },
      ],
    },
  },
];

export const REPO = 'https://github.com/Oscarsp15/Web-f';

/** Pick the active language out of a value that may be a plain string. */
export const pick = (value, lang) =>
  value && typeof value === 'object' && !Array.isArray(value) ? value[lang] : value;
