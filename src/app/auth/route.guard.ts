import { inject } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivateFn,
} from '@angular/router';
import { UserRightsService } from '../shared/services/user-rights.service';

export const routeGuard: CanActivateFn = (route, state) => {
  const rightsService = inject(UserRightsService);
  console.log(state);

  return true;
};
