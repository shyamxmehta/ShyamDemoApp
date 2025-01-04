import { Component, inject, Input, OnInit, Output } from '@angular/core';
import { ItemsService } from '../../shared/items.service';
import { Product } from '../../shared/product.interface';
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { PaginationComponent } from "../../shared/pagination/pagination.component";
import { PaginationService } from '../../shared/pagination.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit{

  itemsService = inject(ItemsService);
  allData: Product[] = [];
  paginatedData$ = new Observable<Product[]>();

  page = 1;
  pageSize = 5;
  totalItems = 10;
  totalPages!: number;

  constructor() {
    this.itemsService.getProducts.subscribe(products => {
      this.allData = products;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize)
    })
  }

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage() {
    // debugger
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const paginatedData = this.allData.slice(startIndex, endIndex);
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
