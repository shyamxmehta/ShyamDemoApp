import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription, take } from 'rxjs';
import { Right } from '../shared/objects/user';
import { UsersService } from '../shared/services/users.service';

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
          if (user)
            user.rights.forEach((module) => {
              for (const key in module.moduleRights) {
                this.userRights.push(module.moduleRights[key]);
              }
            });
        },
      });
  }

  updateUserRights() {
    this.usersService.updateRights();
  }

  // getCategoryRight(fullRight: string) {
  //   const rightArr = fullRight.split('/');
  //   return rightArr;
  // }

  // getPermission(right: string): boolean {
  //   return true;
  // }
  ngOnDestroy(): void {
    this.userServiceSubscription.unsubscribe();
  }
}
