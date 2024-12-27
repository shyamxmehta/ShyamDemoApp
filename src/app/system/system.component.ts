import { Component, effect, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Breadcrumb } from '../breadcrumbs/breadcrumb.interface';
import { BreadcrumbService } from '../breadcrumbs/breadcrumb.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-system',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, RouterOutlet],
  templateUrl: './system.component.html',
  styleUrl: './system.component.scss'
})
export class SystemComponent {

  breadcrumbService = inject(BreadcrumbService);
  breadcrumbs: Breadcrumb[] = [];
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.breadcrumbs = this.breadcrumbService.createBreadcrumbs(this.activatedRoute.root);
      this.breadcrumbService.breadcrumbs$.update(() => this.breadcrumbs);
    });
  }
}
