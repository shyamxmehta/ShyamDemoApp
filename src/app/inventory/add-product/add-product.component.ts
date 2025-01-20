import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {BreadcrumbsComponent} from '../../breadcrumbs/breadcrumbs.component';
import {DragDropComponent} from './drag-drop/drag-drop.component';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {ItemsService} from '../../shared/services/products.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [BreadcrumbsComponent, DragDropComponent, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent implements OnInit, OnDestroy {
  fb = inject(FormBuilder);
  itemsService = inject(ItemsService);
  router = inject(Router);

  itemForm = this.fb.group({
    Date: [
      new Date(Date.now()).toLocaleDateString('en-CA'),
      Validators.required,
    ],
    ProductCode: [0, Validators.required],
    ProductDescription: ['', Validators.required],
    CostPrice: [Validators.required],
    SellingPrice: [Validators.required],
    Unit: ['', Validators.required],
    Quantity: [Validators.required],
    StockVal: [1, Validators.required],
    Image: ['', Validators.required],
  });

  ngOnInit(): void {}

  getProductCode() {
    // get current productList
    const productList = this.itemsService.getProducts.getValue();
    // sort in productCode desc order
    productList.sort((a, b) => {
      if (a.ProductCode! > b.ProductCode!) {
        return -1;
      } else return 1;
    });
    // pick top item
    const lastItem = productList.slice(0, 1);
    let newCode: number = 0;
    // get code and add 1
    for (const key in lastItem) {
      newCode = lastItem[key].ProductCode!;
    }
    newCode++;
    return newCode;
  }

  getProductId() {
    const productList = this.itemsService.getProducts.getValue();
    productList.sort((a,b) => {
      if (a.id! > b.id!) {
        return -1
      } else return 1
    })

    const lastItem = productList.slice(0, 1);
    let newId: number = 0;
    for (const key in lastItem) {
      newId = +lastItem[key].id!;
    }
    newId++
    return 's';
  }
  onSubmit() {
    this.itemForm.patchValue({
      Date: this.formatDateToLocale(this.itemForm.value.Date!),
      ProductCode: this.getProductCode(),
      Image: this.itemsService.getItemPhoto(),
    });

    if (!this.itemForm.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid',
        text: 'Kindly fill all required fields',
        confirmButtonColor: '#198754',
      });
      return;
    }

    Swal.fire({
      title: 'Add Item?',
      text: 'Are you sure you want to add this item?',
      showCancelButton: true,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // const itemData: Product =
        // const item: Product = this.itemForm.value;
        // this.itemsService.addProduct(item).subscribe(res => {
        //   this.itemsService.getProductsFromApi();
        //   this.router.navigate(['/inventory/view-products']);
        // });
        this.itemsService.addProduct(this.itemForm.value);

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500,
        }).then(_ => this.router.navigate(['/inventory/view-products']));


      }
    });
  }

  formatDateToLocale(date: string) {
    const dateArr = date.split('-');
    if (dateArr[2]) {
      return dateArr[0] + '/' + dateArr[1] + '/' + dateArr[2];
    } else return date;
  }

  ngOnDestroy(): void {
    this.itemsService.getItemPhoto.update(() => '');
  }
}
