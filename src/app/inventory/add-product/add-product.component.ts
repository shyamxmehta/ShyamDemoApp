import { Component, effect, inject, OnInit } from '@angular/core';
import { BreadcrumbsComponent } from "../../breadcrumbs/breadcrumbs.component";
import { DragDropComponent } from "./drag-drop/drag-drop.component";
import { FormBuilder, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { Product, ProductClass } from '../../shared/product.interface';
import { ItemsService } from '../../shared/items.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ BreadcrumbsComponent, DragDropComponent, ReactiveFormsModule ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit{

  fb = inject(FormBuilder);
  apiService = inject(ApiService);
  itemsService = inject(ItemsService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  itemForm = this.fb.group({
    Date: [new Date(Date.now()).toLocaleDateString(), Validators.required],
    ProductCode: [0, Validators.required],
    ProductDescription: ['', Validators.required],
    CostPrice: [Validators.required],
    SellingPrice: [Validators.required], 
    Unit: ['', Validators.required],
    Quantity: [Validators.required],
    StockVal: [1,Validators.required],
    Image: ['', Validators.required]
  });


  ngOnInit(): void {
  }

  getProductCode() {
    // get current productList
    const productList = this.itemsService.getProducts.getValue();
    // sort in productCode desc order
    productList.sort((a, b) => {
      if (a.ProductCode! > b.ProductCode!) {
        return -1
      } else return 1
    })
    // pick top item
    const lastItem = productList.slice(0,1);
    let newCode: number = 0;
    // get code and add 1
    for (const key in lastItem) {
      newCode = lastItem[key].ProductCode!;
    }
    newCode++
    return newCode;
  }

  onSubmit() {
    //conversion of date
    let date: Date = new Date(Date.now());
    const dateStr: string = date.toString();
    console.log(dateStr)
    let num: Date = new Date(Date.parse(dateStr));
    console.log(num)

    this.itemForm.patchValue({
      ProductCode: this.getProductCode(),
      Image: this.itemsService.getItemPhoto()
    })

    const itemData: Product = this.itemForm.value;

    const item: Product = itemData;
    console.log(item);

    this.itemsService.addProduct(item).subscribe(res => {
      this.itemsService.getProductsFromApi();
      this.router.navigate(['/inventory/view-products']);
      console.log(res);
    });

  }



}
