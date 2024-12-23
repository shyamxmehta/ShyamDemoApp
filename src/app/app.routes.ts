import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { InventoryComponent } from './inventory/inventory.component';

export const routes: Routes = [
    
    { path: '', component: HomeComponent, title: 'Home', canActivate: [authGuard], children: 
        [
            { path: 'inventory', component: InventoryComponent, title: 'Inventory'}
        ]
    },

    { path: 'home', component: HomeComponent, canActivate: [authGuard] },

    { path: 'login', component: LoginComponent, title: 'Login' }


];
