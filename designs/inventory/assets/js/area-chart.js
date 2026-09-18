/**
 * area-chart.js — the two small area charts in the stats card.
 *
 * Geometry is generated from the series with a Catmull-Rom spline converted to
 * cubic beziers; nothing here is a hand-written path.
 */

const VIEW = { w: 240, h: 74 };
const PAD = { x: 2, top: 6, bottom: 2 };

function points(series) {
  const min = Math.min(...series);
  const max = Math.max(...series);
  const span = max - min || 1;
  const usableW = VIEW.w - PAD.x * 2;
  const usableH = VIEW.h - PAD.top - PAD.bottom;
  return series.map((v, i) => ({
    x: PAD.x + (i * usableW) / (series.length - 1),
    y: VIEW.h - PAD.bottom - ((v - min) / span) * usableH,
  }));
}

function smooth(pts) {
  let d = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`;
  for (let i = 0; i < pts.length - 1; i += 1) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    d +=
      ` C ${(p1.x + (p2.x - p0.x) / 6).toFixed(2)} ${(p1.y + (p2.y - p0.y) / 6).toFixed(2)},` +
      ` ${(p2.x - (p3.x - p1.x) / 6).toFixed(2)} ${(p2.y - (p3.y - p1.y) / 6).toFixed(2)},` +
      ` ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  return d;
}

/**
 * @param {SVGElement} host
 * @param {{id: string, series: number[], marker: number}} metric
 */
export function renderArea(host, metric) {
  const pts = points(metric.series);
  const line = smooth(pts);
  const gid = `area-${metric.id}`;
  const mark = pts[Math.min(metric.marker, pts.length - 1)];

  host.setAttribute('viewBox', `0 0 ${VIEW.w} ${VIEW.h}`);
  host.setAttribute('preserveAspectRatio', 'none');
  host.setAttribute('role', 'img');
  host.setAttribute('aria-label', `${metric.label} trend, last 16 periods`);
  host.innerHTML =
    `<defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">` +
    '<stop offset="0%" stop-color="var(--coral)" stop-opacity="0.45"/>' +
    '<stop offset="100%" stop-color="var(--coral)" stop-opacity="0"/>' +
    '</linearGradient></defs>' +
    `<path d="${line} L ${pts[pts.length - 1].x.toFixed(2)} ${VIEW.h} ` +
    `L ${pts[0].x.toFixed(2)} ${VIEW.h} Z" fill="url(#${gid})"/>` +
    `<path d="${line}" fill="none" stroke="var(--coral-line)" stroke-width="1.6" ` +
    'stroke-linecap="round" stroke-linejoin="round"/>' +
    // the vertical marker the reference draws through one sample
    `<line x1="${mark.x.toFixed(2)}" y1="0" x2="${mark.x.toFixed(2)}" y2="${VIEW.h}" ` +
    'stroke="var(--coral-wash)" stroke-width="1"/>' +
    `<circle cx="${mark.x.toFixed(2)}" cy="${mark.y.toFixed(2)}" r="3" ` +
    'fill="#fff" stroke="var(--sky)" stroke-width="1.6"/>';
}
