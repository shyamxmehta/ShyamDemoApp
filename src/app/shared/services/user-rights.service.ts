import { inject, Injectable, OnDestroy, OnInit } from '@angular/core';
import { IUser, UserRights } from '../objects/user';
import { BehaviorSubject, Subscription, take } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class UserRightsService {
  // currentUser$: any;
  // private usersService = inject(UsersService);
  // private userRights: UserRights = {
  //   addProduct: false,
  //   endOfDate: false,
  //   productList: false,
  // };
  // userRightsSubject = new BehaviorSubject<UserRights>(this.userRights);
  // constructor() {}
  // getUserRights() {
  //   this.usersService.getCurrentUser.pipe(take(1)).subscribe((user) => {
  //     this.userRights = user.rights;
  //   });
  //   this.userRightsSubject.next(this.userRights);
  //   return this.userRights;
  // }
  // setUserRights(rights: UserRights) {
  //   this.usersService.updateCurrentUser(rights);
  // }
}
