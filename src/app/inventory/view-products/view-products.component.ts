import { Component, inject, Output } from '@angular/core';
import { BreadcrumbsComponent } from "../../breadcrumbs/breadcrumbs.component";
import { ItemsService } from '../../shared/items.service';
import { ApiService } from '../../shared/api.service';
import { Product } from '../../shared/product.interface';
import { TableComponent } from "./table/table.component";

@Component({
  selector: 'app-view-products',
  standalone: true,
  imports: [BreadcrumbsComponent, TableComponent],
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.scss'
})
export class ViewProductsComponent {
  

}
