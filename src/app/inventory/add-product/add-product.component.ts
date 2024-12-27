import { Component, inject } from '@angular/core';
import { BreadcrumbsComponent } from "../../breadcrumbs/breadcrumbs.component";
import { DragDropComponent } from "./drag-drop/drag-drop.component";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ BreadcrumbsComponent, DragDropComponent, ReactiveFormsModule ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {

  fb = inject(FormBuilder);
  apiService = inject(ApiService);

  itemForm = this.fb.group({
    Date: [Date(), Validators.required],
    ProductCode: [2, Validators.required],
    ProductDescription: ['', Validators.required],
    CostPrice: [1, Validators.required],
    SellingPrice: [1, Validators.required], 
    Unit: ['', Validators.required],
    Quantity: [1, Validators.required],
    StockVal: [1, Validators.required] 
  })


  onSubmit() {
    // this.itemForm.patchValue({
    //   ProductCode: 1,
    //   CostPrice: 1,
    //   SellingPrice: 1, 
    //   Quantity: 1,
    //   StockVal: 1
    // })

    console.log(this.itemForm.value);
    this.apiService.addProduct(this.itemForm.value).subscribe(res => {
      console.log(res)
    });

    this.apiService.getProductListing('').subscribe((res) => {
      console.log(res)
    })
  }


}
