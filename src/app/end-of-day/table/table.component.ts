import { Component, inject, Input } from '@angular/core';
import { ItemsService } from '../../shared/items.service';
import { Product } from '../../shared/product.interface';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { SearchPipe } from '../../shared/pipes/search.pipe';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [AsyncPipe, SearchPipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  itemsService = inject(ItemsService);
  products$ = new Observable<Product[]>();

  @Input() searchText: string = '';

  constructor() {
    this.products$ = this.itemsService.getProducts;
  }
}
