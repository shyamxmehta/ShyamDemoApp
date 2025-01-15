import { inject, Injectable, OnDestroy, OnInit } from '@angular/core';
import { UserRights } from '../interfaces/user.type';
import { BehaviorSubject, Subscription } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class UserRightsService implements OnInit, OnDestroy {
  private usersService = inject(UsersService);
  private usersServiceSubscription = new Subscription();
  private currentUserRights: UserRights | undefined = undefined;
  getCurrentUserRights = new BehaviorSubject<UserRights | undefined>(
    this.currentUserRights
  );
  constructor() {}

  ngOnInit(): void {
    this.usersServiceSubscription = this.usersService.getCurrentUser.subscribe(
      (rights) => {
        this.currentUserRights = rights;
      }
    );
  }
  ngOnDestroy(): void {
    this.usersServiceSubscription.unsubscribe();
  }
}
