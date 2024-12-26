import { Component } from '@angular/core';
import { BreadcrumbsComponent } from "../../breadcrumbs/breadcrumbs.component";
import { Breadcrumb } from '../../breadcrumbs/breadcrumb';

@Component({
  selector: 'app-view-products',
  standalone: true,
  imports: [BreadcrumbsComponent],
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.scss'
})
export class ViewProductsComponent {

}
