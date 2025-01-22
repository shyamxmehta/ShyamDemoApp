import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../shared/services/users.service';
import { IUser } from '../shared/objects/user';
import { take } from 'rxjs';

export const moduleGuard: CanActivateFn = (route, state) => {
  const usersService = inject(UsersService);
  const router = inject(Router);
  const path = pathCheck(state.url);
  let availableModules: string[] = [];
  usersService.currentUser$.pipe(take(1)).subscribe({
    next: (user) => {
      if (user) {
        availableModules = getMenuById(user);
      } else {
        router.navigate(['']);
      }
    },
  });

  if (availableModules.includes(path)) {
    return true;
  } else {
    router.navigate(['']);
    return false;
  }
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
      if (moduleRights[key].value && !menu.includes(user.rights[mkey].moduleId)) {
        menu.push(user.rights[mkey].moduleId);
      }
    }
  }
  return menu;
}
