/**
 * rail.js — the sidebar: grouped navigation, Pro Mode toggle, mobile drawer.
 */

import { NAV, ACCOUNT } from '../data.js';
import { hydrateIcons } from '../icons.js';

function itemMarkup(item) {
  const parts = [
    `<span class="rail__icon" data-icon="${item.icon}" data-icon-size="19"></span>`,
    `<span class="grow">${item.label}</span>`,
  ];
  if (item.badge) parts.push(`<span class="pill pill--brand">${item.badge}</span>`);
  if (item.expandable) {
    parts.push('<span data-icon="chevronDown" data-icon-size="16"></span>');
  }
  return (
    `<button type="button" class="rail__item${item.active ? ' is-active' : ''}" ` +
    `data-nav="${item.id}" aria-current="${item.active ? 'page' : 'false'}">` +
    `${parts.join('')}</button>`
  );
}

/**
 * Render the rail and wire its interactions.
 * @param {HTMLElement} root the `.app` element
 */
export function initRail(root) {
  const nav = root.querySelector('#rail-nav');
  if (!nav) return;

  nav.innerHTML = NAV.map(
    (group) =>
      `<div><p class="rail__label">${group.label.toUpperCase()}</p>` +
      `<div>${group.items.map(itemMarkup).join('')}</div></div>`
  ).join('');

  const chip = root.querySelector('#user-chip');
  if (chip) {
    chip.innerHTML =
      `<span class="user-chip__avatar">${ACCOUNT.user.initials}</span>` +
      `<span class="user-chip__text"><b>${ACCOUNT.user.name}</b>` +
      `<span>${ACCOUNT.user.email}</span></span>` +
      '<span data-icon="chevronDown" data-icon-size="16"></span>';
  }
  hydrateIcons(root.querySelector('.rail'));

  const isDrawer = () => window.matchMedia('(max-width: 1000px)').matches;
  const close = () => root.classList.remove('is-nav-open');

  nav.addEventListener('click', (event) => {
    const button = event.target.closest('.rail__item');
    if (!button) return;
    nav.querySelectorAll('.rail__item').forEach((item) => {
      item.classList.toggle('is-active', item === button);
      item.setAttribute('aria-current', item === button ? 'page' : 'false');
    });
    if (isDrawer()) close();
  });

  const pro = root.querySelector('#pro-mode');
  pro?.addEventListener('click', () => {
    pro.setAttribute('aria-pressed', String(pro.getAttribute('aria-pressed') !== 'true'));
  });

  root.querySelector('#menu-btn')?.addEventListener('click', () => {
    root.classList.toggle('is-nav-open');
  });
  root.querySelector('.scrim')?.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}
