import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../../shared/objects/product';
import {AsyncPipe, DatePipe, DecimalPipe} from '@angular/common';
import {SearchPipe} from '../../shared/pipes/search.pipe';
import {FormsModule} from '@angular/forms';
import {SearchService} from '../../shared/services/search.service';

@Component({
  selector: 'app-product-summary',
  standalone: true,
  imports: [AsyncPipe, SearchPipe, FormsModule, DecimalPipe, DatePipe],
  templateUrl: './product-summary.component.html',
  styleUrl: './product-summary.component.scss',
})
export class ProductSummaryComponent implements OnInit, OnDestroy {
  searchService = inject(SearchService);

  products$ = new Observable<Product[] | null>();
  searchText: string = '';
  setDate!: {
    start: string;
    end: string;
  };
  ngOnInit(): void {
    const date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    this.setDate = {
      start: new Date(y, m, 1).toLocaleDateString('en-CA'),
      end: new Date(y, m + 1, 0).toLocaleDateString('en-CA'),
    };
    this.searchService.getProducts.subscribe(products => {console.log(products);});
    this.products$ = this.searchService.getProducts;

    //should be last
    this.filterByDate();
  }

  filterByDate() {
    const startDate = new Date(Date.parse(this.setDate.start));
    const endDate = new Date(Date.parse(this.setDate.end));
    startDate.setHours(0);
    endDate.setHours(0);
    this.searchService.filterProductsByDate(startDate, endDate);
  }

  formatDateToLocale(date: string) {
    const dateArr = date.split('-');
    if (dateArr[2]) {
      return dateArr[2] + '/' + dateArr[1] + '/' + dateArr[0];
    } else return date;
  }

  ngOnDestroy(): void {
    this.searchService.clearFilter();
  }
}
