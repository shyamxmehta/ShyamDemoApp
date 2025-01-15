import { inject, Injectable } from '@angular/core';
import { ItemsService } from './products.service';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { Product } from '../interfaces/product.type';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private itemsService = inject(ItemsService);
  private allProducts: Product[] = [];
  private searchedProducts: Product[] = [];
  private dateFilteredProducts: Product[] = [];
  getProducts = new BehaviorSubject<Product[] | null>(null);

  constructor() {
    this.getAllProducts();
  }

  private getAllProducts() {
    this.itemsService.getProducts.subscribe((products) => {
      this.allProducts = products;
      this.getProducts.next(this.allProducts);
    });
  }

  clearFilter() {
    this.getAllProducts();
  }

  searchProducts(search: string) {
    // debugger
    if (!search) {
      this.getAllProducts();
    }

    search = search.toLowerCase();
    this.searchedProducts = this.allProducts.filter(function (item: any) {
      item =
        JSON.stringify(item.ProductCode) +
        JSON.stringify(item.ProductDescription) +
        JSON.stringify(item.CostPrice);
      return item.toLowerCase().includes(search);
    });
    this.getProducts.next(this.searchedProducts);
  }

  filterProductsByDate(filterFrom: Date, filterTo: Date) {
    this.dateFilteredProducts = this.allProducts.filter((product: Product) => {
      const prodDate = new Date(Date.parse(product.Date!));
      return product ? prodDate >= filterFrom && prodDate <= filterTo : null;
    });
    this.getProducts.next(this.dateFilteredProducts);
    // if (this.dateFilteredProducts.length != 0) {
    // } else this.getProducts.next(null);
  }
}
