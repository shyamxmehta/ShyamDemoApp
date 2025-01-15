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
import { CommonModule } from '@angular/common';
import { SidebarService } from '../shared/services/sidebar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit, OnDestroy {
  sidebarService = inject(SidebarService);
  sidebarSubscription = new Subscription();
  collapseSidebar: boolean = false;
  ngOnInit(): void {
    this.sidebarSubscription =
      this.sidebarService.manualCollapseSidebar.subscribe({
        next: (value) => (this.collapseSidebar = value),
      });
    this.onResize(window.innerWidth);
  }

  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width: number) {
    if (width <= 752) {
      this.sidebarService.manualCollapseSidebar.next(true);
    } else this.sidebarService.manualCollapseSidebar.next(false);
  }

  ngOnDestroy(): void {
    this.sidebarSubscription.unsubscribe();
  }
}
