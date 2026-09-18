/**
 * send.js — bootstrap for the transfer flow.
 */

import { hydrateIcons } from './icons.js';
import { initTransfer } from './components/transfer.js';

hydrateIcons(document);
initTransfer(document);
