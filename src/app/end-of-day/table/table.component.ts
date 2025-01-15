import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../shared/interfaces/product.type';
import { Observable, of } from 'rxjs';
import { AsyncPipe, DatePipe, DecimalPipe } from '@angular/common';
import { SearchService } from '../../shared/services/search.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [AsyncPipe, DecimalPipe, DatePipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  searchService = inject(SearchService);
  products: Product[] | undefined;
  filteredData$ = new Observable<Product[] | null>();

  page = 1;
  pageSize = 5;
  totalItems!: number;
  totalPages!: number;

  constructor() {
    this.filteredData$ = this.searchService.getProducts;
    this.searchService.getProducts.subscribe({
      next: (products: Product[] | null) => {
        if (products) {
          this.products = products;
          this.totalItems = products.length;
          const pages = Math.ceil(this.totalItems / this.pageSize);
          pages == 0 ? (this.totalPages = 1) : (this.totalPages = pages);
          this.loadPage();
        } else {
          this.products = [];
        }
      },
    });
  }

  loadPage() {
    // debugger
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    let paginatedData: Product[] = [];
    if (this.products) {
      paginatedData = this.products.slice(startIndex, endIndex);
    }
    this.filteredData$ = of(paginatedData);
  }

  nextPage() {
    // debugger
    if (this.page * this.pageSize < this.totalItems) {
      this.page++;
      this.loadPage();
    }
  }

  previousPage() {
    // debugger
    if (this.page > 1) {
      this.page--;
      this.loadPage();
    }
  }
  // not used
  // goToPage(pageNumber: number) {
  //   if (pageNumber >= 1 && pageNumber <= Math.ceil(this.totalItems / this.pageSize)) {
  //     this.page = pageNumber;
  //     this.loadPage();
  //   }
  // }
}
