import {
  HostListener,
  inject,
  Injectable,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { MenuItem } from '../objects/sidebar-menu';
import { UsersService } from './users.service';
import { IUser } from '../objects/user';

@Injectable({
  providedIn: 'root',
})
export class SidebarService implements OnInit, OnDestroy {
  private usersService = inject(UsersService);
  private userServiceSubscription = new Subscription();
  private currentUser!: IUser;
  private menu: MenuItem[] = [];

  manualCollapseSidebar = new BehaviorSubject<boolean>(true);
  menuSubject = new BehaviorSubject<MenuItem[]>(this.menu);

  constructor() {}
  ngOnInit(): void {
    this.userServiceSubscription = this.usersService.currentUser$.subscribe({
      next: (user: IUser) => {
        this.currentUser = user;
        console.log(this.currentUser);
      },
    });
  }
  ngOnDestroy(): void {
    this.userServiceSubscription.unsubscribe();
  }

  generateMenu() {
    // if (
    //   this.currentUser.rights.addProduct ||
    //   this.currentUser.rights.productList
    // ) {
    //   this.menu.push({ title: 'Inventory', url: '/inventory' });
    // }
    // if (this.currentUser.rights.endOfDate) {
    //   this.menu.push({ title: 'End of Day', url: '/end-of-day' });
    // }
  }
}
