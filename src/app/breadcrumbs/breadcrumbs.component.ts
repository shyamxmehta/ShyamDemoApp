import { Component, effect, inject, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, RouterLink } from '@angular/router';
import { Breadcrumb } from './breadcrumb.interface';
import { BreadcrumbService } from './breadcrumb.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss'
})
export class BreadcrumbsComponent {

  breadcrumbs: Breadcrumb[] = [];
  breadcrumbService = inject(BreadcrumbService); 

  constructor() {
    effect(() => {
      this.breadcrumbs = this.breadcrumbService.breadcrumbs$();
    })
  }

}
