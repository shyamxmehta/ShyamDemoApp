import { Component, effect, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../product.service';
import { Product } from '../../../shared/product.interface';
import { map } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-single-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './view-single-product.component.html',
  styleUrl: './view-single-product.component.scss',
})
export class ViewSingleProductComponent implements OnInit {
  fb = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  currentProduct!: Product;
  itemForm: FormGroup = this.fb.group({
    Date: [new Date(Date.now()).toLocaleDateString(), Validators.required],
    ProductCode: [410190, Validators.required],
    ProductDescription: ['', Validators.required],
    CostPrice: [Validators.required],
    SellingPrice: [Validators.required], 
    Unit: ['', Validators.required],
    Quantity: [Validators.required],
    StockVal: [1,Validators.required],
    Image: ['', Validators.required]
  });

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

    this.itemForm.patchValue({
      Date: [this.currentProduct.Date],
      ProductCode: [this.currentProduct.ProductCode],
      ProductDescription: [this.currentProduct.ProductDescription],
      CostPrice: [this.currentProduct.CostPrice],
      SellingPrice: [this.currentProduct.SellingPrice],
      Unit: [this.currentProduct.Unit],
      Quantity: [this.currentProduct.Quantity],
      StockVal: [this.currentProduct.StockVal],
      Image: [this.currentProduct.Image],
    });
  }

  onSubmit() {
    
  }
}
