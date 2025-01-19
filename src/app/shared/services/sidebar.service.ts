import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuItem } from '../objects/sidebar-menu';
import { IUser } from '../objects/user';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private inventory: MenuItem = {
    id: 'inventory',
    icon: 'assets/inventory-icon.svg',
    title: 'Inventory',
    url: '/inventory',
    rights: ['add-product', 'view-products'],
  };
  private endOfDay: MenuItem = {
    id: 'end-of-day',
    icon: 'assets/eod-icon.svg',
    title: 'End of Day',
    url: '/end-of-day',
    rights: ['end-of-day'],
  };
  modules: MenuItem[] = [this.inventory, this.endOfDay];
  modulesObs = new BehaviorSubject(this.modules);
  manualCollapseSidebar = new BehaviorSubject<boolean>(true);

  constructor() {}
  getMenuById(user: IUser) {
    const menu: string[] = [];
    for (const mkey in user.rights) {
      const moduleRights = user.rights[mkey].moduleRights;
      for (const key in moduleRights) {
        if (
          moduleRights[key].value &&
          !menu.includes(user.rights[mkey].module)
        ) {
          menu.push(user.rights[mkey].module);
        }
      }
    }

    return this.constructMenu(menu);
  }

  constructMenu(menu: string[]) {
    const modules: MenuItem[] = [];
    for (const key in this.modules) {
      if (menu.includes(this.modules[key].id)) {
        modules.push(this.modules[key]);
      }
    }
    return modules;
  }
}
