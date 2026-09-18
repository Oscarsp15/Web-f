/**
 * app.js — bootstrap. Hydrates the shell's icons, then hands each region to
 * its own component module.
 */

import { hydrateIcons } from './icons.js';
import { initSidebar } from './components/sidebar.js';
import { initAssetCards } from './components/asset-cards.js';
import { initActiveStaking } from './components/active-staking.js';
import { initPeriodSlider } from './components/period-slider.js';

const root = document.querySelector('.app');

hydrateIcons(document);
initSidebar(root);
initAssetCards(root);
initActiveStaking(root);
initPeriodSlider(root);

// Filter chips are display state only — they mark the active sort of the grid.
root.querySelector('#asset-filters')?.addEventListener('click', (event) => {
  const chip = event.target.closest('.chip--button');
  if (chip) chip.classList.toggle('chip--solid');
});
