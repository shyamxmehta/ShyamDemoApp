import { Component, inject } from '@angular/core';
import { BreadcrumbsComponent } from "../../breadcrumbs/breadcrumbs.component";
import { ItemsService } from '../../shared/items.service';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-view-products',
  standalone: true,
  imports: [BreadcrumbsComponent],
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.scss'
})
export class ViewProductsComponent {

  itemsService = inject(ItemsService);
  apiService = inject(ApiService);

  constructor() {
    const data = this.apiService.getProductListing().subscribe(res => console.log(res));
  }
}
