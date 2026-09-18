/**
 * dashboard.js — balance banner, cash flow, stat cards, activity table, card.
 */

import { ACCOUNT, CASH_FLOW, STATS, ACTIVITY, CARD } from '../data.js';
import { hydrateIcons } from '../icons.js';
import { renderCashFlow } from '../cashflow-chart.js';

/** The brand's rounded-square motif, at the opacity the CSS sets. */
function motif(seed) {
  const rects = [
    [560, -40, 150, 150], [690, 60, 150, 150], [830, -30, 150, 150],
    [620, 120, 150, 150], [940, 70, 150, 150], [770, -110, 150, 150],
  ];
  // xMaxYMid + slice keeps the squares square and crops them at the left.
  return (
    '<svg width="100%" height="100%" viewBox="0 0 1000 200" ' +
    'preserveAspectRatio="xMaxYMid slice" aria-hidden="true" focusable="false">' +
    rects
      .map(
        ([x, y, w, h], i) =>
          `<rect x="${x + seed * i}" y="${y}" width="${w}" height="${h}" ` +
          'rx="34" fill="none" stroke="currentColor" stroke-width="2"/>'
      )
      .join('') +
    '</svg>'
  );
}

function banner() {
  return (
    `<div class="banner__motif">${motif(3)}</div>` +
    '<div>' +
    `<p class="banner__label">Total Balance</p>` +
    '<div class="banner__amount">' +
    `<b class="num">${ACCOUNT.balance}</b>` +
    `<span class="delta delta--onteal">${ACCOUNT.delta}` +
    '<span data-icon="arrowUpRight" data-icon-size="13"></span></span>' +
    '</div></div>' +
    '<div class="banner__actions">' +
    '<button type="button" class="btn btn--green">' +
    '<span data-icon="plus" data-icon-size="16"></span>Add</button>' +
    '<button type="button" class="btn btn--ghost">' +
    '<span data-icon="arrowUp" data-icon-size="16"></span>Send</button>' +
    '<button type="button" class="btn btn--ghost">' +
    '<span data-icon="refresh" data-icon-size="16"></span>Request</button>' +
    '<button type="button" class="icon-btn icon-btn--onteal" aria-label="More actions">' +
    '<span data-icon="more" data-icon-size="18"></span></button>' +
    '</div>'
  );
}

function totals() {
  return CASH_FLOW.totals
    .map(
      (t) =>
        '<div class="total-row">' +
        `<span class="tile tile--${t.tile}" data-icon="${t.icon}" data-icon-size="18"></span>` +
        '<div>' +
        `<p class="total-row__label">${t.label}</p>` +
        `<p class="total-row__value num">${t.value}` +
        `<span class="delta delta--${t.direction}">${t.delta}` +
        `<span data-icon="arrow${t.direction === 'up' ? 'UpRight' : 'DownRight'}" ` +
        'data-icon-size="12"></span></span></p>' +
        '</div></div>'
    )
    .join('');
}

function statCards() {
  return STATS.map(
    (s) =>
      '<article class="card stat">' +
      '<div class="stat__head">' +
      `<span class="stat__icon" data-icon="${s.icon}" data-icon-size="19"></span>` +
      `<span>${s.label}</span><span class="when">${s.when}</span></div>` +
      `<p class="stat__value num">${s.value}` +
      `<span class="delta delta--${s.direction}">${s.delta}` +
      `<span data-icon="arrow${s.direction === 'up' ? 'UpRight' : 'DownRight'}" ` +
      'data-icon-size="12"></span></span></p>' +
      `<p class="stat__foot">${s.foot}</p>` +
      '</article>'
  ).join('');
}

function activityRows() {
  return ACTIVITY.map(
    (a) =>
      '<tr>' +
      '<td><div class="cell-who">' +
      `<span class="cell-who__mark" data-icon="${a.icon}" data-icon-size="15"></span>` +
      `<span><b>${a.who}</b><span class="cell-sub">${a.kind} &nbsp;·&nbsp; ${a.date}</span></span>` +
      '</div></td>' +
      `<td class="cell-amount"><b>${a.amount}</b>` +
      `<span class="cell-sub">${a.secondary}</span></td>` +
      `<td><span class="pill pill--${a.status === 'Success' ? 'ok' : 'wait'}">` +
      `${a.status}</span></td>` +
      `<td><b style="font-weight:500">${a.method}</b>` +
      `<span class="cell-sub">${a.mask}</span></td>` +
      '</tr>'
  ).join('');
}

function payCard() {
  return (
    '<div class="paycard-stack"></div>' +
    '<div class="paycard">' +
    `<div class="paycard__motif">${motif(7)}</div>` +
    '<div class="paycard__top">' +
    `<span class="paycard__brand">${CARD.scheme}</span>` +
    `<span class="paycard__number num">${CARD.number}</span>` +
    '</div>' +
    `<p class="paycard__amount num">${CARD.balance}</p>` +
    '</div>'
  );
}

/**
 * Fill every dashboard region and draw the chart.
 * @param {HTMLElement} root the `.app` element
 */
export function initDashboard(root) {
  const fill = (sel, html) => {
    const el = root.querySelector(sel);
    if (el) el.innerHTML = html;
  };

  fill('#banner', banner());
  fill('#flow-totals', totals());
  fill('#stat-row', statCards());
  fill('#activity-rows', activityRows());
  fill('#pay-card', payCard());

  const chart = root.querySelector('#cashflow');
  if (chart) renderCashFlow(chart, CASH_FLOW);

  hydrateIcons(root);

  // Weekly / Daily is display state on this static build.
  root.querySelector('#flow-seg')?.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;
    button.parentElement.querySelectorAll('button').forEach((b) => {
      b.setAttribute('aria-pressed', String(b === button));
    });
  });
}
