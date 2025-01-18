import { inject, Injectable, OnDestroy, OnInit, signal } from '@angular/core';
import { IUser } from '../objects/user';
import { BehaviorSubject, Subscription, take } from 'rxjs';
import { UsersService } from './users.service';
import { allPermissions, permission } from '../objects/user-rights';

@Injectable({
  providedIn: 'root',
})
export class UserRightsService {
  usersService = inject(UsersService);

  // private inventoryRights: { name: string; right: string; value: boolean }[] = [
  //   { name: 'Product List', right: 'view-products', value: false },
  //   { name: 'Add Product', right: 'add-product', value: false },
  // ];
  // private endOfDayRights = [
  //   { name: 'End of Day', right: 'end-of-day', value: false },
  // ];
  // private allPermissions = [this.inventoryRights, this.endOfDayRights];
  // getPermissions = signal<allPermissions>(this.allPermissions);

  // getPermissions = new BehaviorSubject<allPermissions>(this.allPermissions);
  // userRights = signal<UserRights>(
  //   []
  //   // this.usersService.currentUser$.getValue().rights
  // );

  updateRight(right: permission) {
    // if (this.userRights().includes(right)) {
    //   this.userRights.update((rights) => rights.filter((r) => r != right));
    // } else {
    //   this.userRights.update((rights) => [...rights, right]);
    // }
    // this.usersService.updateCurrentUser(this.userRights());
  }
}
