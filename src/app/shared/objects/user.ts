const inventoryRights = {
  moduleId: 'inventory',
  moduleRights: [
    { name: 'Product List', right: 'view-products', value: false },
    { name: 'Add Product', right: 'add-product', value: false },
  ],
};
const endOfDayRights = {
  moduleId: 'end-of-day',
  moduleRights: [{ name: 'End of Day', right: 'end-of-day', value: false }],
};
const right = { name: 'End of Day', right: 'end-of-day', value: true };
export type Right = typeof right;

const allPermissions = [inventoryRights, endOfDayRights];

export type allPermissions = typeof allPermissions;
export const demoUser = {
  name: 'Shyam Mehta',
  company: '',
  phone: '+254715141554',
  ID: '32967833',
  KRApin: 'A1023549135P',
  companyKRA: '',
  email: '',
  rights: allPermissions,
};

export type IUser = typeof demoUser;
