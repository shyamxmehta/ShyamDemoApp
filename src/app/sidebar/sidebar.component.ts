import {
  Component,
  effect,
  HostListener,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  collapseSidebar = signal<boolean>(false);

  constructor() {}
  ngOnInit(): void {
    this.onResize(window.innerWidth);
  }
  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width: number) {
    console.log(width);
    if (width < 754) {
      this.collapseSidebar.update(() => true);
    } else this.collapseSidebar.update(() => false);
  }
}
