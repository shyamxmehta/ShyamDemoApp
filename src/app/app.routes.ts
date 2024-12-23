import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { InventoryComponent } from './inventory/inventory.component';
import { EndOfDayComponent } from './end-of-day/end-of-day.component';

export const routes: Routes = [
    
    { path: '', component: HomeComponent, title: 'Home', canActivate: [authGuard], children: 
        [
            { path: 'inventory', component: InventoryComponent, title: 'Inventory'},
            { path: 'endofday', component: EndOfDayComponent, title: 'End of Day'}
        ]
    },

    { path: 'home', component: HomeComponent, canActivate: [authGuard] },

    { path: 'login', component: LoginComponent, title: 'Login' }


];
