import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  router = inject(Router);

  isLoggedIn = signal(true);

  constructor() { }
  
  logout() {
    this.isLoggedIn.update(() => false);
    this.router.navigate(['/login']);
  }

  login() {
    this.isLoggedIn.update(() => true);
    this.router.navigate(['']);
  }
}
