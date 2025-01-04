import { inject, Injectable, OnDestroy, OnInit } from '@angular/core';
import { ItemsService } from './items.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Product } from './product.interface';

@Injectable({
  providedIn: 'root'
})
export class PaginationService implements OnInit, OnDestroy{

  private itemsService = inject(ItemsService);
  private getProdSubscription!: Subscription;
  private currentPage = 1;
  private pageSize = 4;
  private allProducts: Product[] = [];
  paginatedData$!: Observable<Product[]>;
  getPaginatedProducts = new BehaviorSubject<Product[] | null>(null);

  constructor() { 
    this.getProdSubscription = this.itemsService.getProducts.subscribe(res => {
      this.allProducts = res;
      // this.getPaginatedProducts.next(this.allProducts);
    })
  }

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage() {
    debugger
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const paginatedData = this.allProducts.slice(startIndex, endIndex);
    console.log(paginatedData);
    this.getPaginatedProducts.next(paginatedData);
  }

  ngOnDestroy(): void {
    this.getProdSubscription.unsubscribe();
  }
}
