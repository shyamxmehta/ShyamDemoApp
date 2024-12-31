import { Component, inject } from '@angular/core';
import { ItemsService } from '../../shared/items.service';
import { Product } from '../../shared/product.interface';

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
      // change value in array
      if (this.products) {
        this.products.map(val => {
          if(val.Date) {
            val.Date = new Date(val.Date).toLocaleDateString();
            // const date = new Date(Date.now()).toLocaleDateString();
            console.log(val.Date);
          }
        })
      }
    });
  }
}
