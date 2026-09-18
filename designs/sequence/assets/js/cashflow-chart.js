/**
 * cashflow-chart.js — the diverging bar chart.
 *
 * One scale serves both directions and the zero line is drawn once, so the bars
 * meet it exactly. (Applying the scale separately above and below is what leaves
 * the tell-tale 1px gap at zero.)
 */

const VIEW = { w: 720, h: 260 };
const PAD = { left: 44, right: 8, top: 14, bottom: 26 };

/** Gridlines, in thousands of euro. The axis is labelled at these values only. */
const GRID = [5, 0, -3];

/**
 * @param {HTMLElement} host an <svg> element to fill
 * @param {{bars: {income:number, expense:number}[], ticks: string[]}} flow
 */
export function renderCashFlow(host, flow) {
  const plotW = VIEW.w - PAD.left - PAD.right;
  const plotH = VIEW.h - PAD.top - PAD.bottom;
  const max = 5;
  const min = -3;
  const span = max - min;

  // One scale, both directions.
  const y = (v) => PAD.top + ((max - v) / span) * plotH;
  const zero = y(0);

  const slot = plotW / flow.bars.length;
  const barW = Math.min(14, slot * 0.46);
  const gap = 3; // clear space between the two bars of a day

  const gridlines = GRID.map(
    (v) =>
      `<line x1="${PAD.left}" y1="${y(v).toFixed(1)}" x2="${VIEW.w - PAD.right}" ` +
      `y2="${y(v).toFixed(1)}" stroke="var(--hairline)" stroke-width="1"/>` +
      `<text x="${PAD.left - 10}" y="${(y(v) + 4).toFixed(1)}" text-anchor="end">` +
      `€ ${v === 0 ? '0' : `${Math.abs(v)}K`}</text>`
  ).join('');

  const bars = flow.bars
    .map((d, i) => {
      const cx = PAD.left + slot * i + slot / 2;
      const x = (cx - barW / 2).toFixed(1);
      const incH = Math.max(2, zero - y(d.income) - gap);
      const expH = Math.max(2, y(-d.expense) - zero - gap);
      return (
        `<rect x="${x}" y="${(zero - gap - incH).toFixed(1)}" width="${barW.toFixed(1)}" ` +
        `height="${incH.toFixed(1)}" rx="2.5" fill="var(--teal)"/>` +
        `<rect x="${x}" y="${(zero + gap).toFixed(1)}" width="${barW.toFixed(1)}" ` +
        `height="${expH.toFixed(1)}" rx="2.5" fill="var(--green)"/>`
      );
    })
    .join('');

  // Date ticks sit under evenly spaced sample days.
  const step = flow.bars.length / flow.ticks.length;
  const ticks = flow.ticks
    .map((label, i) => {
      const cx = PAD.left + slot * (i * step) + slot / 2;
      return (
        `<line x1="${cx.toFixed(1)}" y1="${PAD.top}" x2="${cx.toFixed(1)}" ` +
        `y2="${(VIEW.h - PAD.bottom).toFixed(1)}" stroke="var(--hairline-2)" ` +
        'stroke-width="1"/>' +
        `<text x="${cx.toFixed(1)}" y="${VIEW.h - 8}" text-anchor="middle">${label}</text>`
      );
    })
    .join('');

  host.setAttribute('viewBox', `0 0 ${VIEW.w} ${VIEW.h}`);
  host.setAttribute('preserveAspectRatio', 'none');
  host.setAttribute('role', 'img');
  host.setAttribute('aria-label', 'Daily income and expense for the last 30 days');
  host.innerHTML =
    ticks +
    gridlines +
    bars +
    `<line x1="${PAD.left}" y1="${zero.toFixed(1)}" x2="${VIEW.w - PAD.right}" ` +
    `y2="${zero.toFixed(1)}" stroke="var(--ink-3)" stroke-width="1" opacity=".45"/>`;
}
