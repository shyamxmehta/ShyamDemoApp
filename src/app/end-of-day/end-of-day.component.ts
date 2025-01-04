import { Component, inject } from '@angular/core';
import { BreadcrumbsComponent } from "../breadcrumbs/breadcrumbs.component";
import { TableComponent } from "./table/table.component";
import { FormsModule } from '@angular/forms';
import { SearchService } from '../shared/search.service';
import { from } from 'rxjs';

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

  filterByDate(fromDate: string, toDate: string) {
    if (!toDate) {
      toDate = new Date(Date.now()).toLocaleDateString();
    } else {
      toDate = this.formatDate(toDate);
    }
    
    fromDate = this.formatDate(fromDate);

    this.searchService.filterProductsByDate(fromDate, toDate);
  }

  formatDate(date: string) {
    const dateArr = date.split('-');
    const newDate = dateArr[2] + '/' + dateArr[1] + '/' + dateArr[0]
    return newDate;
  }

}
