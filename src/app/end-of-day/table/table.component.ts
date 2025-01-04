import { Component, inject, OnInit } from '@angular/core';
import { ItemsService } from '../../shared/items.service';
import { Product } from '../../shared/product.interface';
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { SearchService } from '../../shared/search.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  searchService = inject(SearchService);
  allProducts: Product[] = [];
  paginatedData$ = new Observable<Product[]>();

  page = 1;
  pageSize = 5;
  totalItems!: number;
  totalPages!: number;

  constructor() {
    this.searchService.getProducts.subscribe(products => {
      this.allProducts = products;
      this.totalItems = this.allProducts.length;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      this.loadPage();
    })
  }

  loadPage() {
    // debugger
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const paginatedData = this.allProducts.slice(startIndex, endIndex);
    this.paginatedData$ = of(paginatedData);
  }

  nextPage() {
    // debugger
    if((this.page * this.pageSize) < this.totalItems) {
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


}
