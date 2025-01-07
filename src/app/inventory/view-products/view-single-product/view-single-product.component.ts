import { Component, effect, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../product.service';
import { Product } from '../../../shared/product.interface';
import { map } from 'rxjs';

@Component({
  selector: 'app-view-single-product',
  standalone: true,
  imports: [],
  templateUrl: './view-single-product.component.html',
  styleUrl: './view-single-product.component.scss',
})
export class ViewSingleProductComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  currentProduct!: Product;


  ngOnInit(): void {
    const state = this.activatedRoute.paramMap.pipe(
      map(() => window.history.state)
    );

    state.subscribe((s) => {
      for (const key in s) {
        if (key == 'data') {
          this.currentProduct = s[key];
        }
      }
    });
    
  }
  
}
