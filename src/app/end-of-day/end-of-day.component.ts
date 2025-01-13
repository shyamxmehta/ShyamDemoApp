import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { TableComponent } from './table/table.component';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../shared/search.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-end-of-day',
  standalone: true,
  imports: [BreadcrumbsComponent, TableComponent, FormsModule],
  templateUrl: './end-of-day.component.html',
  styleUrl: './end-of-day.component.scss',
})
export class EndOfDayComponent implements OnInit, OnDestroy {
  searchService = inject(SearchService);
  setDate!: {
    start: string;
    end: string;
  };

  constructor() {}
  ngOnInit(): void {
    const date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    this.setDate = {
      start: new Date(y, m, 1).toLocaleDateString('en-CA'),
      end: new Date(y, m + 1, 0).toLocaleDateString('en-CA'),
    };
    this.filterByDate();
  }
  searchProduct(search: string) {
    this.searchService.searchProducts(search);
  }

  filterByDate() {
    const startDate = new Date(Date.parse(this.setDate.start));
    const endDate = new Date(Date.parse(this.setDate.end));
    // const fromDate = this.formatDateToString(this.setDate.start);
    // const toDate = this.formatDateToString(this.setDate.end);
    this.searchService.filterProductsByDate(startDate, endDate);
  }

  formatDateToString(date: string) {
    const dateArr = date.split('-');
    if (dateArr[2]) {
      const newDate = dateArr[2] + '/' + dateArr[1] + '/' + dateArr[0];
      return newDate;
    } else return date;
  }

  ngOnDestroy(): void {
    this.searchService.clearFilter();
  }
}
