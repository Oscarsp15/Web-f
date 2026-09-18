/**
 * sparkline.js — the reward-rate chart drawn inside each asset card.
 *
 * Paths are generated from the data (Catmull-Rom converted to cubic beziers),
 * never hand-authored, so a series can change length without touching markup.
 * One scale places the line, the area fill, the node dots and the amount pill.
 */

const VIEW = { w: 300, h: 112 };
const PAD = { x: 10, top: 16, bottom: 12 };

/**
 * Map a series to view-box coordinates.
 * @param {number[]} series
 * @returns {{x:number,y:number}[]}
 */
function toPoints(series) {
  const min = Math.min(...series);
  const max = Math.max(...series);
  const span = max - min || 1;
  const usableW = VIEW.w - PAD.x * 2;
  const usableH = VIEW.h - PAD.top - PAD.bottom;

  return series.map((value, i) => ({
    x: PAD.x + (i * usableW) / (series.length - 1),
    y: VIEW.h - PAD.bottom - ((value - min) / span) * usableH,
  }));
}

/**
 * Smooth the polyline with a Catmull-Rom spline expressed as cubic beziers.
 * @param {{x:number,y:number}[]} pts
 * @returns {string} an SVG path `d`
 */
function smoothPath(pts) {
  if (pts.length < 2) return '';
  let d = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`;

  for (let i = 0; i < pts.length - 1; i += 1) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d +=
      ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)},` +
      ` ${c2x.toFixed(2)} ${c2y.toFixed(2)},` +
      ` ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  return d;
}

/**
 * Draw one sparkline into `host` and place its amount pill on the last point.
 * @param {HTMLElement} host element carrying the `.spark` class
 * @param {{series:number[], line:string, tip?:string, id:string}} asset
 */
export function renderSparkline(host, asset) {
  const pts = toPoints(asset.series);
  const last = pts[pts.length - 1];
  const line = smoothPath(pts);
  const area = `${line} L ${last.x.toFixed(2)} ${VIEW.h} L ${pts[0].x.toFixed(2)} ${VIEW.h} Z`;
  const gradientId = `spark-fill-${asset.id}`;

  // Dots sit on every third sample so the line reads as sampled data, not decor.
  const dots = pts
    .filter((_, i) => i > 0 && i % 4 === 0 && i < pts.length - 1)
    .map(
      (p) =>
        `<circle cx="${p.x.toFixed(2)}" cy="${p.y.toFixed(2)}" r="3" ` +
        `fill="var(--card)" stroke="${asset.line}" stroke-width="1.6"/>`
    )
    .join('');

  // The dashed rule marks the period's opening level.
  const baseline = pts[0].y.toFixed(2);

  host.innerHTML =
    `<svg viewBox="0 0 ${VIEW.w} ${VIEW.h}" preserveAspectRatio="none" ` +
    'role="img" aria-label="Reward rate over the last 24 hours">' +
    `<defs><linearGradient id="${gradientId}" x1="0" y1="0" x2="0" y2="1">` +
    `<stop offset="0%" stop-color="${asset.line}" stop-opacity="0.28"/>` +
    `<stop offset="100%" stop-color="${asset.line}" stop-opacity="0"/>` +
    '</linearGradient></defs>' +
    `<path d="${area}" fill="url(#${gradientId})"/>` +
    `<path d="M ${PAD.x} ${baseline} H ${VIEW.w - PAD.x}" fill="none" ` +
    'stroke="rgba(255,255,255,0.22)" stroke-width="1" stroke-dasharray="3 4"/>' +
    `<path d="${line}" fill="none" stroke="${asset.line}" stroke-width="2.2" ` +
    'stroke-linecap="round" stroke-linejoin="round"/>' +
    dots +
    `<circle cx="${last.x.toFixed(2)}" cy="${last.y.toFixed(2)}" r="7" ` +
    `fill="${asset.line}" fill-opacity="0.18"/>` +
    `<circle cx="${last.x.toFixed(2)}" cy="${last.y.toFixed(2)}" r="3.4" ` +
    `fill="${asset.line}" stroke="#fff" stroke-width="1.4"/>` +
    '</svg>';

  if (!asset.tip) return;

  const tip = document.createElement('span');
  tip.className = 'spark__tip';
  tip.textContent = asset.tip;
  // Clamped so the pill never hangs off the card edge.
  const leftPct = Math.min(82, Math.max(18, (last.x / VIEW.w) * 100));
  const topPct = Math.min(80, Math.max(16, ((last.y - 26) / VIEW.h) * 100));
  tip.style.left = `${leftPct}%`;
  tip.style.top = `${topPct}%`;
  host.append(tip);
}
