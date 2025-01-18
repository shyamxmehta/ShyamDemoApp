import { Injectable, signal } from '@angular/core';
import { demoUser, IUser, Right } from '../objects/user';
import { BehaviorSubject } from 'rxjs';
import { permission } from '../objects/user-rights';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private currentUser: IUser = demoUser;

  currentUser$ = new BehaviorSubject<IUser>(this.currentUser);
  constructor() {}

  setCurrentUser() {}

  getCurrentUser() {}

  updateRights(right: Right) {
    this.currentUser$.next(this.currentUser);
  }
}
