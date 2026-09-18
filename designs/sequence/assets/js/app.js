/**
 * app.js — bootstrap for the Sequence dashboard.
 */

import { hydrateIcons } from './icons.js';
import { initRail } from './components/rail.js';
import { initDashboard } from './components/dashboard.js';

const root = document.querySelector('.app');
hydrateIcons(document);
initRail(root);
initDashboard(root);
