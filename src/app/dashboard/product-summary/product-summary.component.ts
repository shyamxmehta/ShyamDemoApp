import { Component, inject, OnInit } from '@angular/core';
import { ItemsService } from '../../shared/items.service';
import { Observable } from 'rxjs';
import { Product } from '../../shared/product.interface';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-product-summary',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './product-summary.component.html',
  styleUrl: './product-summary.component.scss'
})
export class ProductSummaryComponent implements OnInit{

  itemsService = inject(ItemsService);
  products$ = new Observable<Product[]>();

  ngOnInit(): void {
    this.products$ = this.itemsService.getProducts;
    this.products$.subscribe((products: Product[]) => {
      products.map(val => {
        if(val.Date) {
          val.Date = new Date(val.Date).toLocaleDateString();
          console.log(val.Date);
        }
      })
    })
  }
}
