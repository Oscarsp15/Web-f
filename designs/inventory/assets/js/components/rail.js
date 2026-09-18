/**
 * rail.js — the icon rail and the team avatars.
 */

import { NAV, TEAM } from '../data.js';
import { hydrateIcons } from '../icons.js';

export function initRail(root) {
  const nav = root.querySelector('#rail-nav');
  if (!nav) return;

  nav.innerHTML = NAV.map(
    (item) =>
      `<button type="button" class="rail__btn${item.active ? ' is-active' : ''}" ` +
      `data-nav="${item.id}" aria-label="${item.id}" ` +
      `aria-current="${item.active ? 'page' : 'false'}" ` +
      `data-icon="${item.icon}" data-icon-size="19"></button>`
  ).join('');

  const foot = root.querySelector('#rail-team');
  if (foot) {
    foot.innerHTML =
      TEAM.map(
        (t) =>
          `<span class="rail__avatar" style="background:${t.color}" ` +
          `title="${t.initials}">${t.initials}</span>`
      ).join('') +
      '<button type="button" class="rail__avatar rail__avatar--add" ' +
      'aria-label="Invite a teammate">+</button>';
  }

  hydrateIcons(root.querySelector('.rail'));

  nav.addEventListener('click', (event) => {
    const btn = event.target.closest('.rail__btn');
    if (!btn) return;
    nav.querySelectorAll('.rail__btn').forEach((b) => {
      b.classList.toggle('is-active', b === btn);
      b.setAttribute('aria-current', b === btn ? 'page' : 'false');
    });
  });
}
