import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserRightsService } from '../shared/services/user-rights.service';
import { IUser, UserRights } from '../shared/objects/user';
import { Observable, retry, Subscription, take } from 'rxjs';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit, OnDestroy {
  userService = inject(UsersService);
  userServiceSubscription = new Subscription();

  userRightsService = inject(UserRightsService);

  rights = {
    viewProducts: false,
    addProducts: false,
    endOfDay: false,
  };

  ngOnInit(): void {
    this.userServiceSubscription = this.userService.currentUser$.subscribe({
      next: (user: IUser) => {
        console.log(user);
        // if (user.rights.includes('view-products')) {
        //   this.rights.viewProducts = true;
        // } else this.rights.viewProducts = false;
        // if (user.rights.includes('add-product')) {
        //   this.rights.addProducts = true;
        // } else this.rights.addProducts = false;
        // if (user.rights.includes('end-of-day')) {
        //   this.rights.endOfDay = true;
        // } else this.rights.endOfDay = false;
      },
    });
  }
  updateUserRights(right: string) {
    // this.userService.updateCurrentUser(this.userRights);
    const rightArr = this.getCategoryRight(right);

    this.userRightsService.updateRight(right);
  }

  getCategoryRight(fullRight: string) {
    const rightArr = fullRight.split('/');
    return rightArr;
  }
  ngOnDestroy(): void {
    // this.userServiceSubscription.unsubscribe();
  }
}
