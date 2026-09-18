/**
 * pages.js — renders a page spec into a `.page` element.
 *
 * One function per page family. Every page is the same fixed-ratio box; the
 * layout variants differ only in what goes inside it, which is what keeps a
 * 100-page template coherent.
 */

const esc = (s = '') => String(s).replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[c]);

/** Eyebrow block: a stack of small uppercase lines, as on the reference covers. */
const eyebrow = (lines = []) =>
  lines.length ? `<p class="page__eyebrow">${lines.map(esc).join('<br />')}</p>` : '';

const author = (a) =>
  a
    ? '<div class="author"><span class="author__portrait"></span>' +
      `<span><b>${esc(a.name)}</b><span>${esc(a.role)}</span></span></div>`
    : '';

const ruleRow = (text) => (text ? `<p class="rule-row">${esc(text)}</p>` : '');

const metaGrid = (items = []) =>
  items.length
    ? `<div class="meta-grid">${items.map((m) => `<p>${esc(m)}</p>`).join('')}</div>`
    : '';

const badge = (text, style) =>
  text
    ? `<span class="badge" style="${style}">${esc(text)}</span>`
    : '';

/* --- covers --------------------------------------------------------------- */

function cover(spec) {
  const arch =
    '<div class="arch" style="position:absolute;inset:0"></div>';

  if (spec.layout === 'arch-right') {
    return (
      '<article class="page">' +
      '<div class="page__body" style="gap:3cqw">' +
      // the row grows so the arch reaches the rule, as it does on the reference
      '<div style="display:flex;gap:4cqw;align-items:stretch;flex:1;min-height:0">' +
      `<div style="flex:1;min-width:0">${eyebrow(spec.eyebrow)}` +
      `<h3 class="page__title" style="margin-top:6cqw">${spec.title}</h3>` +
      `<p class="page__sub" style="margin-top:2cqw">${esc(spec.sub)}</p>` +
      `<div style="margin-top:6cqw">${author(spec.author)}</div>` +
      '</div>' +
      '<div style="position:relative;width:40%;flex:none">' +
      arch +
      badge(spec.badge, 'right:-4cqw;top:8%;width:15cqw;height:15cqw;font-size:1.7cqw;' +
        'letter-spacing:.14cqw;line-height:1.25;padding:1cqw') +
      '</div></div>' +
      `<div>${ruleRow(spec.rule)}` +
      `<div style="margin-top:3cqw">${metaGrid(spec.meta)}</div></div>` +
      '</div>' +
      pageFoot('Course Workbook Camellia', 'Luctus Edition') +
      '</article>'
    );
  }

  if (spec.layout === 'stacked') {
    return (
      '<article class="page">' +
      '<div class="page__body">' +
      eyebrow(spec.eyebrow) +
      '<div style="position:relative;width:100%;aspect-ratio:1.5;margin-top:2cqw">' +
      arch +
      '</div>' +
      `<h3 class="page__title" style="margin-top:3cqw">${spec.title}</h3>` +
      `<p class="page__sub">${esc(spec.sub)}</p>` +
      `<div style="margin-top:auto">${ruleRow(spec.rule)}` +
      `<div style="margin-top:3cqw">${metaGrid(spec.meta)}</div></div>` +
      '</div>' +
      pageFoot('Camellia Sills', spec.author ? spec.author.name : '') +
      '</article>'
    );
  }

  if (spec.layout === 'arch-left') {
    return (
      '<article class="page">' +
      '<div class="page__body" style="gap:3cqw">' +
      '<div style="display:flex;gap:4cqw;align-items:flex-start">' +
      '<div style="position:relative;width:42%;aspect-ratio:.66;flex:none">' + arch + '</div>' +
      `<div style="flex:1;min-width:0">${eyebrow(spec.eyebrow)}` +
      `<h3 class="page__title page__title--sm" style="margin-top:4cqw">${spec.title}</h3>` +
      `<p class="page__sub" style="margin-top:2cqw">${esc(spec.sub)}</p>` +
      `<p class="page__text" style="margin-top:4cqw">${esc(spec.text)}</p>` +
      '</div></div>' +
      `<div style="margin-top:auto">${ruleRow(spec.rule)}</div>` +
      '</div>' +
      pageFoot('Camellia Sills', 'For Coaches') +
      '</article>'
    );
  }

  // framed
  return (
    '<article class="page">' +
    '<div class="page__body" style="align-items:center;text-align:center">' +
    eyebrow(spec.eyebrow) +
    '<div style="position:relative;width:64%;aspect-ratio:.78;margin-top:3cqw">' +
    '<div class="arch arch--full" style="position:absolute;inset:0"></div>' +
    badge(spec.badge, 'left:50%;bottom:-6cqw;transform:translateX(-50%);width:16cqw;' +
      'height:16cqw;font-size:1.8cqw;letter-spacing:.14cqw;line-height:1.3;padding:1cqw') +
    '</div>' +
    `<h3 class="page__title" style="margin-top:9cqw">${spec.title}</h3>` +
    `<p class="page__sub">${esc(spec.sub)}</p>` +
    `<div style="margin-top:auto;width:100%">${ruleRow(spec.rule)}</div>` +
    '</div>' +
    pageFoot('Camellia Sills', '1987') +
    '</article>'
  );
}

