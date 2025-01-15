import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { TableComponent } from './table/table.component';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { SearchService } from '../shared/services/search.service';

@Component({
  selector: 'app-end-of-day',
  standalone: true,
  imports: [BreadcrumbsComponent, TableComponent, FormsModule, DatePipe],
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
      start: new Date(y, m, 1, 0, 0, 0, 0).toLocaleDateString('en-CA'),
      end: new Date(y, m + 1, 0, 0, 0, 0).toLocaleDateString('en-CA'),
    };
    this.filterByDate();
  }
  searchProduct(search: string) {
    this.searchService.searchProducts(search);
  }

  filterByDate() {
    const startDate = new Date(Date.parse(this.setDate.start));
    const endDate = new Date(Date.parse(this.setDate.end));
    startDate.setHours(0);
    endDate.setHours(0);
    this.searchService.filterProductsByDate(startDate, endDate);
  }

  private formatDateTimeTo00(date: Date) {
    // Wed Jan 01 2025 03:00:00 GMT+0300 (East Africa Time)
    // const initialDate = date.toLocaleDateString();
    // const formattedDate = new Date(Date.parse(date.toLocaleDateString()));
    // console.log(formattedDate);
  }

  ngOnDestroy(): void {
    this.searchService.clearFilter();
  }
}
