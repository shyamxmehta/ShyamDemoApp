import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { endOfDay, inventory, MenuItem } from '../objects/sidebar-menu';
import { IUser } from '../objects/user';

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
    for (const mkey in user.rights) {
      const moduleRights = user.rights[mkey].moduleRights;
      for (const key in moduleRights) {
        if (
          moduleRights[key].value &&
          !moduleList.includes(user.rights[mkey].module)
        ) {
          moduleList.push(user.rights[mkey].module);
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
