/**
 * active-staking.js — the Momentum / General / Risk / Reward tabs and the
 * stat cards they drive.
 */

import { STAKE, TABS } from '../data.js';
import { hydrateIcons } from '../icons.js';

function stakeSummaryMarkup() {
  return (
    `<p class="stamp"><span data-icon="clock" data-icon-size="14"></span>${STAKE.updated}</p>` +
    '<div class="stake__title">' +
    `<h2>${STAKE.asset}</h2>` +
    `<span class="coin-mark" style="background:${STAKE.color}">` +
    `${STAKE.symbol.slice(0, 2)}</span>` +
    '<button type="button" class="icon-btn icon-btn--sm" aria-label="Copy stake address">' +
    '<span data-icon="link" data-icon-size="16"></span></button>' +
    '<button type="button" class="icon-btn icon-btn--sm" aria-label="Share stake">' +
    '<span data-icon="share" data-icon-size="16"></span></button>' +
    '<a class="chip chip--button" href="#profile">View Profile' +
    '<span data-icon="arrowUpRight" data-icon-size="14"></span></a>' +
    '</div>' +
    `<p class="stake__label">Current Reward Balance, ${STAKE.symbol}</p>` +
    '<div class="stake__balance-row">' +
    `<p class="stake__balance num">${STAKE.balanceLead}` +
    `<span class="dim">${STAKE.balanceTail}</span></p>` +
    '<button type="button" class="btn btn--primary">Upgrade</button>' +
    '<button type="button" class="btn btn--outline">Unstake</button>' +
    '</div>'
  );
}

function valueCard(stat) {
  const badge = stat.badge ? `<span class="chip chip--sm">${stat.badge}</span>` : '';
  const unit = stat.unit ? `<em>${stat.unit}</em>` : '';
  const delta = stat.delta
    ? `<small class="is-${stat.direction}">${stat.delta}` +
      `<span data-icon="${stat.direction === 'up' ? 'arrowUpRight' : 'arrowDownRight'}" ` +
      'data-icon-size="12"></span></small>'
    : '';

  return (
    '<article class="stat"><div class="stat__head">' +
    `<span>${stat.label}</span>${badge}</div>` +
    `<p class="stat__value num">${stat.value}${unit}${delta}</p></article>`
  );
}

function metersCard(stat) {
  const rows = stat.rows
    .map(
      (row) =>
        '<div class="meter"><span class="meter__track">' +
        `<i class="meter__fill" style="width:${row.pct}%"></i>` +
        `<b class="meter__knob" style="left:${row.pct}%"></b></span>` +
        `<span class="meter__value">${row.value}</span>` +
        `<span class="meter__when">${row.when}</span></div>`
    )
    .join('');

  return (
    '<article class="stat"><div class="stat__head">' +
    `<span>${stat.label}</span></div><div class="meters">${rows}</div></article>`
  );
}

function renderStats(grid, tab) {
  grid.innerHTML = tab.stats
    .map((stat) => (stat.type === 'meters' ? metersCard(stat) : valueCard(stat)))
    .join('');
  hydrateIcons(grid);
}

/**
 * Render the tab strip and keep the stat grid in sync with the selection.
 * @param {HTMLElement} root the `.app` element
 */
export function initActiveStaking(root) {
  const summary = root.querySelector('#stake-summary');
  summary.innerHTML = stakeSummaryMarkup();
  hydrateIcons(summary);

  const tabs = root.querySelector('#stat-tabs');
  const grid = root.querySelector('#stat-grid');

  tabs.innerHTML = TABS.map(
    (tab, i) =>
      `<button type="button" class="tab" role="tab" data-tab="${tab.id}" ` +
      `id="tab-${tab.id}" aria-controls="stat-grid" aria-selected="${i === 0}">` +
      `<span><b>${tab.label}</b><span>${tab.hint}</span></span>` +
      '<span data-icon="chevronUpDown" data-icon-size="15"></span></button>'
  ).join('');
  hydrateIcons(tabs);

  renderStats(grid, TABS[0]);

  tabs.addEventListener('click', (event) => {
    const button = event.target.closest('.tab');
    if (!button || button.getAttribute('aria-selected') === 'true') return;

    tabs.querySelectorAll('.tab').forEach((tab) => {
      tab.setAttribute('aria-selected', String(tab === button));
    });
    grid.setAttribute('aria-labelledby', button.id);
    renderStats(grid, TABS.find((tab) => tab.id === button.dataset.tab));
  });
}
