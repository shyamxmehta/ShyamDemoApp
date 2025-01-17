import { Injectable, signal } from '@angular/core';
import { demoUser, IUser, UserRights } from '../objects/user';
import { BehaviorSubject } from 'rxjs';
import { permission } from '../objects/user-rights';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private currentUser: IUser = demoUser;

  currentUser$ = new BehaviorSubject<IUser>(this.currentUser);
  // currentUser$ = signal<IUser>(this.currentUser);
  constructor() {}

  setCurrentUser() {
    // this.currentUser = demoUser;
    // this.currentUser$.next(this.currentUser);
  }

  getCurrentUser() {}

  updateRight(right: permission) {
    // const updatedUser = this.currentUser$.getValue();
    // for (const group of updatedUser.rights) {
    //   console.log(group);
    // }
    // this.currentUser.rights = userRights;
    // this.currentUser$.next(this.currentUser);
  }
}
