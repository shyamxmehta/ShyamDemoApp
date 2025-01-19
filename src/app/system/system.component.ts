import { DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs';
import { Breadcrumb } from '../breadcrumbs/breadcrumb.interface';
import { BreadcrumbService } from '../breadcrumbs/breadcrumb.service';
import { HeaderComponent } from '../header/header.component';
import { SidebarService } from '../shared/services/sidebar.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-system',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, RouterOutlet],
  templateUrl: './system.component.html',
  styleUrl: './system.component.scss',
})
export class SystemComponent {
  breadcrumbService = inject(BreadcrumbService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  sidebarService = inject(SidebarService);

  breadcrumbs: Breadcrumb[] = [];

  private readonly startingPosition = 'starting-position';
  private readonly collapse = '10';
  private readonly expand = '0';
  private readonly suffix = 'rem';

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.breadcrumbService.createBreadcrumbs(
          this.activatedRoute.root
        );
        this.breadcrumbService.breadcrumbs$.update(() => this.breadcrumbs);
      });

    const document: Document = inject(DOCUMENT);
    this.sidebarService.manualCollapseSidebar.subscribe({
      next: (value) => {
        if (value) {
          document.documentElement.style.setProperty(
            `--${this.startingPosition}`,
            this.expand + this.suffix
          );
        } else {
          document.documentElement.style.setProperty(
            `--${this.startingPosition}`,
            this.collapse + this.suffix
          );
        }
      },
    });
  }
}
