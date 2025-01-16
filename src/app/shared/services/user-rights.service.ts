import { inject, Injectable, OnDestroy, OnInit, signal } from '@angular/core';
import { IUser, UserRight, UserRights } from '../objects/user';
import { BehaviorSubject, Subscription, take } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class UserRightsService {
  usersService = inject(UsersService);

  userRights = signal<UserRights>(
    []
    // this.usersService.currentUser$.getValue().rights
  );

  updateRight(right: string) {
    if (this.userRights().includes(right)) {
      this.userRights.update((rights) => rights.filter((r) => r != right));
    } else {
      this.userRights.update((rights) => [...rights, right]);
    }
    this.usersService.updateCurrentUser(this.userRights());
  }
}
