import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClickOutDirective } from './click-out.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ClickOutDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
