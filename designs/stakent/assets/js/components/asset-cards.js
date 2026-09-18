/**
 * asset-cards.js — the three recommended staking assets and their sparklines.
 */

import { ASSETS } from '../data.js';
import { hydrateIcons } from '../icons.js';
import { coinLogo } from '../coin-logos.js';
import { renderSparkline } from '../sparkline.js';

function cardMarkup(asset) {
  const arrow = asset.direction === 'up' ? 'arrowUp' : 'arrowDown';

  return (
    `<article class="asset-card" data-asset="${asset.id}">` +
    '<header class="asset-card__head">' +
    `<span class="coin-mark" style="background:${asset.color}">` +
    `${coinLogo(asset.symbol)}</span>` +
    '<div>' +
    `<span class="asset-card__kind">${asset.kind}</span>` +
    `<h3 class="asset-card__name">${asset.name}</h3>` +
    '</div>' +
    `<button type="button" class="icon-btn icon-btn--round" aria-label="Open ${asset.name}">` +
    '<span data-icon="arrowUpRight" data-icon-size="15"></span></button>' +
    '</header>' +
    '<p class="asset-card__label">Reward Rate</p>' +
    `<p class="asset-card__rate num">${asset.rate}<span>%</span></p>` +
    `<p class="delta delta--${asset.direction}">` +
    `<i class="delta__dot" data-icon="${arrow}" data-icon-size="11"></i>${asset.delta}</p>` +
    '<div class="spark"></div>' +
    '</article>'
  );
}

/**
 * Render the asset grid.
 * @param {HTMLElement} root the `.app` element
 */
export function initAssetCards(root) {
  const grid = root.querySelector('#asset-grid');
  grid.innerHTML = ASSETS.map(cardMarkup).join('');
  hydrateIcons(grid);

  ASSETS.forEach((asset) => {
    const host = grid.querySelector(`[data-asset="${asset.id}"] .spark`);
    renderSparkline(host, asset);
  });
}
