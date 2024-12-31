import { Component, inject, Input, OnInit } from '@angular/core';
import { Product } from '../../../shared/product.interface';
import { ApiService } from '../../../shared/api.service';
import { ItemsService } from '../../../shared/items.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  itemsService = inject(ItemsService);
  products: Product[] = [];

  constructor() {
    this.itemsService.getProducts.subscribe( (products: any) => {
      this.products = products;
    });

  }
}
