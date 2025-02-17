import {inject, Injectable, signal} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Product} from '../objects/product';
import {Products} from '../products';
import {ApiService} from './api.service';

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
    this.getProducts.next(this.products);
    console.log(this.products);
    // this.getProductsFromApi();
  }

  getAllProducts() {
    this.getProducts.next(this.products);
  }

  addProduct(product: Product) {
    this.products.push(product);
    console.log(product);
    this.getProducts.next(this.products);
    // this.getProducts.next(this.products);
  }

  deleteProduct(id: string) {
    const index = this.products.findIndex((m) => m.id === id);
    this.products.splice(index, 1);
    this.getProducts.next(this.products);
  }

  updateProduct(product: Product) {
    this.products = this.products.map((prod) => {
      if (prod.ProductCode == product.ProductCode) {
        return product;
      } else return prod;
    });
    this.getProducts.next(this.products);
  }

  private formatToLocaleString(date: string) {
    const dateArr = date.split('-');
    if (dateArr[2]) {
      return dateArr[2] + '/' + dateArr[1] + '/' + dateArr[0];
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
