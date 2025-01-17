const inventoryRights = {
  title: 'inventory',
  rights: [
    { name: 'Product List', right: 'view-products', value: false },
    { name: 'Add Product', right: 'add-product', value: false },
  ],
};
const endOfDayRights = {
  title: 'endofday',
  rights: [{ name: 'End of Day', right: 'end-of-day', value: false }],
};

const allPermissions = [inventoryRights, endOfDayRights];
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

// export type IUser = {
//   name: string;
//   company: string;
//   phone: string;
//   ID: string;
//   KRApin: string;
//   companyKRA: string;
//   email: string;
//   rights: UserRights;
// };
export type IUser = typeof demoUser;
export type UserRights = UserRight[];
export type UserRight = string;

// export class CurrentUser {
//   name: string;
//   company: string;
//   phone: string;
//   ID: string;
//   KRApin: string;
//   companyKRA: string;
//   email: string;
//   rights: {
//     productList: boolean;
//     addProduct: boolean;
//     endOfDate: boolean;
//   };

//   constructor(
//     name: string,
//     company: string,
//     phone: string,
//     ID: string,
//     KRApin: string,
//     companyKRA: string,
//     email: string,
//     rights: {
//       productList: boolean;
//       addProduct: boolean;
//       endOfDate: boolean;
//     }
//   ) {
//     (this.name = name),
//       (this.company = company),
//       (this.phone = phone),
//       (this.ID = ID),
//       (this.KRApin = KRApin),
//       (this.companyKRA = companyKRA),
//       (this.email = email),
//       (this.rights = rights);
//   }
// }
