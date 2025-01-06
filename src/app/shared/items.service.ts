import { inject, Injectable, OnInit, signal } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Product } from './product.interface';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService implements OnInit{

  private apiService = inject(ApiService);
  private products: Product[] = [];

  getItemPhoto = signal<string>('');
  getProducts = new BehaviorSubject<Product[]>([]);

  constructor() { 
    this.getProductsFromApi();
  }

  ngOnInit(): void {
    this.getProductsFromApi();
  }
  private getProductsFromApi() {
    this.products = []; // empty aray b4 api call always
    this.apiService.getProductListing()
    .pipe((products: any) => {
      // debugger
      products.forEach((p: any) => {
        for (const i in p) {
          p[i].Date = new Date(p[i].Date).toLocaleDateString();
          this.products.push(p[i]);
          this.products.push(p[i]);
        }
      });
      console.log(this.products);
      return products;
    })
    .subscribe((_products) => {
      this.getProducts.next(this.products);
    });
  }

  private addProduct(product: Product) {

  }
  
}
