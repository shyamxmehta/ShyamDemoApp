import { inject, Injectable, OnInit, signal } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, NavigationStart, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, filter, Observable, of } from 'rxjs';
import { Breadcrumb } from './breadcrumb.interface';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  breadcrumbs: Breadcrumb[] = [];
  breadcrumbs$ = signal<Breadcrumb[]>(this.breadcrumbs);



  createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    // debugger;
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
        breadcrumbs.push({ label: child.snapshot.data['breadcrumb'], url: url });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }
}