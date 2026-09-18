/**
 * gallery.js — renders the catalogue and the skill viewer.
 *
 * The viewer fetches the real SKILL.md files from `.claude/skills/`, so the page
 * and the skill Claude Code loads are the same file — no second copy to drift.
 */

import { DESIGNS, REPO } from './catalog.js';
import { renderMarkdown, frontmatter } from './markdown.js';

const entries = document.querySelector('#entries');
const viewer = document.querySelector('#viewer');
const viewerTitle = document.querySelector('#viewer-title');
const viewerPath = document.querySelector('#viewer-path');
const viewerTabs = document.querySelector('#viewer-tabs');
const viewerBody = document.querySelector('#viewer-body');

/* --- catalogue ------------------------------------------------------------ */

entries.innerHTML = DESIGNS.map(
  (d, i) => `
  <article class="entry" id="${d.id}">
    <div class="shots">
      ${d.screens
        .map(
          (s) => `
        <a class="shot" href="${s.href}">
          <img src="${s.preview}" alt="${d.name} — ${s.label}" loading="lazy" width="1280" height="800" />
          <span class="shot__bar"><span>${s.label}</span><span>Open ↗</span></span>
        </a>`
        )
        .join('')}
    </div>
    <div class="entry__side">
      <p class="entry__num">${String(i + 1).padStart(2, '0')}</p>
      <h2>${d.name}</h2>
      <p class="entry__kind">${d.kind} · ${d.theme}</p>
      <p class="entry__blurb">${d.blurb}</p>
      <ul class="entry__built">${d.built.map((b) => `<li>${b}</li>`).join('')}</ul>
      <div class="entry__actions">
        <a class="btn" href="${d.screens[0].href}">Open the design</a>
        <button type="button" class="btn btn--plain" data-skill="${d.id}">Read the skill</button>
      </div>
    </div>
  </article>`
).join('');

/* --- skill viewer --------------------------------------------------------- */

let current = null;

async function showDoc(design, index) {
  const file = design.skill.files[index];
  viewerPath.textContent = design.skill.base.replace('./', '') + file.path;
  [...viewerTabs.children].forEach((b, i) =>
    b.setAttribute('aria-selected', String(i === index))
  );
  viewerBody.innerHTML = '<p class="doc__meta">Loading…</p>';

  try {
    const res = await fetch(design.skill.base + file.path, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { meta, body } = frontmatter(await res.text());
    const header = meta.description
      ? `<p class="doc__meta"><strong>${meta.name || design.skill.id}</strong> — ${meta.description}</p>`
      : '';
    viewerBody.innerHTML = `<div class="doc">${header}${renderMarkdown(body)}</div>`;
  } catch (err) {
    // Hidden directories are not always served by a static host; say so and
    // hand over a link that definitely works rather than showing an empty panel.
    viewerBody.innerHTML =
      '<div class="doc__error"><p><strong>This document could not be loaded here</strong> ' +
      `(${err.message}).</p><p style="margin-top:10px">Read it in the repository: ` +
      `<a href="${REPO}/blob/main/${design.skill.base.replace('./', '')}${file.path}" ` +
      'rel="noreferrer">' +
      `${design.skill.base.replace('./', '')}${file.path}</a></p></div>`;
  }
  viewerBody.scrollTop = 0;
}

function openSkill(id) {
  const design = DESIGNS.find((d) => d.id === id);
  if (!design) return;
  current = design;
  viewerTitle.textContent = `${design.name} — skill`;
  viewerTabs.innerHTML = design.skill.files
    .map(
      (f, i) =>
        `<button type="button" role="tab" data-doc="${i}" ` +
        `aria-selected="${i === 0}">${f.label}</button>`
    )
    .join('');
  if (typeof viewer.showModal === 'function') viewer.showModal();
  else viewer.setAttribute('open', '');
  showDoc(design, 0);
}

entries.addEventListener('click', (event) => {
  const button = event.target.closest('[data-skill]');
  if (button) openSkill(button.dataset.skill);
});

viewerTabs.addEventListener('click', (event) => {
  const button = event.target.closest('[data-doc]');
  if (button && current) showDoc(current, Number(button.dataset.doc));
});

document.querySelector('#viewer-close').addEventListener('click', () => viewer.close());

// Clicking the backdrop (outside the panel) closes it.
viewer.addEventListener('click', (event) => {
  if (event.target === viewer) viewer.close();
});
