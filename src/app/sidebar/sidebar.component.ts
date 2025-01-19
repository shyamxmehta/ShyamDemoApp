import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { MenuItem } from '../shared/objects/sidebar-menu';
import { SidebarService } from '../shared/services/sidebar.service';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit, OnDestroy {
  sidebarService = inject(SidebarService);
  usersService = inject(UsersService);
  sbServSubscription = new Subscription();
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
        if (user) this.menuItems = this.sidebarService.generateMenu(user);
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
