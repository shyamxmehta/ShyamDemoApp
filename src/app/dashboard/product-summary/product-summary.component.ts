import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ItemsService } from '../../shared/items.service';
import { Observable } from 'rxjs';
import { Product } from '../../shared/product.interface';
import { AsyncPipe, DatePipe, DecimalPipe } from '@angular/common';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../shared/search.service';

@Component({
  selector: 'app-product-summary',
  standalone: true,
  imports: [AsyncPipe, SearchPipe, FormsModule, DecimalPipe, DatePipe],
  templateUrl: './product-summary.component.html',
  styleUrl: './product-summary.component.scss'
})
export class ProductSummaryComponent implements OnInit, OnDestroy{

  itemsService = inject(ItemsService);
  searchService = inject(SearchService);
  products$ = new Observable<Product[] | null>();

  searchText: string = '';
  setDate = {
    start: new Date(Date.now()).toLocaleDateString('en-CA'),
    end: new Date(Date.now()).toLocaleDateString('en-CA')
  }
  ngOnInit(): void {
    this.products$ = this.searchService.getProducts;
    
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

  ngOnDestroy(): void {
    this.searchService.clearFilter();
  }
}
