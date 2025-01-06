import { Component, effect, inject } from '@angular/core';
import { BreadcrumbsComponent } from "../../breadcrumbs/breadcrumbs.component";
import { DragDropComponent } from "./drag-drop/drag-drop.component";
import { FormBuilder, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { Product, ProductClass } from '../../shared/product.interface';
import { ItemsService } from '../../shared/items.service';

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
  itemsService = inject(ItemsService);

  itemForm = this.fb.group({
    Date: ['2024/01/06', Validators.required],
    ProductCode: [410190, Validators.required],
    ProductDescription: ['', Validators.required],
    CostPrice: [Validators.required],
    SellingPrice: [Validators.required], 
    Unit: ['', Validators.required],
    Quantity: [Validators.required],
    StockVal: [1,Validators.required],
    Image: ['', Validators.required]
  });


  onSubmit() {

 
    //conversion of date
    let date: Date = new Date(Date.now());
    const dateStr: string = date.toString();
    console.log(dateStr)
    let num: Date = new Date(Date.parse(dateStr));
    console.log(num)

    this.itemForm.patchValue({
    //   Date: new Date(Date.now()).toString(),
      Image: this.itemsService.getItemPhoto()
    })

    const itemData: Product = this.itemForm.value;

    const item: Product = itemData;
    console.log(item);


    
    // const itemData: Product = this.itemForm.value;
    // console.log(itemData);
    this.apiService.addProduct(item).subscribe(res => {
      console.log(res);
    });

    // this.apiService.addProduct(itemData).subscribe((res) => {
    //   console.log(res)
    // })
  }


}
