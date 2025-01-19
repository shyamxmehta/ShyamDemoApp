import {
  AfterViewInit,
  Component,
  effect,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { SidebarService } from '../shared/services/sidebar.service';
import { distinctUntilChanged, Observable, of, Subscription, tap } from 'rxjs';
import { MenuItem } from '../shared/objects/sidebar-menu';
import { UsersService } from '../shared/services/users.service';
import { IUser } from '../shared/objects/user';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit, OnDestroy {
  sidebarService = inject(SidebarService);
  sbServSubscription = new Subscription();
  usersService = inject(UsersService);
  usrServiceSubscription = new Subscription();
  collapseSidebar: boolean = false;

  menuItems: MenuItem[] = [];

  ngOnInit(): void {
    this.sbServSubscription =
      this.sidebarService.manualCollapseSidebar.subscribe({
        next: (value) => (this.collapseSidebar = value),
      });

    this.usrServiceSubscription = this.usersService.currentUser$.subscribe({
      next: (user) => {
        this.menuItems = this.sidebarService.generateMenu(user);
        console.log(this.menuItems);
      },
    });

    //should be last
    this.onResize(window.innerWidth);
  }

  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width: number) {
    if (width <= 752) {
      this.sidebarService.manualCollapseSidebar.next(true);
    } else this.sidebarService.manualCollapseSidebar.next(false);
  }

  ngOnDestroy(): void {
    this.sbServSubscription.unsubscribe();
    this.usrServiceSubscription.unsubscribe();
  }
}
