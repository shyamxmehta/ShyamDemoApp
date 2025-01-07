import { Injectable, signal } from '@angular/core';
import { Product } from '../shared/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private currentProduct: Product | null = null;
  getCurrentProduct = signal<Product | null>(null);

  constructor() { }

  setCurrentProduct(val: Product | null) {
    this.getCurrentProduct.update(() => val);
  }
}
