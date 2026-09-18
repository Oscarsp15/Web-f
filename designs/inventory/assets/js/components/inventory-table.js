/**
 * inventory-table.js — the toolbar, the item table with expandable rows, and
 * the grid view.
 *
 * The search box actually filters. The screen's whole premise is "Search for
 * items", so a search that only looks like a search would be the one dishonest
 * thing on the page.
 */

import { FILTERS, COLUMNS, ITEMS, DETAIL_FIELDS } from '../data.js';
import { hydrateIcons } from '../icons.js';

const esc = (s = '') =>
  String(s).replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' })[c]);

// An eight-column table is unreadable at 390px, so phones open on the card
// view. The toggle still switches to the table, which scrolls in its wrapper.
let view = window.matchMedia('(max-width: 720px)').matches ? 'grid' : 'list';
let query = '';
const open = new Set(ITEMS.filter((i) => i.open).map((i) => i.id));
const checked = new Set(ITEMS.filter((i) => i.checked).map((i) => i.id));

const matches = (item) => {
  if (!query) return true;
  const q = query.toLowerCase();
  return item.name.toLowerCase().includes(q) || item.id.toLowerCase().includes(q);
};

function toolbar() {
  return (
    FILTERS.map(
      (f) =>
        `<button type="button" class="select">${f.label} : <b>${f.value}</b>` +
        '<span data-icon="chevronDown" data-icon-size="15"></span></button>'
    ).join('') +
    '<button type="button" class="btn btn--violet">Add items' +
    '<span data-icon="plus" data-icon-size="16"></span></button>' +
    '<div class="viewtoggle" role="group" aria-label="View">' +
    `<button type="button" data-view="list" aria-pressed="${view === 'list'}" ` +
    'aria-label="List view" data-icon="list" data-icon-size="17"></button>' +
    `<button type="button" data-view="grid" aria-pressed="${view === 'grid'}" ` +
    'aria-label="Grid view" data-icon="grid" data-icon-size="17"></button></div>'
  );
}

function detailRow(item) {
  const cells = DETAIL_FIELDS.map(
    ([label, key]) =>
      `<div class="field"><span>${label}</span><b>${esc(item[key])}</b></div>`
  );
  // Nine fields fill three columns by three rows beside the image; tags then
  // take a row of their own rather than breaking that grid.
  cells.push(
    '<div class="field field--tags"><span>Tags</span><div class="field__tags">' +
      item.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('') +
      '</div></div>'
  );

  return (
    `<tr class="detail" data-detail="${item.id}"><td colspan="8">` +
    '<div class="detail__grid">' +
    '<div class="detail__image" role="img" aria-label="Product photo placeholder"></div>' +
    cells.join('') +
    '</div></td></tr>'
  );
}

function rows(items) {
  if (!items.length) {
    return '<tr><td colspan="8" class="empty">No items match that search.</td></tr>';
  }
  return items
    .map((item, i) => {
      const isOpen = open.has(item.id);
      const row =
        `<tr class="row${isOpen ? ' is-open' : ''}" data-row="${item.id}">` +
        `<td><input class="check" type="checkbox" ${checked.has(item.id) ? 'checked' : ''} ` +
        `aria-label="Select ${esc(item.name)}" data-check="${item.id}" /></td>` +
        '<td><span class="thumb"></span></td>' +
        `<td class="num">${esc(item.id)}</td>` +
        `<td class="name">${esc(item.name)}</td>` +
        `<td>${esc(item.size)}</td>` +
        `<td class="num">${esc(item.price)}</td>` +
        `<td class="num">${esc(item.stock)}</td>` +
        '<td><button type="button" class="chev" data-toggle="' + item.id + '" ' +
        `aria-expanded="${isOpen}" aria-controls="d-${item.id}" ` +
        `aria-label="Details for ${esc(item.name)}" ` +
        'data-icon="chevronDown" data-icon-size="17"></button></td></tr>';
      return isOpen ? row + detailRow(item) : row;
    })
    .join('');
}

function gridView(items) {
  if (!items.length) return '<p class="empty">No items match that search.</p>';
  return (
    '<div class="grid-view">' +
    items
      .map(
        (item) =>
          '<article class="tile"><div class="tile__art"></div>' +
          `<b>${esc(item.name)}</b>` +
          `<p class="tile__row">${esc(item.id)}<b>${esc(item.price)}</b></p>` +
          `<p class="tile__row">${esc(item.size)}<b>${esc(item.stock)}</b></p>` +
          '</article>'
      )
      .join('') +
    '</div>'
  );
}

function paint(root) {
  const items = ITEMS.filter(matches);
  const host = root.querySelector('#table-host');

  host.innerHTML =
    view === 'grid'
      ? gridView(items)
      : '<div class="table-wrap"><table class="table"><thead><tr>' +
        '<th><span class="visually-hidden">Select</span></th>' +
        '<th><span class="visually-hidden">Photo</span></th>' +
        COLUMNS.slice(1)
          .map((c) => `<th scope="col">${c}</th>`)
          .join('') +
        '<th><span class="visually-hidden">Details</span></th>' +
        `</tr></thead><tbody>${rows(items)}</tbody></table></div>`;

  hydrateIcons(host);
}

export function initTable(root) {
  const bar = root.querySelector('#toolbar');
  bar.innerHTML = toolbar();
  hydrateIcons(bar);
  paint(root);

  bar.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-view]');
    if (!btn) return;
    view = btn.dataset.view;
    bar.querySelectorAll('[data-view]').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.view === view));
    });
    paint(root);
  });

  root.querySelector('#table-host').addEventListener('click', (event) => {
    const toggle = event.target.closest('[data-toggle]');
    if (toggle) {
      const id = toggle.dataset.toggle;
      if (open.has(id)) open.delete(id);
      else open.add(id);
      paint(root);
    }
  });

  root.querySelector('#table-host').addEventListener('change', (event) => {
    const box = event.target.closest('[data-check]');
    if (!box) return;
    if (box.checked) checked.add(box.dataset.check);
    else checked.delete(box.dataset.check);
  });

  const search = root.querySelector('#q');
  search?.addEventListener('input', () => {
    query = search.value.trim();
    paint(root);
  });
}
