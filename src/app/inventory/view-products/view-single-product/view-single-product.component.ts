import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../shared/product.interface';
import { map } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ItemsService } from '../../../shared/items.service';
import Swal from 'sweetalert2';

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
    StockVal: [1, Validators.required],
    Image: ['', Validators.required],
    id: [],
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
      error: (err) => console.log(err),
    });

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
      id: this.currentProduct.id,
    });
  }

  onUpdate() {
    if (!this.itemForm.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid',
        text: 'Kindly fill all required fields',
        confirmButtonColor: '#198754',
      });
      return;
    }
    const updatedProduct: Product = this.itemForm.value;
    Swal.fire({
      title: 'Confirm?',
      text: 'Are you sure you want to update this item?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3f93f1',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.isConfirmed) {
          this.itemsService.updateProduct(updatedProduct);
          Swal.fire({
            title: 'Updated!',
            text: 'Your item has been updated.',
            icon: 'success',
            timer: 1500,
            confirmButtonColor: '#3f93f1',
          });

          this.router.navigate(['/inventory/view-products']);
          // this.itemsService.updateProduct(updatedProduct).subscribe({
          //   next: (value) => {
          //     this.itemsService.getProductsFromApi();
          //     Swal.fire({
          //       title: 'Updated!',
          //       text: 'Your item has been updated.',
          //       icon: 'success',
          //       timer: 1500,
          //       confirmButtonColor: '#3f93f1',
          //     });

          //     this.router.navigate(['/inventory/view-products']);
          //   },
          // });
        }
      }
    });
  }
}
