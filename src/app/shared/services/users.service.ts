import { Injectable } from '@angular/core';
import { demoUser, IUser, UserRights } from '../objects/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private currentUser: IUser = demoUser;

  currentUser$ = new BehaviorSubject<IUser>(this.currentUser);
  constructor() {}

  setCurrentUser() {
    this.currentUser = demoUser;
    this.currentUser$.next(this.currentUser);
  }

  getCurrentUser() {
    this.currentUser$.next(this.currentUser);
  }

  updateCurrentUser(userRights: UserRights) {
    // this.currentUser.rights = userRights;
    this.currentUser$.next(this.currentUser);
  }
}