function pageFoot(left, right) {
  return `<div class="page__foot"><span>${esc(left)}</span><span>${esc(right)}</span></div>`;
}

/* --- contents ------------------------------------------------------------- */

const tocList = (items) =>
  `<ul class="toc">${items
    .map(
      ([t, s], i) =>
        `<li><b>${esc(t)}</b><span>${esc(s)}</span>` +
        `<em>${String(i + 1).padStart(2, '0')}</em></li>`
    )
    .join('')}</ul>`;

function contents(spec) {
  if (spec.layout === 'two-col') {
    const half = Math.ceil(spec.items.length / 2);
    return (
      '<article class="page">' +
      '<div class="page__body">' +
      eyebrow(spec.eyebrow) +
      `<h3 class="page__title page__title--sm">${esc(spec.title)}</h3>` +
      '<div class="two-col" style="margin-top:2cqw">' +
      `<div>${tocList(spec.items.slice(0, half))}</div>` +
      `<div>${tocList(spec.items.slice(half))}</div>` +
      '</div>' +
      '<div style="position:relative;width:46%;aspect-ratio:1.1;margin:3cqw 0 0 auto">' +
      '<div class="arch arch--soft" style="position:absolute;inset:0"></div></div>' +
      '</div>' +
      pageFoot('Camellia Sills', 'Contents') +
      '</article>'
    );
  }

  if (spec.layout === 'vertical') {
    return (
      '<article class="page">' +
      '<div class="page__body" style="flex-direction:row;gap:4cqw">' +
      '<h3 class="page__title page__title--sm" style="writing-mode:vertical-rl;' +
      `transform:rotate(180deg);flex:none">${esc(spec.title)}</h3>` +
      '<div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:2cqw">' +
      '<div style="position:relative;width:100%;aspect-ratio:1.6">' +
      '<div class="arch arch--soft" style="position:absolute;inset:0"></div></div>' +
      tocList(spec.items) +
      '</div></div>' +
      pageFoot('Camellia Sills', 'Lessons') +
      '</article>'
    );
  }

  if (spec.layout === 'channels') {
    return (
      '<article class="page">' +
      '<div class="page__body">' +
      eyebrow(spec.eyebrow) +
      `<h3 class="page__title page__title--sm">${esc(spec.title)}</h3>` +
      `<p class="page__sub">${esc(spec.sub || '')}</p>` +
      '<div class="two-col" style="margin-top:2cqw">' +
      `<div>${tocList(spec.items)}</div>` +
      `<ul class="toc">${spec.channels
        .map((c) => `<li><b style="font-size:2.4cqw">${esc(c)}</b><em>↗</em></li>`)
        .join('')}</ul>` +
      '</div></div>' +
      pageFoot('Camellia Sills', 'For Coaches') +
      '</article>'
    );
  }

  // plain list, with a band of colour behind the title
  return (
    '<article class="page">' +
    '<div style="position:relative;width:100%;aspect-ratio:3.4;flex:none">' +
    '<div class="arch" style="position:absolute;inset:0;border-radius:0"></div></div>' +
    '<div class="page__body">' +
    eyebrow(spec.eyebrow) +
    `<h3 class="page__title page__title--sm">${esc(spec.title)}</h3>` +
    tocList(spec.items) +
    '</div>' +
    pageFoot('Camellia Sills', 'Contents') +
    '</article>'
  );
}

