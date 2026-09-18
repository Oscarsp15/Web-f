/**
 * icons.js — inline SVG icon registry.
 *
 * Icons are stroke-based on a 24x24 grid so they inherit `currentColor` and
 * stay crisp at any size. Markup declares `data-icon="name"` (optionally
 * `data-icon-size="20"`) and `hydrateIcons(root)` swaps in the real SVG.
 */

const PATHS = {
  dashboard: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9.5 3v18"/>',
  layers: '<path d="M12 3 3 7.5 12 12l9-4.5L12 3Z"/><path d="m3 12.5 9 4.5 9-4.5"/>',
  server:
    '<rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01"/>',
  calculator:
    '<rect x="4" y="3" width="16" height="18" rx="3"/><path d="M8 7.5h8M8 12h.01M12 12h.01M16 12h.01M8 16.5h.01M12 16.5h.01M16 16.5h.01"/>',
  api: '<path d="m8 9-3 3 3 3M16 9l3 3-3 3M13.5 7l-3 10"/>',
  droplet: '<path d="M12 3s6 6.2 6 10a6 6 0 0 1-12 0c0-3.8 6-10 6-10Z"/>',
  coins:
    '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/><path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/>',
  logo: '<path d="M5.5 13.5 13.5 3l-1.6 6.6h6.6L10.5 21l1.6-7.5H5.5Z"/>',
  chevronUpDown: '<path d="m8 9.5 4-4 4 4M8 14.5l4 4 4-4"/>',
  chevronDown: '<path d="m6 9.5 6 6 6-6"/>',
  arrowUpRight: '<path d="M7 17 17 7M9 7h8v8"/>',
  arrowUp: '<path d="M12 19V5m0 0-5.5 5.5M12 5l5.5 5.5"/>',
  arrowDown: '<path d="M12 5v14m0 0 5.5-5.5M12 19l-5.5-5.5"/>',
  arrowDownRight: '<path d="M7 7 17 17M17 9v8H9"/>',
  bell: '<path d="M18 8.5a6 6 0 1 0-12 0c0 6.5-3 8-3 8h18s-3-1.5-3-8"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>',
  settings:
    '<path d="M4 7h16M4 12h16M4 17h16"/><circle cx="9" cy="7" r="2"/><circle cx="15" cy="12" r="2"/><circle cx="8" cy="17" r="2"/>',
  lock: '<rect x="4" y="10" width="16" height="10" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  wallet:
    '<rect x="3" y="6" width="18" height="13" rx="3"/><path d="M3 10.5h18"/><circle cx="17" cy="14.5" r="1.2"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.2 2"/>',
  link: '<path d="M10.2 14a4 4 0 0 0 5.6 0l2.6-2.6a4 4 0 1 0-5.6-5.6L11.4 7.2"/><path d="M13.8 10a4 4 0 0 0-5.6 0L5.6 12.6a4 4 0 0 0 5.6 5.6l1.4-1.4"/>',
  share: '<path d="M4 13v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6"/><path d="M12 15.5V3m0 0L7.8 7.2M12 3l4.2 4.2"/>',
  chart: '<path d="m4 17 5.5-6.5 4 3L20 5"/><path d="M20 10V5h-5"/>',
  plus: '<circle cx="12" cy="12" r="9"/><path d="M12 8.2v7.6M8.2 12h7.6"/>',
  refresh: '<path d="M20.5 11.5a8.5 8.5 0 1 0-1.6 5.6"/><path d="M20.5 5.5v6h-6"/>',
  filter: '<path d="M3.5 5h17l-6.6 7.8V19l-3.8 2v-8.2L3.5 5Z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
};

/**
 * Build the SVG markup for one icon.
 * @param {string} name key of PATHS
 * @param {number} [size] pixel size, default 18
 * @returns {string} svg markup, or an empty string for an unknown name
 */
export function icon(name, size = 18) {
  const body = PATHS[name];
  if (!body) return '';
  return (
    `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" ` +
    'stroke="currentColor" stroke-width="1.6" stroke-linecap="round" ' +
    `stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`
  );
}

/**
 * Replace every `[data-icon]` placeholder inside `root` with its SVG.
 * Safe to call repeatedly — hydrated nodes are marked and skipped.
 * @param {ParentNode} [root]
 */
export function hydrateIcons(root = document) {
  root.querySelectorAll('[data-icon]:not([data-icon-ready])').forEach((el) => {
    const size = Number(el.dataset.iconSize) || 18;
    el.innerHTML = icon(el.dataset.icon, size);
    el.setAttribute('data-icon-ready', '');
  });
}
