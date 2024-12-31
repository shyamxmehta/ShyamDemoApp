import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.interface';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private apiService = inject(ApiService);
  private products: Product[] = [];
  getItemPhoto = signal<string>('');
  getProducts = new BehaviorSubject<Product[]>([]);
  constructor() { 
    this.getProductsFromApi();
  }

  getProductsFromApi() {
    this.apiService.getProductListing().subscribe((products: any) => {
      for (const key in products) {
        this.products.push(products[key]);
      }
      this.getProducts.next(this.products);
    });
  }

  addProduct(product: Product) {

  }
}
