/**
 * side-panel.js — search box, monthly figures, the two charts, the promo card.
 */

import { PANEL } from '../data.js';
import { hydrateIcons } from '../icons.js';
import { renderArea } from '../area-chart.js';

/** The promo card's cut shapes, drawn rather than imported. */
function shapes() {
  return (
    '<svg class="promo__shapes" viewBox="0 0 260 150" preserveAspectRatio="none" ' +
    'aria-hidden="true">' +
    '<path d="M0 0h58l-22 26H0z" fill="#f3a6bd"/>' +
    '<circle cx="196" cy="58" r="20" fill="#fff" opacity=".92"/>' +
    '<path d="M168 150a34 34 0 0 1 68 0z" fill="#f3a6bd"/>' +
    '<path d="M236 92a30 30 0 0 0-60 0z" fill="#64c3ff" opacity=".85"/>' +
    '<circle cx="238" cy="132" r="13" fill="#fff"/>' +
    '</svg>'
  );
}

export function initSidePanel(root) {
  const host = root.querySelector('#side');
  if (!host) return;

  host.innerHTML =
    `<div><h2 class="side__title">${PANEL.title}</h2>` +
    `<p class="side__sub">${PANEL.sub}</p></div>` +
    '<label class="search">' +
    `<span class="visually-hidden">${PANEL.title}</span>` +
    `<input id="q" type="search" placeholder="${PANEL.placeholder}" autocomplete="off" />` +
    '<span data-icon="search" data-icon-size="17"></span></label>' +
    '<section class="card">' +
    `<button type="button" class="select"><b>${PANEL.period}</b>` +
    '<span data-icon="chevronDown" data-icon-size="15"></span></button>' +
    '<div class="figures">' +
    [PANEL.purchased, PANEL.available]
      .map(
        (f) =>
          `<div><p class="figure__label">${f.label}</p>` +
          `<p class="figure__value">${f.value}<span>${f.unit}</span></p></div>`
      )
      .join('') +
    '</div>' +
    PANEL.metrics
      .map(
        (m) =>
          `<div class="metric"><p class="figure__label">${m.label}</p>` +
          `<p class="metric__row"><b>${m.value}</b>` +
          `<span class="pill">${m.delta}</span></p>` +
          `<svg class="chart" id="chart-${m.id}"></svg></div>`
      )
      .join('') +
    '</section>' +
    `<section class="promo">${shapes()}<p>${PANEL.promo}</p>` +
    `<button type="button" class="btn btn--white">${PANEL.promoCta}</button></section>`;

  hydrateIcons(host);
  PANEL.metrics.forEach((m) => {
    const svg = host.querySelector(`#chart-${m.id}`);
    if (svg) renderArea(svg, m);
  });
}
