// const userRights = {
//   productList: false,
//   addProduct: false,
//   endOfDate: false,
// };

export const demoUser: IUser = {
  name: 'Shyam Mehta',
  company: '',
  phone: '+254715141554',
  ID: '32967833',
  KRApin: 'A1023549135P',
  companyKRA: '',
  email: '',
  rights: [{ category: 'inventory', rights: [] }],
};

export type IUser = {
  name: string;
  company: string;
  phone: string;
  ID: string;
  KRApin: string;
  companyKRA: string;
  email: string;
  rights: UserRight[];
};
// export type UserRights = typeof userRights;
export type UserRights = [UserRight];
export type UserRight = { category: string; rights: string[] };
export class CurrentUser {
  name: string;
  company: string;
  phone: string;
  ID: string;
  KRApin: string;
  companyKRA: string;
  email: string;
  rights: {
    productList: boolean;
    addProduct: boolean;
    endOfDate: boolean;
  };

  constructor(
    name: string,
    company: string,
    phone: string,
    ID: string,
    KRApin: string,
    companyKRA: string,
    email: string,
    rights: {
      productList: boolean;
      addProduct: boolean;
      endOfDate: boolean;
    }
  ) {
    (this.name = name),
      (this.company = company),
      (this.phone = phone),
      (this.ID = ID),
      (this.KRApin = KRApin),
      (this.companyKRA = companyKRA),
      (this.email = email),
      (this.rights = rights);
  }
}
