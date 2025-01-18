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
import { IUser, Right } from '../shared/objects/user';
import { map, Observable, retry, Subscription, take } from 'rxjs';
import { UsersService } from '../shared/services/users.service';
import { allPermissions, permission } from '../shared/objects/user-rights';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit, OnDestroy {
  usersService = inject(UsersService);
  userServiceSubscription = new Subscription();

  userRights: Right[] = [];

  constructor() {}
  ngOnInit(): void {
    this.userServiceSubscription = this.usersService.currentUser$
      .pipe(take(1))
      .subscribe({
        next: (user) => {
          user.rights.forEach((module) => {
            for (const key in module.moduleRights) {
              this.userRights.push(module.moduleRights[key]);
            }
          });
          // console.log(this.rights);
        },
      });
  }

  updateUserRights(right: Right) {
    // this.userService.updateCurrentUser(this.userRights);
    this.usersService.updateRights(right);
  }

  getCategoryRight(fullRight: string) {
    const rightArr = fullRight.split('/');
    return rightArr;
  }

  getPermission(right: string): boolean {
    return true;
  }
  ngOnDestroy(): void {
    this.userServiceSubscription.unsubscribe();
  }
}
