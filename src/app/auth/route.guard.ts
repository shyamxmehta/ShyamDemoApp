import { CanActivateFn, Router } from '@angular/router';
import { MenuItem } from '../shared/objects/sidebar-menu';
import { inject } from '@angular/core';
import { UsersService } from '../shared/services/users.service';
import { IUser } from '../shared/objects/user';
import Swal from 'sweetalert2';

export const routeGuard: CanActivateFn = (route, state) => {
  const usersService = inject(UsersService);
  const router = inject(Router);
  const path = pathCheck(state.url);

  const availableModules = getMenuById(usersService.currentUser$.getValue()!);

  if (availableModules.length < 1) {
    router.navigate(['']);
    return false;
  }

  if (availableModules.includes(path)) return true;
  else
    Swal.fire({
      title: 'Insufficient Rights!',
      text: 'Go to profile and give yourself some rights :)',
    });
  return false;
};

function pathCheck(url: string) {
  const pathArr = url.split('/');
  return pathArr[pathArr.length - 1];
}
function getMenuById(user: IUser) {
  const menu: string[] = [];
  for (const mkey in user.rights) {
    const moduleRights = user.rights[mkey].moduleRights;
    for (const key in moduleRights) {
      if (moduleRights[key].value && !menu.includes(user.rights[mkey].module)) {
        menu.push(user.rights[mkey].module);
      }
    }
  }
  return menu;
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
