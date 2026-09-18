/**
 * data.js — the single source of truth for every figure on the Sequence screens.
 * Demo data: there is no backend and no live feed.
 */

export const NAV = [
  {
    label: 'General',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', active: true },
      { id: 'payment', label: 'Payment', icon: 'payment' },
      { id: 'transaction', label: 'Transaction', icon: 'transaction' },
      { id: 'cards', label: 'Cards', icon: 'cards', expandable: true },
    ],
  },
  {
    label: 'Support',
    items: [
      { id: 'capital', label: 'Capital', icon: 'capital' },
      { id: 'vaults', label: 'Vaults', icon: 'vaults' },
      { id: 'reports', label: 'Reports', icon: 'reports' },
      { id: 'earn', label: 'Earn', icon: 'earn', badge: '€ 150' },
    ],
  },
];

export const ACCOUNT = {
  balance: '€ 320.845,20',
  delta: '15.8%',
  range: '18 Oct 2024 - 18 Nov 2024',
  preset: 'Last 30 days',
  user: { name: 'Young Alaska', email: 'alskayng@gmail.com', initials: 'YA' },
};

/**
 * Cash flow, one entry per day. `income` sits above the zero line, `expense`
 * below it, both in thousands of euro.
 */
export const CASH_FLOW = {
  ticks: ['18 Oct', '25 Oct', '2 Nov', '9 Nov'],
  bars: [
    { income: 0.9, expense: 0.5 }, { income: 2.9, expense: 1.6 },
    { income: 2.0, expense: 2.9 }, { income: 0.8, expense: 0.7 },
    { income: 1.0, expense: 1.3 }, { income: 0.9, expense: 1.5 },
    { income: 3.5, expense: 0.5 }, { income: 4.4, expense: 2.2 },
    { income: 2.3, expense: 0.4 }, { income: 0.8, expense: 1.0 },
    { income: 1.9, expense: 1.2 }, { income: 1.1, expense: 0.5 },
    { income: 0.9, expense: 1.1 }, { income: 1.4, expense: 0.6 },
    { income: 3.2, expense: 2.4 }, { income: 1.2, expense: 1.1 },
    { income: 0.9, expense: 0.5 }, { income: 0.7, expense: 0.9 },
    { income: 0.6, expense: 0.4 },
  ],
  totals: [
    { id: 'income', label: 'Income', value: '€ 12.378,20', delta: '45.0%', direction: 'up', icon: 'arrowDownLeft', tile: 'teal' },
    { id: 'expense', label: 'Expense', value: '€ 5.788,21', delta: '12.5%', direction: 'down', icon: 'arrowUpRight', tile: 'green' },
  ],
};

export const STATS = [
  {
    id: 'business', icon: 'bank', label: 'Business account', when: 'Last 30 days',
    value: '€ 8.672,20', delta: '16.0%', direction: 'up', foot: 'vs. 7.120,14 Last Period',
  },
  {
    id: 'saving', icon: 'piggy', label: 'Total Saving', when: 'Last 30 days',
    value: '€ 3.765,35', delta: '8.2%', direction: 'down', foot: 'vs. 4.116,50 Last Period',
  },
  {
    id: 'tax', icon: 'receipt', label: 'Tax Reserve', when: 'Last 30 days',
    value: '€ 14.376,16', delta: '35.2%', direction: 'up', foot: 'vs. 10.236,46 Last Period',
  },
];

export const ACTIVITY = [
  {
    who: 'Theo Lawrence', kind: 'Add', date: 'Oct 18, 2024', icon: 'plus',
    amount: '€ 500,00', secondary: '120 USD', status: 'Success',
    method: 'Credit Card', mask: '**** 3560',
  },
  {
    who: 'Amy March', kind: 'Sent', date: 'May 24, 2024', icon: 'arrowUp',
    amount: '- € 250,00', secondary: '80 USD', status: 'Pending',
    method: 'Bank Transfer', mask: '**** 2285',
  },
  {
    who: 'Nora Patel', kind: 'Request', date: 'May 12, 2024', icon: 'arrowDownLeft',
    amount: '€ 1.240,00', secondary: '310 USD', status: 'Success',
    method: 'Bank Transfer', mask: '**** 8841',
  },
];

export const CARD = {
  scheme: 'VISA',
  number: '**** **** **** 2104',
  balance: '€ 4.540,20',
};

/** The transfer flow (send.html). */
export const TRANSFER = {
  steps: ['Amount', 'Recipient', 'Review', 'Pay'],
  current: 0,
  send: { amount: '5.000', currency: 'EUR', symbol: '€' },
  receive: { amount: '5,357.96', currency: 'USD', symbol: '$' },
  arrival: 'by Wednesday',
  rows: [
    { op: '·', label: 'Wire transfer fee', value: '3.52 USD', linked: true },
    { op: '·', label: 'Total fees', value: '32,410.89 USD' },
    { op: '−', label: 'Total fees', value: '32,414.41 USD (0.32%)' },
    { rule: true },
    { op: '=', label: "Total amount we'll convert", value: '4,968.51 USD' },
    { op: '×', label: 'Exchange rate (not guaranteed)', value: '0.927800', linked: true },
  ],
  note:
    "We can only send USD directly to your recipient's bank account. We can't send " +
    'For Further Credit (FFC) payments.',
};
