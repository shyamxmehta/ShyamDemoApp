import { Component } from '@angular/core';
import { BreadcrumbsComponent } from "../breadcrumbs/breadcrumbs.component";
import { TableComponent } from "./table/table.component";

@Component({
  selector: 'app-end-of-day',
  standalone: true,
  imports: [BreadcrumbsComponent, TableComponent],
  templateUrl: './end-of-day.component.html',
  styleUrl: './end-of-day.component.scss'
})
export class EndOfDayComponent {

}
