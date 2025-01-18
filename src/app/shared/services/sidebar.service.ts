import {
  HostListener,
  inject,
  Injectable,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription, take } from 'rxjs';
import { MenuItem } from '../objects/sidebar-menu';
import { IUser } from '../objects/user';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private inventory: MenuItem = {
    icon: 'assets/inventory-icon.svg',
    title: 'Inventory',
    url: '/inventory',
    rights: ['add-product', 'view-products'],
  };
  private endOfDay: MenuItem = {
    icon: 'assets/eod-icon.svg',
    title: 'End of Day',
    url: '/end-of-day',
    rights: ['end-of-day'],
  };
  modules: MenuItem[] = [this.inventory, this.endOfDay];
  modulesObs = new BehaviorSubject(this.modules);
  manualCollapseSidebar = new BehaviorSubject<boolean>(true);

  constructor() {}
  generateMenu(user: IUser): MenuItem[] {
    let menu: MenuItem[] = [];
    for (const module of this.modules) {
      for (const right of user.rights) {
        if (module.rights.includes(right) && !menu.includes(module)) {
          menu.push(module);
        }
      }
    }

    return menu;
    // if (
    //   this.currentUser.rights.addProduct ||
    //   this.currentUser.rights.productList
    // ) {
    //   this.menu.push({ title: 'Inventory', url: '/inventory' });
    // }
    // if (this.currentUser.rights.endOfDate) {
    //   this.menu.push({ title: 'End of Day', url: '/end-of-day' });
    // }
  }
}
