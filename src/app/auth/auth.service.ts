import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../shared/services/users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  router = inject(Router);
  usersService = inject(UsersService);

  isLoggedIn = signal(false);

  constructor() {}

  logout() {
    this.isLoggedIn.update(() => false);
    this.router.navigate(['/login']);
  }

  login() {
    this.isLoggedIn.update(() => true);
    this.usersService.setCurrentUser();
    this.router.navigate(['']);
  }
}
