import { Injectable } from '@angular/core';
import { CurrentUser, demoUser, IUser, UserRights } from '../objects/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private currentUser: IUser = demoUser;

  currentUser$ = new BehaviorSubject<IUser>(this.currentUser);
  constructor() {}

  setCurrentUser() {
    const newUser = new CurrentUser(
      demoUser.name,
      demoUser.company,
      demoUser.phone,
      demoUser.ID,
      demoUser.KRApin,
      demoUser.companyKRA,
      demoUser.email,
      demoUser.rights
    );
    this.currentUser = newUser;
    this.currentUser$.next(this.currentUser);
  }

  getCurrentUser() {
    this.currentUser$.next(this.currentUser);
  }

  updateCurrentUser(userRights: UserRights) {
    this.currentUser.rights = userRights;
    this.currentUser$.next(this.currentUser);
  }
}
