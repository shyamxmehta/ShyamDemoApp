import { Injectable, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Breadcrumb } from './breadcrumb.interface';
import { map } from 'rxjs';
import { Product } from '../shared/product.interface';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  breadcrumbs: Breadcrumb[] = [];
  breadcrumbs$ = signal<Breadcrumb[]>(this.breadcrumbs);

  createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;
    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
        if (child.snapshot.data['breadcrumb'] == undefined) {
          //to get product data from routerstate (dynamic component)
          const state = child.paramMap.pipe(map(() => window.history.state));

          state.subscribe((s) => {
            for (const key in s) {
              if (key == 'data') {
                const product: Product = s[key];
                breadcrumbs.push({
                  label: product.ProductDescription!,
                  url: url,
                });
              }
            }
          });
        } else
          breadcrumbs.push({
            label: child.snapshot.data['breadcrumb'],
            url: url,
          });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }
}
