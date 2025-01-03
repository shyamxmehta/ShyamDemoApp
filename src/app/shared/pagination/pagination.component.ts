import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Product } from '../product.interface';
import { ItemsService } from '../items.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit, OnDestroy{


  @Input() totalItems!: number;
  @Input() currentPage: number = 1;
  @Input() itemsPerPage!: number;

  totalPages = 0;
  pages: number[] = [];

  constructor() {
  }

  ngOnInit(): void {

    //calculate number of pages
    if(this.totalItems > 0) {
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1)
      console.log(this.pages);
    }
  }

  ngOnDestroy(): void {
    
  }
}
