/**
 * coin-logos.js — coin marks drawn as inline SVG.
 *
 * These are original paths built from each network's well-known geometry
 * (Ethereum's split diamond, BNB's four rhombi, Polygon's hexagon, Avalanche's
 * peak, Solana's three bars) — no third-party brand asset is downloaded or
 * bundled. They render in `currentColor` inside a `.coin-mark` chip.
 */

const MARKS = {
  ETH:
    '<path d="M12 2.4 5.8 12.1 12 15.6l6.2-3.5L12 2.4Z" opacity=".95"/>' +
    '<path d="M12 16.9 5.8 13.4 12 21.8l6.2-8.4L12 16.9Z" opacity=".7"/>',
  BNB:
    '<path d="M12 2.6 15 5.6 12 8.6 9 5.6 12 2.6Z"/>' +
    '<path d="M5.6 9 8.6 12 5.6 15 2.6 12 5.6 9Z"/>' +
    '<path d="M18.4 9 21.4 12 18.4 15 15.4 12 18.4 9Z"/>' +
    '<path d="M12 15.4 15 18.4 12 21.4 9 18.4 12 15.4Z"/>' +
    '<path d="M12 9.1 14.9 12 12 14.9 9.1 12 12 9.1Z"/>',
  POL:
    '<path d="M15.8 8.6a1 1 0 0 0-1 0l-2.3 1.3-1.6.9-2.3 1.3a1 1 0 0 1-1 0l-1.8-1a1 1 0 0 1-.5-.87V8.2a1 1 0 0 1 .5-.87l1.8-1a1 1 0 0 1 1 0l1.8 1.05a1 1 0 0 1 .5.87v1.3l1.6-.93V7.3a1 1 0 0 0-.5-.87l-3.3-1.93a1 1 0 0 0-1 0L4.3 6.43a1 1 0 0 0-.5.87v3.9a1 1 0 0 0 .5.87l3.4 1.93a1 1 0 0 0 1 0l2.3-1.3 1.6-.93 2.3-1.3a1 1 0 0 1 1 0l1.8 1.03a1 1 0 0 1 .5.87v2.07a1 1 0 0 1-.5.87l-1.8 1.06a1 1 0 0 1-1 0l-1.8-1.03a1 1 0 0 1-.5-.87v-1.3l-1.6.93v1.3a1 1 0 0 0 .5.87l3.4 1.93a1 1 0 0 0 1 0l3.4-1.93a1 1 0 0 0 .5-.87v-3.9a1 1 0 0 0-.5-.87l-3.5-1.96Z"/>',
  AVAX:
    '<path d="M13.3 5 21 19.5h-4.7l-3-5.7-3 5.7H5.6L13.3 5Z"/>' +
    '<path d="M8.7 12.6 11.4 17.6H6L8.7 12.6Z"/>',
  SOL:
    '<path d="M7 6.2h12l-2.6 2.9H4.4L7 6.2Z"/>' +
    '<path d="M4.4 10.6h12L19 13.5H7l-2.6-2.9Z"/>' +
    '<path d="M7 15h12l-2.6 2.9H4.4L7 15Z"/>',
};

/**
 * Markup for one coin mark.
 * @param {string} symbol ETH | BNB | POL | AVAX | SOL
 * @param {number} [size] pixel size
 * @returns {string} svg markup, or the symbol's initials when unknown
 */
export function coinLogo(symbol, size = 19) {
  const body = MARKS[symbol];
  if (!body) return symbol.slice(0, 2);
  return (
    `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="currentColor" ` +
    `aria-hidden="true" focusable="false">${body}</svg>`
  );
}
