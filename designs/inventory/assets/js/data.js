/**
 * data.js — the single source of truth for the inventory screen.
 * Demo stock, no backend.
 */

export const NAV = [
  { id: 'activity', icon: 'clock' },
  { id: 'inventory', icon: 'box', active: true },
  { id: 'orders', icon: 'orders' },
  { id: 'favourites', icon: 'star' },
  { id: 'shipping', icon: 'truck' },
  { id: 'settings', icon: 'settings' },
];

export const TEAM = [
  { initials: 'AL', color: '#8fc7f5' },
  { initials: 'MR', color: '#f3a6bd' },
  { initials: 'JK', color: '#b492ff' },
];

export const PANEL = {
  title: 'Search for items',
  sub: 'Type id number or name of items',
  placeholder: 'search for items',
  period: 'Monthly',
  purchased: { value: '2209', unit: 'pairs', label: 'Purchased' },
  available: { value: '1076', unit: 'pairs', label: 'Available' },
  metrics: [
    {
      id: 'salesprice',
      label: 'Salesprice',
      value: '$12.09',
      delta: '3.8%',
      series: [22, 40, 26, 52, 30, 44, 28, 34, 30, 62, 42, 70, 48, 96, 40, 58],
      marker: 10,
    },
    {
      id: 'sales',
      label: 'Sales',
      value: '2209',
      delta: '11.6%',
      series: [30, 58, 74, 56, 40, 30, 24, 34, 44, 30, 22, 36, 60, 74, 66, 52],
      marker: 6,
    },
  ],
  promo: 'Upgrade your plan to premium and enjoy our amazing features!',
  promoCta: 'Upgrade',
};

export const FILTERS = [
  { label: 'Category', value: 'Sneakers' },
  { label: 'Brand', value: 'Nike' },
  { label: 'Sort by', value: 'Best Seller' },
];

export const COLUMNS = ['#', 'ID Number', 'Name', 'Size', 'Price', 'Stock'];

export const ITEMS = [
  {
    id: 'A98JK9H', name: 'Air Jordan 1 Retro OG "Chicago"', size: '38 - 49',
    price: '$1289', stock: '76 pairs', cost: '12%', year: '2019',
    brand: 'Nike', madeIn: 'USA', tags: ['sneakers', 'retro', 'street wear'],
  },
  {
    id: 'C12KI8G', name: 'Air Jordan 1 Bred Toe', size: '38 - 49',
    price: '$999', stock: '93 pairs', cost: '9%', year: '2018',
    brand: 'Nike', madeIn: 'Vietnam', tags: ['sneakers', 'classic'],
  },
  {
    id: 'A46HI2O', name: 'Air Jordan Jumpman', size: '38 - 49',
    price: '$1479', stock: '113 pairs', cost: '14%', year: '2021',
    brand: 'Nike', madeIn: 'USA', tags: ['sneakers', 'swag'],
  },
  {
    id: 'A91LI6H', name: 'Air Jordan 13 He Got Game!', size: '38 - 49',
    price: '$699', stock: '57 pairs', cost: '10%', year: '2020',
    brand: 'Nike', madeIn: 'USA', tags: ['sneakers', 'swag', 'street wear'],
    open: true, checked: true,
  },
  {
    id: 'AO9GY3B', name: 'Air Jordan 1 Retro OG Special Edition', size: '38 - 49',
    price: '$1999', stock: '9 pairs', cost: '18%', year: '2022',
    brand: 'Nike', madeIn: 'Italy', tags: ['sneakers', 'limited'],
  },
  {
    id: 'C9OUJIL', name: 'Air Jordan 3 Red Cement', size: '38 - 49',
    price: '$1669', stock: '48 pairs', cost: '11%', year: '2020',
    brand: 'Nike', madeIn: 'USA', tags: ['sneakers', 'retro'],
  },
  {
    id: 'COOIL2S', name: 'Air Jordan 1 Satin Shattered Backboard', size: '38 - 49',
    price: '$769', stock: '42 pairs', cost: '8%', year: '2019',
    brand: 'Nike', madeIn: 'Vietnam', tags: ['sneakers', 'satin'],
  },
  {
    id: 'A67LGOQ', name: 'Air Jordan 1 Rookie of The Year', size: '38 - 49',
    price: '$1099', stock: '51 pairs', cost: '13%', year: '2018',
    brand: 'Nike', madeIn: 'USA', tags: ['sneakers', 'street wear'],
  },
];

/** Labels for the expanded detail panel, in the reference's order. */
export const DETAIL_FIELDS = [
  ['Name', 'name'], ['Price', 'price'], ['Size', 'size'],
  ['ID Number', 'id'], ['Production Year', 'year'], ['Cost', 'cost'],
  ['Brand', 'brand'], ['Made In', 'madeIn'], ['Stock', 'stock'],
];
