import { inject, Injectable } from '@angular/core';
import { ItemsService } from './items.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './product.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private itemsService = inject(ItemsService);
  private allProducts: Product[] = [];
  private searchedProducts: Product[] = [];
  private dateFilteredProducts: Product[] = [];
  getProducts = new BehaviorSubject<Product[] | null>(this.allProducts);

  constructor() {
    this.getAllProducts();
  }

  private getAllProducts() {
    this.itemsService.getProducts.subscribe((products) => {
      this.allProducts = products;
      this.getProducts.next(this.allProducts);
    });
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

  filterProductsByDate(fromDate: string, toDate: string) {
    this.dateFilteredProducts = this.allProducts.filter((product: Product) => {
      return product.Date! >= fromDate && product.Date! <= toDate;
    });

    if (this.dateFilteredProducts.length != 0) {
      this.getProducts.next(this.dateFilteredProducts);
    } else this.getProducts.next(null);
  }
}
