/**
 * icons.js — inline SVG registry. 1.6px stroke on a 24x24 grid.
 */

const PATHS = {
  logo: '<path d="M3 7.5 7 17l4-7 4 7 4-9.5" stroke-width="2.6"/>',
  clock: '<circle cx="12" cy="12" r="8.6"/><path d="M12 7.2v5.2l3.2 2"/>',
  box: '<path d="M4 8.2 12 4l8 4.2v7.6L12 20l-8-4.2V8.2Z"/><path d="m4 8.2 8 4.2 8-4.2M12 12.4V20"/>',
  orders: '<rect x="4" y="3.6" width="16" height="16.8" rx="2.6"/><path d="M8 8.4h8M8 12.4h8M8 16.4h5"/>',
  star: '<path d="m12 4 2.3 5.1 5.5.6-4.1 3.8 1.1 5.5L12 16.2 7.2 19l1.1-5.5L4.2 9.7l5.5-.6L12 4Z"/>',
  truck: '<path d="M3 7.2h10v9.6H3zM13 10.8h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/>',
  settings:
    '<circle cx="12" cy="12" r="3.1"/><path d="M12 3.4v2.2M12 18.4v2.2M20.6 12h-2.2M5.6 12H3.4M18.1 5.9l-1.6 1.6M7.5 16.5l-1.6 1.6M18.1 18.1l-1.6-1.6M7.5 7.5 5.9 5.9"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>',
  chevronDown: '<path d="m6 9.5 6 6 6-6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  list: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  grid: '<rect x="4" y="4" width="7" height="7" rx="1.8"/><rect x="13" y="4" width="7" height="7" rx="1.8"/><rect x="4" y="13" width="7" height="7" rx="1.8"/><rect x="13" y="13" width="7" height="7" rx="1.8"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
};

/** @param {string} name @param {number} [size] @returns {string} */
export function icon(name, size = 18) {
  const body = PATHS[name];
  if (!body) return '';
  return (
    `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" ` +
    'stroke="currentColor" stroke-width="1.6" stroke-linecap="round" ' +
    `stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`
  );
}

/** @param {ParentNode} [root] */
export function hydrateIcons(root = document) {
  root.querySelectorAll('[data-icon]:not([data-icon-ready])').forEach((el) => {
    el.innerHTML = icon(el.dataset.icon, Number(el.dataset.iconSize) || 18);
    el.setAttribute('data-icon-ready', '');
  });
}
