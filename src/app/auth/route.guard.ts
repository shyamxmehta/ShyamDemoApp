import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../shared/services/users.service';
import Swal from 'sweetalert2';
import { SidebarService } from '../shared/services/sidebar.service';
import { MenuItem } from '../shared/objects/sidebar-menu';

export const routeGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const usersService = inject(UsersService);
  const sidebarService = inject(SidebarService);
  const rights = usersService.currentUser$.getValue().rights;
  const path = pathCheck(state.url);

  const modules = sidebarService.modulesObs.getValue();
  const moduleRights = checkModuleRights(modules, rights);
  console.log(moduleRights);
  if (rights.includes(path) || moduleRights) {
    return true;
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'You do not have rights!',
      confirmButtonColor: '#2d56b2',
    });
    router.navigate(['']);
    return false;
  }
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
