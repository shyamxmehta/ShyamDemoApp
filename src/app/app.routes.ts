import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
    
    { path: '', component: HomeComponent, canActivate: [authGuard] },

    { path: 'login', component: LoginComponent, title: 'Login' }
];
