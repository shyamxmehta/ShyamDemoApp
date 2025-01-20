import { CanActivateFn, Router } from '@angular/router';
import { MenuItem } from '../shared/objects/sidebar-menu';
import { inject } from '@angular/core';
import { UsersService } from '../shared/services/users.service';
import { allPermissions, IUser, Right } from '../shared/objects/user';
import Swal from 'sweetalert2';
import { take } from 'rxjs';

export const routeGuard: CanActivateFn = (route, state) => {
  const usersService = inject(UsersService);
  const router = inject(Router);
  let allowNavigation: boolean = false;
  usersService.currentUser$.pipe(take(1)).subscribe({
    next: (user) => {
      if (user) {
        const path = pathCheck(state.url);
        const right = checkRights(user, path);
        if (right && right.value) allowNavigation = true;
        console.log(right);
      } else {
        router.navigate(['']);
      }
    },
  });
  if (allowNavigation) {
    return true;
  }

  if (!allowNavigation) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'You do not have rights!',
      confirmButtonColor: '#2d56b2',
    });
    return false;
  }
  return true;
};

function pathCheck(url: string) {
  const pathArr = url.split('/');
  return pathArr[pathArr.length - 1];
}

function checkRights(user: IUser, path: string): Right | null {
  let right: Right | null = null;
  const modules = user.rights.map((m) => m.moduleRights);
  modules.forEach((m) =>
    m.forEach((r) => {
      if (r.right === path) {
        right = r;
      }
    })
  );
  return right;
}
