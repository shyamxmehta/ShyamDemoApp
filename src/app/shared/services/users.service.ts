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

  updateRights(right: string) {
    const usr = this.currentUser$.getValue();

    if (usr.rights.includes(right)) {
      usr.rights = usr.rights.filter((r) => r !== right);
    } else usr.rights.push(right);

    this.currentUser$.next(usr);
  }
}
