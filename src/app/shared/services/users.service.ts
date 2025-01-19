import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { demoUser, IUser } from '../objects/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private currentUser: IUser = demoUser;

  currentUser$ = new BehaviorSubject<IUser | null>(this.currentUser);
  constructor() {}

  setCurrentUser() {
    this.currentUser$.next(this.currentUser);
  }

  getCurrentUser() {}

  updateRights() {
    this.currentUser$.next(this.currentUser);
  }
}
