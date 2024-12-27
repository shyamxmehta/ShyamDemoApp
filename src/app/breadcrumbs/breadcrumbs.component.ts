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
export class BreadcrumbsComponent implements OnInit {

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  breadcrumbs: Breadcrumb[] = [];
  breadcrumbService = inject(BreadcrumbService); 

   currentRoute = inject(ActivatedRoute);

  constructor() {
    effect(() => {
      this.breadcrumbs = this.breadcrumbService.breadcrumbs$();
    })
    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe(() => {
    //   this.breadcrumbs = this.breadcrumbService.createBreadcrumbs(this.activatedRoute.root);
    // });
  }

  ngOnInit(): void {
    // console.log(this.currentRoute)
    // console.log(this.currentRoute.parent?.parent)
    // console.log(this.currentRoute.parent?.parent?.parent)
    // console.log(this.breadcrumbs)
  }
}
