import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../shared/product.interface';
import { map } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemsService } from '../../../shared/items.service';

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
  itemsService = inject(ItemsService);
  router = inject(Router);
  currentProduct!: Product;
  
  itemForm: FormGroup = this.fb.group({
    Date: ['', Validators.required],
    ProductCode: [410190, Validators.required],
    ProductDescription: ['', Validators.required],
    CostPrice: [Validators.required],
    SellingPrice: [Validators.required], 
    Unit: ['', Validators.required],
    Quantity: [Validators.required],
    StockVal: [1,Validators.required],
    Image: ['', Validators.required],
    id: []
  });

  ngOnInit(): void {
    const state = this.activatedRoute.paramMap.pipe(
      map(() => window.history.state)
    );

    state.subscribe({
      next: (value) => {
        for (const key in value) {
          if (key == 'data') {
            this.currentProduct = value[key];
          }
        }
      },
      error: (err) => console.log(err)
    });

    console.log(this.currentProduct)
    this.itemForm.patchValue({
      Date: this.currentProduct.Date,
      ProductCode: this.currentProduct.ProductCode,
      ProductDescription: this.currentProduct.ProductDescription,
      CostPrice: this.currentProduct.CostPrice,
      SellingPrice: this.currentProduct.SellingPrice,
      Unit: this.currentProduct.Unit,
      Quantity: this.currentProduct.Quantity,
      StockVal: this.currentProduct.StockVal,
      Image: this.currentProduct.Image,
      id: this.currentProduct.id
    });
  }

  onUpdate() {
    const updatedProduct: Product = this.itemForm.value

    this.itemsService.updateProduct(updatedProduct).subscribe({
      next: (value) => {
        this.itemsService.getProductsFromApi();
        this.router.navigate(['/inventory/view-products'])
      }
    })
    console.log(updatedProduct)
  }

}
