import { Component } from '@angular/core';
import { BreadcrumbsComponent } from "../../breadcrumbs/breadcrumbs.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-view-products',
  standalone: true,
  imports: [BreadcrumbsComponent, RouterOutlet],
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.scss'
})
export class ViewProductsComponent {
  


}
