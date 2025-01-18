import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../shared/services/users.service';
import { demoUser } from '../shared/objects/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  router = inject(Router);
  usersService = inject(UsersService);

  isLoggedIn = signal(true);

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
