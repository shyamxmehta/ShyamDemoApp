import { inject, Injectable, OnInit, signal } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { Product } from '../interfaces/product.type';
import { Products } from '../products';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private apiService = inject(ApiService);
  private products: Product[] = [];

  getItemPhoto = signal<string>('');
  getProducts = new BehaviorSubject<Product[]>(this.products);

  constructor() {
    const products = Products;
    this.products = products.map((product) => {
      product.Date = this.formatToLocaleString(product.Date!);
      return product;
    });
    console.log(this.products);
    this.getProducts.next(this.products);
    // this.getProductsFromApi();
  }

  getAllProducts() {
    this.getProducts.next(this.products);
  }

  addProduct(product: Product) {
    this.products.push(product);
    this.getProducts.next(this.products);
  }

  deleteProduct(id: string) {
    const index = this.products.findIndex((m) => m.id === id);
    this.products.splice(index, 1);
    this.getProducts.next(this.products);
  }

  updateProduct(product: Product) {
    const newProducts = this.products.map((prod) => {
      if (prod.ProductCode == product.ProductCode) {
        return product;
      } else return prod;
    });
    this.products = newProducts;
    this.getProducts.next(this.products);
  }

  private formatToLocaleString(date: string) {
    const dateArr = date.split('-');
    if (dateArr[2]) {
      const newDate = dateArr[2] + '/' + dateArr[1] + '/' + dateArr[0];
      return newDate;
    } else return date;
  }
  // getProductsFromApi() {
  //   this.products = []; // empty aray b4 api call always
  //   this.apiService
  //     .getProductListing()
  //     .pipe((products: any) => {
  //       products.forEach((p: any) => {
  //         for (const i in p) {
  //           // p[i].Date = new Date(p[i].Date).toLocaleDateString();
  //           this.products.push(p[i]);
  //           this.products.push(p[i]);
  //         }
  //       });
  //       return products;
  //     })
  //     .subscribe({
  //       next: (products) => {
  //         this.getProducts.next(this.products);
  //       },
  //       error: (err) => {
  //         console.log(err);
  //       },
  //       complete: () => {
  //         console.log('complete ItemsService Get');
  //       },
  //     });
  //   // .subscribe((_products) => {

  //   //   this.getProducts.next(this.products);
  //   // });
  // }

  // addProduct(product: Product) {
  //   return this.apiService.addProduct(product);
  // }

  // updateProduct(product: Product) {
  //   return this.apiService.updateItem(product);
  // }

  // deleteProduct(id: string) {
  //   this.apiService.deleteItem(id).subscribe({
  //     next: (value) => {
  //       this.getProductsFromApi();
  //     },
  //     error(err) {
  //       console.log(err);
  //     },
  //     complete() {
  //       console.log('deleted item' + id);
  //     },
  //   });
  // }
}
