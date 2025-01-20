const menuItem = {
  id: '',
  icon: '',
  title: 'Dashboard',
  url: '/home',
  rights: [''],
};

export type MenuItem = typeof menuItem;

export const endOfDay: MenuItem = {
  id: 'end-of-day',
  icon: 'assets/eod-icon.svg',
  title: 'End of Day',
  url: '/end-of-day',
  rights: ['end-of-day'],
};

export const inventory = {
  id: 'inventory',
  icon: 'assets/inventory-icon.svg',
  title: 'Inventory',
  url: '/inventory',
  rights: ['add-product', 'view-products'],
};
