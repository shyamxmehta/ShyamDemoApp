import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.type';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private currentUser: User | null = null;

  getCurrentUser = new BehaviorSubject<User | null>(this.currentUser);
  constructor() {}

  setCurrentUser(user: User | null) {
    this.getCurrentUser.next(user);
  }
}
