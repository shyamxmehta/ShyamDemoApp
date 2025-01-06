import { Component, inject, OnInit } from '@angular/core';
import { ItemsService } from '../../shared/items.service';
import { Observable } from 'rxjs';
import { Product } from '../../shared/product.interface';
import { AsyncPipe, DatePipe, DecimalPipe } from '@angular/common';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-summary',
  standalone: true,
  imports: [AsyncPipe, SearchPipe, FormsModule, DecimalPipe, DatePipe],
  templateUrl: './product-summary.component.html',
  styleUrl: './product-summary.component.scss'
})
export class ProductSummaryComponent implements OnInit{

  itemsService = inject(ItemsService);
  products$ = new Observable<Product[]>();

  searchText: string = '';
  
  ngOnInit(): void {
    this.products$ = this.itemsService.getProducts;
    
  }
}
