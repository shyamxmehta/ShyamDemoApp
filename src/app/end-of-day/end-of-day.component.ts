import { Component } from '@angular/core';
import { BreadcrumbsComponent } from "../breadcrumbs/breadcrumbs.component";

@Component({
  selector: 'app-end-of-day',
  standalone: true,
  imports: [BreadcrumbsComponent],
  templateUrl: './end-of-day.component.html',
  styleUrl: './end-of-day.component.scss'
})
export class EndOfDayComponent {

}
