/**
 * sidebar.js — navigation list, Active Staking accordion, the Staking /
 * Stablecoin segmented control and the mobile drawer.
 */

import { NAV, ACTIVE_ASSETS } from '../data.js';
import { hydrateIcons } from '../icons.js';

const SUB_ID = 'active-staking-list';

function navItemMarkup(item) {
  // The external marker rides with the label so it reads as part of the name.
  const external = item.external
    ? '<span class="nav-item__external" data-icon="arrowUpRight" data-icon-size="13"></span>'
    : '';
  const parts = [
    `<span class="nav-item__icon" data-icon="${item.icon}"></span>`,
    `<span class="nav-item__label">${item.label}${external}</span>`,
  ];
  if (item.tag) parts.push(`<span class="tag">${item.tag}</span>`);
  if (item.count !== undefined) parts.push(`<span class="count num">${item.count}</span>`);
  if (item.sub) {
    parts.push('<span class="nav-item__caret" data-icon="chevronDown" data-icon-size="15"></span>');
  }

  const attrs = item.sub
    ? ` aria-expanded="true" aria-controls="${SUB_ID}"`
    : ` aria-current="${item.active ? 'page' : 'false'}"`;

  return (
    `<button type="button" class="nav-item${item.active ? ' is-active' : ''}" ` +
    `data-nav="${item.id}"${attrs}>${parts.join('')}</button>`
  );
}

function subListMarkup() {
  const rows = ACTIVE_ASSETS.map(
    (asset) =>
      `<button type="button" class="nav-sub__row${asset.muted ? ' is-muted' : ''}">` +
      `<span class="coin-mark coin-mark--sm" style="background:${asset.color}">` +
      `${asset.symbol.slice(0, 2)}</span><span><span class="nav-sub__label">` +
      `${asset.name}</span><span class="nav-sub__value">Amount ${asset.amount}</span></span>` +
      '</button>'
  ).join('');

  return `<div class="nav-sub" id="${SUB_ID}">${rows}</div>`;
}

/**
 * Render the navigation and wire every sidebar interaction.
 * @param {HTMLElement} root the `.app` element
 */
export function initSidebar(root) {
  const nav = root.querySelector('#sidebar-nav');
  nav.innerHTML = NAV.map((item) =>
    item.sub ? navItemMarkup(item) + subListMarkup() : navItemMarkup(item)
  ).join('');
  hydrateIcons(nav);

  const isDrawer = () => window.matchMedia('(max-width: 1040px)').matches;
  const closeDrawer = () => root.classList.remove('is-nav-open');

  nav.addEventListener('click', (event) => {
    const button = event.target.closest('.nav-item');
    if (!button) return;

    // The Active Staking row is an accordion, not a destination.
    if (button.hasAttribute('aria-controls')) {
      const open = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!open));
      root.querySelector(`#${SUB_ID}`).hidden = open;
      return;
    }

    nav.querySelectorAll('.nav-item[aria-current]').forEach((item) => {
      item.classList.remove('is-active');
      item.setAttribute('aria-current', 'false');
    });
    button.classList.add('is-active');
    button.setAttribute('aria-current', 'page');
    if (isDrawer()) closeDrawer();
  });

  root.querySelector('.segmented').addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;
    button.parentElement.querySelectorAll('button').forEach((item) => {
      item.setAttribute('aria-pressed', String(item === button));
    });
  });

  root.querySelector('#menu-btn').addEventListener('click', () => {
    root.classList.toggle('is-nav-open');
  });
  root.querySelector('.scrim').addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeDrawer();
  });
}
