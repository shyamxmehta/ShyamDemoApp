import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../shared/services/users.service';
import Swal from 'sweetalert2';
import { SidebarService } from '../shared/services/sidebar.service';
import { MenuItem } from '../shared/objects/sidebar-menu';

export const routeGuard: CanActivateFn = (route, state) => {
  // usersService = inject
  return true;
};

function pathCheck(url: string) {
  const pathArr = url.split('/');
  return pathArr[pathArr.length - 1];
}

function checkModuleRights(modules: MenuItem[], rights: string[]): boolean {
  let value: boolean = false;
  while (!value) {
    modules.forEach((m) => {
      rights.forEach((r) => {
        if (m.rights.includes(r)) {
          value = true;
        }
      });
    });
  }
  return value;
}
