import { inject, Injectable, OnDestroy } from '@angular/core';
import { ItemsService } from './items.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Product } from './product.interface';

@Injectable({
  providedIn: 'root'
})
export class PaginationService implements OnDestroy{

  private itemsService = inject(ItemsService);
  private getProdSubscription!: Subscription;
  private allProducts: Product[] = []

  getPaginatedProducts = new BehaviorSubject<Product[]>(this.allProducts)
  constructor() { 
    this.getProdSubscription = this.itemsService.getProducts.subscribe(res => {
      this.allProducts = res;
      this.getPaginatedProducts.next(this.allProducts);
    })
  }

  ngOnDestroy(): void {
    this.getProdSubscription.unsubscribe();
  }
}
