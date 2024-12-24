import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { InventoryComponent } from './inventory/inventory.component';
import { EndOfDayComponent } from './end-of-day/end-of-day.component';
import { ProfileComponent } from './profile/profile.component';
import { SystemComponent } from './system/system.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full'},

    { path: 'home', component: SystemComponent, canActivate: [authGuard], children: [
        { path: '', component: DashboardComponent, title: 'home' },
        { path: 'profile', component: ProfileComponent, title: 'Profile' },
    ]},

    { path: 'inventory', component: SystemComponent, canActivate: [authGuard], children: [
        { path: '', component: InventoryComponent, title: 'inventory' }
    ]},

    { path: 'end-of-day', component: SystemComponent, canActivate: [authGuard], children: [
        { path: '', component: EndOfDayComponent, title: 'End of day' }
    ]},
    
    { path: 'login', component: LoginComponent, title: 'Login' }

];
