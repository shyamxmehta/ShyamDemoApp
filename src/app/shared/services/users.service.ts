import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { allPermissions, demoUser, IUser, Right } from '../objects/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private currentUser: IUser = demoUser;
  // private moduleRights: Right[] = [];
  currentUser$ = new BehaviorSubject<IUser | null>(null);
  // currentUserRights$ = new BehaviorSubject<allPermissions>(
  //   this.currentUser.rights
  // );
  constructor() {}

  setCurrentUser() {
    this.currentUser$.next(this.currentUser);
    // this.currentUserRights$.next(this.currentUser.rights);
  }

  // getUserRights() {
  //   this.currentUser.rights.forEach((right) => {
  //     this.moduleRights.push(...right.moduleRights);
  //   });
  //   return of(this.moduleRights);
  // }

  updateRights() {
    this.currentUser$.next(this.currentUser);
  }
}
