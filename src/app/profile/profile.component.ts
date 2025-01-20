import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { from, map, Observable, of, Subscription, take, tap } from 'rxjs';
import { allPermissions, Right } from '../shared/objects/user';
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
  moduleRights$ = new Observable<Right[]>();

  constructor() {}
  ngOnInit(): void {
    // this.moduleRights$ = this.usersService.getUserRights();
    // this.moduleRights$.subscribe((r) => console.log(r));
    this.userServiceSubscription = this.usersService.currentUser$
      .pipe(
        take(1),
        tap((user) => console.log(user))
      )
      .subscribe({
        next: (user) => {
          if (user) {
            user.rights.forEach((module) => {
              for (const key in module.moduleRights) {
                this.userRights.push(module.moduleRights[key]);
                // this.userRights = [...module.moduleRights[key]];
              }
            });
            // const rights = user.rights.map((rights) => rights.moduleRights);

            // this.userRights$ = of(user.rights);
            // console.log(this.userRights);
            // console.log(user.rights);
            // this.userRights$ = from(user.rights);
          }
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
