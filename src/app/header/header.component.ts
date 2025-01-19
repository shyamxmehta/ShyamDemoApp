import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { SidebarService } from '../shared/services/sidebar.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  authService = inject(AuthService);
  sidebarService = inject(SidebarService);
  showDropdown = false;

  signOut() {
    this.authService.logout();
  }

  clickHamburger() {
    this.sidebarService.manualCollapseSidebar.next(
      !this.sidebarService.manualCollapseSidebar.getValue()
    );
  }
}
