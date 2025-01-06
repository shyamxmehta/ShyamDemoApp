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


  ngOnInit(): void {
    const id = this.activatedRoute;
    console.log(id)
  }

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
      this.itemsService.getProductsFromApi();
      this.router.navigate(['/inventory/view-products']);
      console.log(res);
    });

    // this.apiService.addProduct(itemData).subscribe((res) => {
    //   console.log(res)
    // })
  }



}
