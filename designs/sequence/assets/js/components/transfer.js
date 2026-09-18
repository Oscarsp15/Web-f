/**
 * transfer.js — the money-transfer screen: stepper, amounts, fee breakdown.
 */

import { TRANSFER } from '../data.js';
import { hydrateIcons } from '../icons.js';

/** Simple circular flags, drawn rather than fetched. */
const FLAGS = {
  EUR:
    '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="12" fill="#12408f"/>' +
    [...Array(12)].map((_, i) => {
      const a = (i / 12) * Math.PI * 2;
      const x = 12 + Math.sin(a) * 6.6;
      const y = 12 - Math.cos(a) * 6.6;
      return `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="1.05" fill="#f5d020"/>`;
    }).join('') +
    '</svg>',
  USD:
    '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="12" fill="#f4f6f8"/>' +
    [0, 2, 4, 6, 8, 10].map((i) =>
      `<rect x="0" y="${i * 2 + 1}" width="24" height="2" fill="#d8283c"/>`
    ).join('') +
    '<rect x="0" y="1" width="11" height="11" fill="#2a3b7d"/>' +
    '</svg>',
};

function stepper() {
  return TRANSFER.steps
    .map(
      (label, i) =>
        `<div class="step${i === TRANSFER.current ? ' is-current' : ''}">` +
        '<span class="step__dot"></span>' +
        `<span>${label}</span></div>`
    )
    .join('');
}

function breakdown() {
  return TRANSFER.rows
    .map((row) => {
      if (row.rule) return '<div class="breakdown__rule"></div>';
      return (
        '<div class="breakdown__row">' +
        `<span class="breakdown__op" aria-hidden="true">${row.op}</span>` +
        `<span class="label${row.linked ? ' is-linked' : ''}">${row.label}</span>` +
        `<span class="value num">${row.value}</span>` +
        '</div>'
      );
    })
    .join('');
}

function amountField(id, side, label) {
  return (
    `<div><p class="field__label">${label}</p>` +
    '<div class="field">' +
    `<span style="font-size:24px">${side.symbol}</span>` +
    `<label class="visually-hidden" for="${id}">${label}</label>` +
    `<input id="${id}" class="num" value="${side.amount}" inputmode="decimal" />` +
    '<button type="button" class="currency">' +
    `<span class="currency__flag">${FLAGS[side.currency] || ''}</span>` +
    `${side.currency}<span data-icon="chevronDown" data-icon-size="16"></span>` +
    '</button></div></div>'
  );
}

/**
 * Render the transfer screen.
 * @param {HTMLElement} root
 */
export function initTransfer(root) {
  const fill = (sel, html) => {
    const el = root.querySelector(sel);
    if (el) el.innerHTML = html;
  };

  fill('#stepper', stepper());
  fill('#send-field', amountField('send-amount', TRANSFER.send, 'You send exactly'));
  fill('#breakdown', breakdown());
  fill('#receive-field', amountField('receive-amount', TRANSFER.receive, 'Recipient gets'));
  fill('#arrival', `Should arrive <b>${TRANSFER.arrival}</b>`);
  fill('#note', TRANSFER.note);

  hydrateIcons(root);
}
