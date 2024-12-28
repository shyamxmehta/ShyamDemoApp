import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { InventoryComponent } from './inventory/inventory.component';
import { EndOfDayComponent } from './end-of-day/end-of-day.component';
import { ProfileComponent } from './profile/profile.component';
import { SystemComponent } from './system/system.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewProductsComponent } from './inventory/view-products/view-products.component';
import { AddProductComponent } from './inventory/add-product/add-product.component';

export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full'},

    { path: 'home', component: SystemComponent, canActivate: [authGuard], children: [
        { path: '', component: DashboardComponent, title: 'home' },
        { path: 'profile', component: ProfileComponent, title: 'Profile' },
    ]},

    { path: 'inventory', component: SystemComponent, data: { breadcrumb: 'Inventory'}, canActivate: [authGuard], children: [
        { path: '', component: InventoryComponent, title: 'inventory' },
        { path: 'view-products', component: ViewProductsComponent, title: 'View Products', data: { breadcrumb: 'View Product' }},
        { path: 'add-product', component: AddProductComponent, title: 'Add Product', data: { breadcrumb: 'Add Product' }}
    ]},

    { path: 'end-of-day', component: SystemComponent, canActivate: [authGuard], children: [
        { path: '', component: EndOfDayComponent, title: 'End of day', data: { breadcrumb: 'End of Day'} }
    ]},

    // {path: '', component: SystemComponent, canActivate: [authGuard], children: [
    //     { path: 'home', component: DashboardComponent  },

    //     { path: 'inventory', component: InventoryComponent, data: { breadcrumb: 'Inventory'} },
    //     { path: 'view-products', component: ViewProductsComponent, title: 'View Products', data: { breadcrumb: 'View Product' }},
    //     { path: 'inventory/add-product', component: AddProductComponent, title: 'Add Product', data: { breadcrumb: 'Add Product' }},
        
    //     { path: 'end-of-day', component: DashboardComponent },

    // ]},

    { path: 'login', component: LoginComponent, title: 'Login' }
    
];
