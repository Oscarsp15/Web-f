/**
 * app.js — fills the presentation sheet from the page data.
 */

import { WALL, COVERS, CONTENTS, BANDS, BRAND } from './data.js';
import { renderCover, renderContents, renderThumb } from './pages.js';

const fill = (sel, html) => {
  const el = document.querySelector(sel);
  if (el) el.innerHTML = html;
};

const figure = (pageHtml, caption) =>
  `<figure class="figure">${pageHtml}<figcaption>${caption}</figcaption></figure>`;

fill('#wall', WALL.map(renderThumb).join(''));
fill('#covers', COVERS.map((c) => figure(renderCover(c), c.caption)).join(''));
fill('#contents-row', CONTENTS.map((c) => figure(renderContents(c), c.caption)).join(''));
fill('#hero-cover', renderCover(COVERS[0]));

fill('#covers-head',
  `<h2 class="serif">${BANDS.covers.title}</h2><p>${BANDS.covers.text}</p>`);
fill('#contents-head',
  `<h2 class="serif">${BANDS.contents.title}</h2><p>${BANDS.contents.text}</p>`);
fill('#kicker', `<b>${BRAND.kicker}</b>`);
