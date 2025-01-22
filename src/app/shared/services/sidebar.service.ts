import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { endOfDay, inventory, MenuItem } from '../objects/sidebar-menu';
import {IUser, Right} from '../objects/user';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private inventory: MenuItem = inventory;
  private endOfDay: MenuItem = endOfDay;
  private modules: MenuItem[] = [this.inventory, this.endOfDay];
  modulesObs = new BehaviorSubject<MenuItem[]>([]);
  manualCollapseSidebar = new BehaviorSubject<boolean>(true);

  constructor() {}
  getModulesById(user: IUser) {
    const moduleList: string[] = [];
    for (const rightsKey in user.rights) {
      const moduleRights: Right[] = user.rights[rightsKey].moduleRights;
      for (const rights in moduleRights) {
        if (
          moduleRights[rights].value &&
          !moduleList.includes(user.rights[rightsKey].moduleId)
        ) {
          moduleList.push(user.rights[rightsKey].moduleId);
        }
      }
    }

    this.constructMenu(moduleList);
  }

  constructMenu(moduleList: string[]) {
    const modulesObj: MenuItem[] = [];
    for (const key in this.modules) {
      if (moduleList.includes(this.modules[key].id)) {
        modulesObj.push(this.modules[key]);
      }
    }
    this.modulesObs.next(modulesObj);
  }
}
