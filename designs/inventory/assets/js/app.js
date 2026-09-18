/**
 * app.js — bootstrap for the inventory dashboard.
 */

import { hydrateIcons } from './icons.js';
import { initRail } from './components/rail.js';
import { initSidePanel } from './components/side-panel.js';
import { initTable } from './components/inventory-table.js';

const root = document.querySelector('.app');
hydrateIcons(document);
initRail(root);
initSidePanel(root);   // renders the search box the table listens to
initTable(root);

// On narrow screens the side panel becomes a drawer over the table.
const toggle = document.querySelector('#side-toggle');
toggle?.addEventListener('click', () => root.classList.toggle('is-side-open'));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') root.classList.remove('is-side-open');
});