/* --- wall thumbnails ------------------------------------------------------ */

function thumb(spec) {
  const toneClass = spec.tone === 'clay' ? ' page--clay' : '';

  if (spec.kind === 'portrait') {
    return (
      `<article class="page${toneClass}">` +
      '<div class="page__body" style="padding:5cqw">' +
      (spec.eyebrow ? `<p class="page__eyebrow">${esc(spec.eyebrow)}</p>` : '') +
      `<div style="position:relative;flex:1;min-height:0;margin-top:2cqw">` +
      `<div class="arch arch--${spec.arch === 'full' ? 'full' : 'soft'}" ` +
      'style="position:absolute;inset:0"></div></div>' +
      (spec.title ? `<h3 class="page__title" style="font-size:8cqw">${esc(spec.title)}</h3>` : '') +
      '</div></article>'
    );
  }

  if (spec.kind === 'list') {
    return (
      `<article class="page${toneClass}">` +
      '<div class="page__body">' +
      `<p class="page__eyebrow">${esc(spec.eyebrow)}</p>` +
      `<h3 class="page__title">${esc(spec.title)}</h3>` +
      `<ul class="toc" style="margin-top:1cqw">${spec.items
        .map((t) => `<li><b style="font-size:3.2cqw">${esc(t)}</b></li>`)
        .join('')}</ul>` +
      '</div></article>'
    );
  }

  if (spec.kind === 'split') {
    return (
      `<article class="page${toneClass}">` +
      '<div class="page__body">' +
      `<h3 class="page__title">${esc(spec.title)}</h3>` +
      '<div style="position:relative;width:100%;aspect-ratio:1.4">' +
      '<div class="arch arch--soft" style="position:absolute;inset:0"></div></div>' +
      `<p class="page__text">${esc(spec.text)}</p>` +
      '</div></article>'
    );
  }

  if (spec.kind === 'map') {
    return (
      `<article class="page${toneClass}">` +
      '<div class="page__body">' +
      `<p class="page__eyebrow">${esc(spec.eyebrow)}</p>` +
      `<h3 class="page__title">${esc(spec.title)}</h3>` +
      '<div style="flex:1;min-height:0;display:grid;place-items:center">' +
      '<svg viewBox="0 0 60 34" width="82%" fill="none" stroke="currentColor" ' +
      'stroke-width="0.5" opacity=".55" aria-hidden="true">' +
      '<ellipse cx="30" cy="17" rx="28" ry="15" />' +
      '<path d="M2 17h56M30 2v30M8 7c14 6 30 6 44 0M8 27c14-6 30-6 44 0" />' +
      '</svg></div>' +
      '</div></article>'
    );
  }

  if (spec.kind === 'welcome') {
    return (
      `<article class="page${toneClass}">` +
      '<div class="page__body">' +
      `<p class="page__eyebrow">${esc(spec.eyebrow)}</p>` +
      `<h3 class="page__title">${esc(spec.title)}</h3>` +
      `<p class="page__text">${esc(spec.text)}</p>` +
      '<div style="position:relative;width:100%;flex:1;min-height:0">' +
      '<div class="arch arch--soft" style="position:absolute;inset:0"></div></div>' +
      '</div></article>'
    );
  }

  // quote
  return (
    `<article class="page${toneClass}">` +
    '<div class="page__body" style="justify-content:center">' +
    `<p class="page__eyebrow">${esc(spec.eyebrow)}</p>` +
    `<h3 class="page__title" style="font-size:${spec.small ? 5 : 8}cqw">` +
    `${esc(spec.title)}</h3>` +
    (spec.small ? '<p class="page__eyebrow" style="margin-top:2cqw">Clara Cubilia</p>' : '') +
    '</div></article>'
  );
}

export const renderCover = cover;
export const renderContents = contents;
export const renderThumb = thumb;
