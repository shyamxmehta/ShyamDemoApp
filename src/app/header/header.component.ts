import { Component, ElementRef, HostListener, inject, Renderer2, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClickOutDirective } from './click-out.directive';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  authService = inject(AuthService);

  showDropdown = false;

  signOut() {
    this.authService.logout();
  }

}
