const userRights = {
  productList: false,
  addProduct: false,
  endOfDate: false,
};
export const demoUser = {
  name: 'Shyam Mehta',
  company: '',
  phone: +254715141554,
  ID: 32967833,
  KRApin: 'A1023549135P',
  companyKRA: '',
  email: '',
  rights: userRights,
};

export type User = typeof demoUser;
export type UserRights = typeof userRights;
