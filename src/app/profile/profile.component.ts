import {
  Component,
  computed,
  effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserRightsService } from '../shared/services/user-rights.service';
import { IUser, UserRights } from '../shared/objects/user';
import { Observable, retry, Subscription, take } from 'rxjs';
import { UsersService } from '../shared/services/users.service';
import { allPermissions, permission } from '../shared/objects/user-rights';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit, OnDestroy {
  usersService = inject(UsersService);
  userServiceSubscription = new Subscription();

  // userRightsService = inject(UserRightsService);

  // allPermissions$ = signal(this.userService.getCurrentUser());

  permissions!: string[];

  constructor() {}
  ngOnInit(): void {
    this.userServiceSubscription = this.usersService.currentUser$.subscribe({
      next: (user: IUser) => {
        this.permissions = user.rights;
      },
    });
  }
  updateUserRights(right: string) {
    // this.userService.updateCurrentUser(this.userRights);
    this.usersService.updateRights(right);
  }

  getCategoryRight(fullRight: string) {
    const rightArr = fullRight.split('/');
    return rightArr;
  }
  ngOnDestroy(): void {
    // this.userServiceSubscription.unsubscribe();
  }
}
