import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserRightsService } from '../shared/services/user-rights.service';
import { IUser, UserRights } from '../shared/objects/user';
import { Observable, Subscription, take } from 'rxjs';
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

  userRights: UserRights = {
    addProduct: false,
    endOfDate: false,
    productList: false,
  };

  ngOnInit(): void {
    this.userServiceSubscription = this.userService.currentUser$.subscribe({
      next: (user: IUser) => {
        this.userRights = user.rights;
      },
    });
  }
  updateUserRights() {
    this.userService.updateCurrentUser(this.userRights);
  }
  ngOnDestroy(): void {
    this.userServiceSubscription.unsubscribe();
  }
}
