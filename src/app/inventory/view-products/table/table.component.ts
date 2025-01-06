import { Component, inject, Input, OnInit } from '@angular/core';
import { Product } from '../../../shared/product.interface';
import { ApiService } from '../../../shared/api.service';
import { ItemsService } from '../../../shared/items.service';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { DecimalPipe, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [SearchPipe, DecimalPipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit{

  itemsService = inject(ItemsService);
  products: Product[] = [];

  @Input() searchText: string = '';
  constructor() {
    this.itemsService.getProducts.subscribe({
      next: (products) => this.products = products,
      error(err) {
        console.log(err);
      },
      complete() {
        console.log('complete view table');
      },
    });

  }

  ngOnInit(): void {
    
  }
  edit(item: Product) {
    // console.log(item)
  }

  delete(id: number) {
    this.itemsService.deleteProduct(id);
  }
}
