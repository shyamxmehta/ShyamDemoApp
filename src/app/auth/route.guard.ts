import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UsersService } from '../shared/services/users.service';
import Swal from 'sweetalert2';

export const routeGuard: CanActivateFn = (route, state) => {
  return true;
  const usersService = inject(UsersService);

  const rights = usersService.currentUser$.getValue().rights;
  const path = pathCheck(state.url);
  // if (rights.includes(path)) {
  // } else
  //   Swal.fire({
  //     icon: 'error',
  //     title: 'Oops...',
  //     text: 'You do not have rights!',
  //     confirmButtonColor: '#2d56b2',
  //   });

  return false;
  // if (path === 'inventory' && (rights.productList || rights.addProduct)) {
  //   return true;
  // } else if (path === 'add-product' && rights.addProduct) {
  //   return true;
  // } else if (path === 'view-products' && rights.productList) {
  //   return true;
  // } else if (path === 'end-of-day' && rights.endOfDate) {
  //   return true;
  // } else
  //
};

function pathCheck(url: string) {
  const pathArr = url.split('/');
  return pathArr[pathArr.length - 1];
}
