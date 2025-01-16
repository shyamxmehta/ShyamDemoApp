import { inject, Injectable, OnDestroy, OnInit, signal } from '@angular/core';
import { IUser, UserRight, UserRights } from '../objects/user';
import { BehaviorSubject, Subscription, take } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class UserRightsService {
  userRights = signal<UserRights>([
    {
      category: 'inventory',
      rights: ['view-products'],
    },
  ]);

  updateRight(category: string, right: string) {
    const rightObj: UserRight = { category: category, rights: [right] };
    console.log(rightObj);

    for (const key in this.userRights()) {
      console.log(this.userRights()[key]);
      if (this.userRights()[key].category === rightObj.category) {
        const r = ;
        console.log(r);
      } else {
        console.log('different');
      }
    }

    // rightsObj.push(rightObj);

    // console.log(rightsObj);

    // if (this.userRights().includes(right)) {
    //   this.userRights.update((rights) => rights.filter((r) => r != right));
    // } else {
    //   this.userRights.update((rights) => [
    //     ...rights,
    //     { category: category, right: [right] },
    //   ]);
    // }
    console.log(this.userRights());
  }
}
