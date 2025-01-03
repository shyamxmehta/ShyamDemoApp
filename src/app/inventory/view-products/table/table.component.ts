import { Component, inject, Input, OnInit } from '@angular/core';
import { Product } from '../../../shared/product.interface';
import { ApiService } from '../../../shared/api.service';
import { ItemsService } from '../../../shared/items.service';
import { SearchPipe } from '../../../shared/pipes/search.pipe';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [SearchPipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  itemsService = inject(ItemsService);
  products: Product[] = [];

  @Input() searchText: string = '';
  constructor() {
    this.itemsService.getProducts.subscribe( (products: any) => {
      this.products = products;
    });

  }
}
