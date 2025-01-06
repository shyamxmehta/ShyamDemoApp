import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    //check through router snapshot if user has rights for given route
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
