import { Component, inject } from '@angular/core';
import { BreadcrumbsComponent } from "../breadcrumbs/breadcrumbs.component";
import { TableComponent } from "./table/table.component";
import { FormsModule } from '@angular/forms';
import { SearchService } from '../shared/search.service';

@Component({
  selector: 'app-end-of-day',
  standalone: true,
  imports: [BreadcrumbsComponent, TableComponent, FormsModule],
  templateUrl: './end-of-day.component.html',
  styleUrl: './end-of-day.component.scss'
})
export class EndOfDayComponent {

  searchService = inject(SearchService);
  
  searchProduct(search: string) {
    this.searchService.searchProducts(search);
  }
}
