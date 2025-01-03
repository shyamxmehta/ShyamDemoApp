import { Component, inject, Input, Output } from '@angular/core';
import { ItemsService } from '../../shared/items.service';
import { Product } from '../../shared/product.interface';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { PaginationComponent } from "../../shared/pagination/pagination.component";
import { PaginationService } from '../../shared/pagination.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [AsyncPipe, SearchPipe, PaginationComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  paginationService = inject(PaginationService);
  products$ = new Observable<Product[]>();

  @Input() searchText: string = '';
  

  constructor() {
    this.products$ = this.paginationService.getPaginatedProducts;
  }


}
