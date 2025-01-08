import { Component, inject } from '@angular/core';
import { BreadcrumbsComponent } from "../breadcrumbs/breadcrumbs.component";
import { TableComponent } from "./table/table.component";
import { FormsModule } from '@angular/forms';
import { SearchService } from '../shared/search.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-end-of-day',
  standalone: true,
  imports: [BreadcrumbsComponent, TableComponent, FormsModule, DatePipe],
  templateUrl: './end-of-day.component.html',
  styleUrl: './end-of-day.component.scss'
})
export class EndOfDayComponent {

  searchService = inject(SearchService);
  setDate = {
    start: new Date(Date.now()).toLocaleDateString('en-CA'),
    end: new Date(Date.now()).toLocaleDateString('en-CA')
  }
  
  constructor() {
  }
  searchProduct(search: string) {
    this.searchService.searchProducts(search);
  }

  filterByDate() {

    const fromDate = this.formatDateToLocale(this.setDate.start);
    const toDate = this.formatDateToLocale(this.setDate.end);
    
    this.searchService.filterProductsByDate(fromDate, toDate);
  }

  formatDateToLocale(date: string) {
    const dateArr = date.split('-');
    if (dateArr[2]) {
      const newDate = dateArr[2] + '/' + dateArr[1] + '/' + dateArr[0]
      return newDate;
    } else return date;
  }

}
