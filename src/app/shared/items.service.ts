import { inject, Injectable, OnInit, signal } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Product } from './product.interface';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
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
    this.products = []; // empty aray b4 api call always
    this.apiService
      .getProductListing()
      .pipe((products: any) => {
        products.forEach((p: any) => {
          console.log(p);
          for (const i in p) {
            // p[i].Date = new Date(p[i].Date).toLocaleDateString();
            this.products.push(p[i]);
            this.products.push(p[i]);
          }
        });
        console.log(this.products);
        return products;
      })
      .subscribe({
        next: (products) => {
          console.log(products);
          this.getProducts.next(this.products);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('complete ItemsService Get');
        },
      });
    // .subscribe((_products) => {

    //   this.getProducts.next(this.products);
    // });
  }

  addProduct(product: Product) {
    return this.apiService.addProduct(product);
  }

  updateProduct(product: Product) {
    return this.apiService.updateItem(product);
  }

  deleteProduct(id: string) {
    this.apiService.deleteItem(id).subscribe({
      next: (value) => {
        this.getProductsFromApi();
      },
      error(err) {
        console.log(err);
      },
      complete() {
        console.log('deleted item' + id);
      },
    });
  }
}
