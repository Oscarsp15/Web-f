/**
 * data.js — the dashboard's single source of truth.
 *
 * Every figure rendered by a component comes from here, so a number never
 * lives in two places. Values mirror the reference design (demo data, not a
 * live feed).
 */

/** Primary sidebar navigation. `sub` marks the collapsible Active Staking group. */
export const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', active: true },
  { id: 'assets', label: 'Assets', icon: 'layers' },
  { id: 'providers', label: 'Staking Providers', icon: 'server' },
  { id: 'calculator', label: 'Staking Calculator', icon: 'calculator' },
  { id: 'data-api', label: 'Data API', icon: 'api', external: true },
  { id: 'liquid', label: 'Liquid Staking', icon: 'droplet', tag: 'Beta' },
  { id: 'active', label: 'Active Staking', icon: 'coins', count: 6, sub: true },
];

/** Positions listed under Active Staking. `muted` fades the clipped last row. */
export const ACTIVE_ASSETS = [
  { symbol: 'ETH', name: 'Asset Ethereum', amount: '$7,699.00', color: 'var(--eth)' },
  { symbol: 'AVAX', name: 'Asset Avalanche', amount: '$1,340.00', color: 'var(--avax)' },
  { symbol: 'POL', name: 'Asset Polygon (Matic)', amount: '$540.00', color: 'var(--matic)' },
  { symbol: 'SOL', name: 'Asset Solana', amount: '$980.00', color: 'var(--sol)', muted: true },
];

/** The three recommended staking assets, with their 24h reward-rate series. */
export const ASSETS = [
  {
    id: 'eth',
    kind: 'Proof of Stake',
    name: 'Ethereum (ETH)',
    symbol: 'ETH',
    color: 'var(--eth)',
    rate: '13.62',
    delta: '6.25%',
    direction: 'up',
    tip: '+$2,956',
    series: [42, 38, 47, 34, 44, 36, 45, 39, 52, 44, 58, 66, 61, 74, 88],
    line: 'var(--series-blue)',
  },
  {
    id: 'bnb',
    kind: 'Proof of Stake',
    name: 'BNB Chain',
    symbol: 'BNB',
    color: 'var(--bnb)',
    rate: '12.72',
    delta: '5.67%',
    direction: 'up',
    tip: '+$2,009',
    series: [34, 44, 30, 41, 33, 46, 38, 43, 36, 50, 62, 57, 72, 80, 92],
    line: 'var(--series-violet)',
  },
  {
    id: 'matic',
    kind: 'Proof of Stake',
    name: 'Polygon (Matic)',
    symbol: 'POL',
    color: 'var(--matic)',
    rate: '6.29',
    delta: '1.89%',
    direction: 'down',
    tip: '-$0,987',
    series: [26, 40, 58, 72, 84, 88, 84, 76, 63, 49, 38, 30, 24, 19, 16],
    line: 'var(--series-red)',
  },
];

/** The position shown in the "Your active stakings" panel. */
export const STAKE = {
  asset: 'Stake Avalance (AVAX)',
  symbol: 'AVAX',
  color: 'var(--avax)',
  updated: 'Last Update ~ 45 minutes ago',
  balanceLead: '31.39',
  balanceTail: '686',
  months: { min: 1, max: 12, value: 4, plan: '6 Month' },
};

/**
 * Stat cards per tab. Two shapes:
 *   { type: 'value',  label, badge, value, unit?, delta?, direction? }
 *   { type: 'meters', label, badge, rows: [{ value, when, pct }] }
 */
export const TABS = [
  {
    id: 'momentum',
    label: 'Momentum',
    hint: 'Growth dynamics',
    stats: [
      { type: 'value', label: 'Staked Tokens Trend', badge: '24H', value: '-0.82', unit: '%' },
      {
        type: 'value',
        label: 'Price',
        badge: '24H',
        value: '$41.99',
        delta: '-1.09%',
        direction: 'down',
      },
      { type: 'value', label: 'Staking Ratio', badge: '24H', value: '60.6', unit: '%' },
      {
        type: 'meters',
        label: 'Reward Rate',
        rows: [
          { value: '2.23%', when: '24H Ago', pct: 78 },
          { value: '1.46%', when: '48H Ago', pct: 51 },
        ],
      },
    ],
  },
  {
    id: 'general',
    label: 'General',
    hint: 'Overview',
    stats: [
      { type: 'value', label: 'Market Cap', badge: '24H', value: '$17.1', unit: 'B' },
      { type: 'value', label: 'Circulating Supply', badge: 'ALL', value: '409', unit: 'M' },
      {
        type: 'value',
        label: 'Active Validators',
        badge: '24H',
        value: '1,842',
        delta: '+0.6%',
        direction: 'up',
      },
      {
        type: 'meters',
        label: 'Network Uptime',
        rows: [
          { value: '99.98%', when: '24H Ago', pct: 96 },
          { value: '99.92%', when: '7D Ago', pct: 88 },
        ],
      },
    ],
  },
  {
    id: 'risk',
    label: 'Risk',
    hint: 'Risk assessment',
    stats: [
      { type: 'value', label: 'Slashing Risk', badge: '30D', value: '0.04', unit: '%' },
      {
        type: 'value',
        label: 'Volatility',
        badge: '24H',
        value: '5.7',
        unit: '%',
        delta: '+1.2%',
        direction: 'up',
      },
      { type: 'value', label: 'Unbonding Period', badge: 'FIXED', value: '21', unit: 'Days' },
      {
        type: 'meters',
        label: 'Validator Concentration',
        rows: [
          { value: '32.4%', when: 'Top 10', pct: 64 },
          { value: '18.1%', when: 'Top 3', pct: 36 },
        ],
      },
    ],
  },
  {
    id: 'reward',
    label: 'Reward',
    hint: 'Expected profit',
    stats: [
      { type: 'value', label: 'Net Reward (APR)', badge: '24H', value: '8.34', unit: '%' },
      {
        type: 'value',
        label: 'Fees Paid',
        badge: '24H',
        value: '$12.40',
        delta: '-0.30%',
        direction: 'down',
      },
      { type: 'value', label: 'Validator Commission', badge: '24H', value: '6.0', unit: '%' },
      {
        type: 'meters',
        label: 'Projected Yield',
        rows: [
          { value: '34.12', when: '6 Month', pct: 82 },
          { value: '17.06', when: '3 Month', pct: 41 },
        ],
      },
    ],
  },
];
