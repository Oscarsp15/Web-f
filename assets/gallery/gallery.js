/**
 * gallery.js — the catalogue, the language switch and the skill viewer.
 *
 * The viewer fetches the real SKILL.md files from `.claude/skills/`, so the page
 * and the skill Claude Code loads are the same file — no second copy to drift.
 */

import { DESIGNS, UI, REPO, pick } from './catalog.js';
import { renderMarkdown, frontmatter } from './markdown.js';

const $ = (sel) => document.querySelector(sel);
const entries = $('#entries');
const viewer = $('#viewer');
const viewerTitle = $('#viewer-title');
const viewerPath = $('#viewer-path');
const viewerTabs = $('#viewer-tabs');
const viewerBody = $('#viewer-body');
const langBtn = $('#lang');

/* --- language ------------------------------------------------------------- */

const stored = (() => {
  try {
    return localStorage.getItem('lang');
  } catch {
    return null;
  }
})();
// A stored choice wins; otherwise follow the browser. (Written out rather than
// chained: `stored || x ? 'es' : 'en'` parses as `(stored || x) ? …`, which
// picks Spanish for anyone whose stored choice was English.)
const prefersEs = (navigator.language || 'en').toLowerCase().startsWith('es');
let lang = stored === 'en' || stored === 'es' ? stored : prefersEs ? 'es' : 'en';

function setLang(next) {
  lang = next;
  try {
    localStorage.setItem('lang', next);
  } catch {
    /* private mode — the choice just won't persist */
  }
  document.documentElement.lang = next;
  render();
  if (viewer.open && current) openSkill(current.id, activeDoc);
}

/* --- catalogue ------------------------------------------------------------ */

function render() {
  const t = UI[lang];

  $('#eyebrow').textContent = t.eyebrow;
  $('#title').innerHTML = t.title;
  $('#intro').textContent = t.intro;
  $('#stats').innerHTML = t.stats
    .map(([n, label]) => `<div class="stat"><b>${n}</b><span>${label}</span></div>`)
    .join('');
  $('#footer-note').textContent = t.footer;
  $('#source').textContent = `${t.source} ↗`;
  langBtn.textContent = t.other;
  langBtn.setAttribute('aria-label', `Switch to ${t.other}`);

  entries.innerHTML = DESIGNS.map(
    (d, i) => `
    <article class="entry" id="${d.id}">
      <div class="shots">
        ${d.screens
          .map(
            (s) => `
          <a class="shot" href="${s.href}">
            <img src="${s.preview}" alt="${d.name} — ${pick(s.label, lang)}"
                 loading="lazy" width="1280" height="800" />
            <span class="shot__bar">
              <span>${pick(s.label, lang)}</span>
              <span class="shot__open">${t.openShot} ↗</span>
            </span>
          </a>`
          )
          .join('')}
      </div>
      <div class="entry__side">
        <div class="entry__head">
          <span class="entry__num">${String(i + 1).padStart(2, '0')}</span>
          <span class="entry__theme entry__theme--${d.theme}">
            ${pick(d.themeLabel, lang)}
          </span>
        </div>
        <h2>${d.name}</h2>
        <p class="entry__kind">${pick(d.kind, lang)}</p>
        <p class="entry__blurb">${pick(d.blurb, lang)}</p>
        <ul class="entry__built">
          ${pick(d.built, lang).map((b) => `<li>${b}</li>`).join('')}
        </ul>
        <div class="entry__actions">
          <a class="btn" href="${d.screens[0].href}">${t.openDesign}</a>
          <button type="button" class="btn btn--plain" data-skill="${d.id}">
            ${t.readSkill}
            <span class="btn__count">${d.skill.files.length}</span>
          </button>
        </div>
      </div>
    </article>`
  ).join('');
}

/* --- skill viewer --------------------------------------------------------- */

let current = null;
let activeDoc = 0;
const cache = new Map();

async function showDoc(design, index) {
  const t = UI[lang];
  const file = design.skill.files[index];
  const url = design.skill.base + file.path;
  activeDoc = index;

  viewerPath.textContent = url.replace('./', '');
  [...viewerTabs.children].forEach((b, i) =>
    b.setAttribute('aria-selected', String(i === index))
  );

  // Only show a loader if the fetch is actually slow. Flashing "Loading…" for
  // 30ms is what made the panel jump on every tab change.
  let pending = true;
  setTimeout(() => {
    if (pending) viewerBody.innerHTML = `<p class="doc__meta">${t.loading}</p>`;
  }, 180);

  try {
    let html = cache.get(url);
    if (!html) {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const { meta, body } = frontmatter(await res.text());
      const header = meta.description
        ? `<p class="doc__meta"><strong>${meta.name || design.skill.id}</strong> — ${meta.description}</p>`
        : '';
      html = `<div class="doc">${header}${renderMarkdown(body)}</div>`;
      cache.set(url, html);
    }
    pending = false;
    viewerBody.innerHTML = html;
  } catch (err) {
    pending = false;
    // Hand over a link that definitely works rather than showing an empty panel.
    viewerBody.innerHTML =
      `<div class="doc__error"><p><strong>${t.errorTitle}</strong> (${err.message}).</p>` +
      `<p style="margin-top:10px">${t.errorLead} ` +
      `<a href="${REPO}/blob/main/${url.replace('./', '')}" rel="noreferrer">` +
      `${url.replace('./', '')}</a></p></div>`;
  }
  viewerBody.scrollTop = 0;
}

function openSkill(id, startAt = 0) {
  const t = UI[lang];
  const design = DESIGNS.find((d) => d.id === id);
  if (!design) return;
  current = design;
  viewerTitle.textContent = `${design.name} — ${t.skillSuffix}`;
  $('#viewer-note').textContent = t.docsNote;
  $('#viewer-close').setAttribute('aria-label', t.close);
  viewerTabs.innerHTML = design.skill.files
    .map(
      (f, i) =>
        `<button type="button" role="tab" data-doc="${i}" ` +
        `aria-selected="${i === startAt}">${pick(f.label, lang)}</button>`
    )
    .join('');
  if (!viewer.open) {
    if (typeof viewer.showModal === 'function') viewer.showModal();
    else viewer.setAttribute('open', '');
  }
  showDoc(design, startAt);
}

/* --- wiring --------------------------------------------------------------- */

entries.addEventListener('click', (event) => {
  const button = event.target.closest('[data-skill]');
  if (button) openSkill(button.dataset.skill);
});

viewerTabs.addEventListener('click', (event) => {
  const button = event.target.closest('[data-doc]');
  if (button && current) showDoc(current, Number(button.dataset.doc));
});

$('#viewer-close').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', (event) => {
  if (event.target === viewer) viewer.close();
});
langBtn.addEventListener('click', () => setLang(lang === 'en' ? 'es' : 'en'));

document.documentElement.lang = lang;
render();
