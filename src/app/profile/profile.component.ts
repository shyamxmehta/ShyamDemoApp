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
  // userService = inject(UsersService);
  // userServiceSubscription = new Subscription();

  userRightsService = inject(UserRightsService);

  // userRights: UserRights = {
  //   addProduct: false,
  //   endOfDate: false,
  //   productList: false,
  // };

  ngOnInit(): void {
    // this.userServiceSubscription = this.userService.currentUser$.subscribe({
    //   next: (user: IUser) => {
    //     this.userRights = user.rights;
    //   },
    // });
  }
  updateUserRights(right: string) {
    // this.userService.updateCurrentUser(this.userRights);
    const rightArr = this.getCategoryRight(right);

    this.userRightsService.updateRight(rightArr[0], rightArr[1]);
  }

  getCategoryRight(fullRight: string) {
    const rightArr = fullRight.split('/');
    return rightArr;
  }
  ngOnDestroy(): void {
    // this.userServiceSubscription.unsubscribe();
  }
}
