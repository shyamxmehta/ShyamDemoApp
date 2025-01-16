import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SystemComponent } from './system/system.component';
import { routeGuard } from './auth/route.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'home',
    component: SystemComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        title: 'Home',
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./profile/profile.component').then((m) => m.ProfileComponent),
        title: 'Profile',
      },
    ],
  },

  {
    path: 'inventory',
    component: SystemComponent,
    data: { breadcrumb: 'Inventory' },
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./inventory/inventory.component').then(
            (m) => m.InventoryComponent
          ),
        title: 'inventory',
      },
      {
        path: 'view-products',
        loadComponent: () =>
          import('./inventory/view-products/view-products.component').then(
            (m) => m.ViewProductsComponent
          ),
        title: 'View Products',
        data: { breadcrumb: 'View Product List' },
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './inventory/view-products/list/product-list.component'
              ).then((m) => m.ProductListComponent),
          },
          {
            path: ':id',
            loadComponent: () =>
              import(
                './inventory/view-products/view-single-product/view-single-product.component'
              ).then((m) => m.ViewSingleProductComponent),
          },
        ],
        canActivate: [routeGuard],
      },
      {
        path: 'add-product',
        loadComponent: () =>
          import('./inventory/add-product/add-product.component').then(
            (m) => m.AddProductComponent
          ),
        title: 'Add Product',
        data: { breadcrumb: 'Add Product' },
        canActivate: [routeGuard],
      },
    ],
  },

  {
    path: 'end-of-day',
    component: SystemComponent,
    data: { breadcrumb: 'End of Day' },
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./end-of-day/end-of-day.component').then(
            (m) => m.EndOfDayComponent
          ),
        title: 'End of day',
        data: { breadcrumb: 'End of Day' },
        canActivate: [routeGuard],
      },
    ],
  },

  // {path: '', component: SystemComponent, canActivate: [authGuard], children: [
  //     { path: '', redirectTo: 'home', pathMatch: 'full' },

  //     {
  //         path: 'home',
  //         loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
  //         title: 'Home'

  //     },
  //     {
  //         path: 'home/profile',
  //         loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent),

  //     },

  //     {
  //         path: 'inventory',
  //         loadComponent: () => import('./inventory/inventory.component').then(m => m.InventoryComponent),
  //         data: { breadcrumb: 'Inventory' },
  //         title: 'Inventory',
  //         children: [
  //             {
  //                 path: 'inventory/add-product',
  //                 loadComponent: () => import('./inventory/add-product/add-product.component').then(m => m.AddProductComponent),
  //                 data: { breadcrumb: 'Add Product' },
  //                 title: 'Add Product'
  //             }
  //         ]
  //     },

  // ]},

  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: '**', redirectTo: '' },
];

// dashboard component date range should be from start of month to current date -- done
// insert component input box for number fix -- done

// table alignment of all columns to match design //done
// make rights work
// responsiveness
