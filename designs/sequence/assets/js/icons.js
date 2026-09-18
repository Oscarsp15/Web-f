/**
 * icons.js — inline SVG icon registry for Sequence.
 *
 * 1.5px stroke on a 24x24 grid, inheriting `currentColor`. Markup declares
 * `data-icon="name"` and `hydrateIcons(root)` swaps in the real SVG.
 */

const PATHS = {
  dashboard: '<circle cx="12" cy="12" r="8.4"/><path d="m15 9-4.2 1.8L9 15l4.2-1.8L15 9Z"/>',
  payment: '<path d="M4 8.5h13m0 0-3-3m3 3-3 3"/><path d="M20 15.5H7m0 0 3 3m-3-3 3-3"/>',
  transaction: '<path d="M4 7h3M4 12h3M4 17h3M10 7h10M10 12h10M10 17h10"/>',
  cards: '<rect x="3" y="5.5" width="18" height="13" rx="2.6"/><path d="M3 10h18"/>',
  capital: '<path d="M4 20h16M6 20v-7M12 20V8M18 20v-4"/><path d="m5 9 6-4 3 2 5-3.5"/>',
  vaults: '<path d="M12 3.2 20 6v6c0 4.2-3.2 7.4-8 8.8C7.2 19.4 4 16.2 4 12V6l8-2.8Z"/>',
  reports: '<path d="M6 3.5h8.5L19 8v12.5H6V3.5Z"/><path d="M14 3.5V8h5"/><path d="M9 13h6M9 16.5h4"/>',
  earn: '<rect x="3.5" y="8.5" width="17" height="11.5" rx="2"/><path d="M3.5 12.5h17M12 8.5V20"/><path d="M12 8.5S9.6 4 7.6 4a2.2 2.2 0 0 0 0 4.4M12 8.5s2.4-4.5 4.4-4.5a2.2 2.2 0 0 1 0 4.4"/>',
  settings:
    '<circle cx="12" cy="12" r="3"/><path d="M19.4 14a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V20a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H4a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H10a1.6 1.6 0 0 0 1-1.5V4a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V10a1.6 1.6 0 0 0 1.5 1H20a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z"/>',
  help: '<circle cx="12" cy="12" r="8.6"/><path d="M9.8 9.4a2.3 2.3 0 1 1 3.2 2.1c-.7.3-1 .9-1 1.6v.4"/><path d="M12 17h.01"/>',
  pro: '<path d="m12 3 2 4.6 5 .6-3.7 3.4 1 4.9L12 14l-4.3 2.5 1-4.9L5 8.2l5-.6L12 3Z"/><path d="M18.5 17.5 19 19l1.5.5-1.5.5-.5 1.5-.5-1.5L16.5 19l1.5-.5.5-1.5Z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>',
  calendar:
    '<rect x="3.5" y="5" width="17" height="15.5" rx="2.4"/><path d="M3.5 9.6h17M8 3.4V6.6M16 3.4V6.6"/>',
  calendarPlus:
    '<rect x="3.5" y="5" width="17" height="15.5" rx="2.4"/><path d="M3.5 9.6h17M8 3.4V6.6M16 3.4V6.6"/><path d="M12 12.6v5M9.5 15.1h5"/>',
  export: '<path d="M12 15.5V4m0 0L8 8m4-4 4 4"/><path d="M4 15v3.5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V15"/>',
  chevronDown: '<path d="m6 9.5 6 6 6-6"/>',
  chevronLeft: '<path d="M14 6 8 12l6 6"/>',
  collapse: '<path d="M14.5 6 8.5 12l6 6"/><path d="M5 5v14"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  arrowUp: '<path d="M12 19V5m0 0-5.5 5.5M12 5l5.5 5.5"/>',
  arrowDownLeft: '<path d="M17 7 7 17m0 0h7m-7 0v-7"/>',
  arrowUpRight: '<path d="M7 17 17 7M9 7h8v8"/>',
  arrowDownRight: '<path d="M7 7 17 17M17 9v8H9"/>',
  refresh: '<path d="M20.5 11.5a8.5 8.5 0 1 0-1.6 5.6"/><path d="M20.5 5.5v6h-6"/>',
  more: '<circle cx="6" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="18" cy="12" r="1.5"/>',
  swap: '<path d="M8 4v15m0 0-3.2-3.2M8 19l3.2-3.2"/><path d="M16 20V5m0 0-3.2 3.2M16 5l3.2 3.2"/>',
  filter: '<path d="M4 6.5h16M7 12h10M10 17.5h4"/>',
  sort: '<path d="M7 4v15m0 0-3-3m3 3 3-3"/><path d="M17 20V5m0 0-3 3m3-3 3 3"/>',
  pulse: '<path d="M3 12.5h3.5L9 6l3.5 12L15 12h6"/>',
  bank: '<path d="M4 10h16M5.5 10v7M10 10v7M14 10v7M18.5 10v7M3.5 20h17"/><path d="M12 3.5 21 8H3l9-4.5Z"/>',
  piggy:
    '<path d="M12 20.5a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/>' +
    '<path d="M14.6 9.6a3 3 0 0 0-4.6.5c0 2.4 4.8 1.3 4.8 3.8a3 3 0 0 1-4.8.5"/>' +
    '<path d="M12 7.6v9.2"/>',
  receipt:
    '<path d="M5 4.5h14V20l-2.3-1.4-2.3 1.4-2.4-1.4L9.6 20l-2.3-1.4L5 20V4.5Z"/><path d="M9 9h6M9 12.5h4"/>',
  cardSm: '<rect x="3" y="6" width="18" height="12" rx="2.4"/><path d="M3 10h18"/>',
  close: '<path d="m6.5 6.5 11 11m0-11-11 11"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
};

/**
 * Markup for one icon.
 * @param {string} name key of PATHS
 * @param {number} [size] pixel size
 * @returns {string} svg markup, or '' when the name is unknown
 */
export function icon(name, size = 18) {
  const body = PATHS[name];
  if (!body) return '';
  return (
    `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" ` +
    'stroke="currentColor" stroke-width="1.5" stroke-linecap="round" ' +
    `stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`
  );
}

/**
 * Replace every `[data-icon]` placeholder inside `root` with its SVG.
 * @param {ParentNode} [root]
 */
export function hydrateIcons(root = document) {
  root.querySelectorAll('[data-icon]:not([data-icon-ready])').forEach((el) => {
    const size = Number(el.dataset.iconSize) || 18;
    el.innerHTML = icon(el.dataset.icon, size);
    el.setAttribute('data-icon-ready', '');
  });
}
