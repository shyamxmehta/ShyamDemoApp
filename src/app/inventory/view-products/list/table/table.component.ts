import { Component, inject, Input, OnInit } from '@angular/core';
import { Product } from '../../../../shared/product.interface';
import { ApiService } from '../../../../shared/api.service';
import { ItemsService } from '../../../../shared/items.service';
import { SearchPipe } from '../../../../shared/pipes/search.pipe';
import { DecimalPipe, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../../product.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [SearchPipe, DecimalPipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  itemsService = inject(ItemsService);
  productService = inject(ProductService);
  products: Product[] = [];
  router = inject(Router);
  

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

  edit(item: Product) {
    
    const urlString = this.router.url + '/' + item.id;
    // this.router.navigateByUrl(urlString, { state: { data: data} })
    this.productService.setCurrentProduct(item);
    this.router.navigate([urlString], { state: { data: item } })
    console.log(item.id);
  }

  delete(id: string) {
    this.itemsService.deleteProduct(id);
  }

  
}
