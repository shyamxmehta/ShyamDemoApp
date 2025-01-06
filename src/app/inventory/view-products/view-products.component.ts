import { Component, inject, OnInit } from '@angular/core';
import { BreadcrumbsComponent } from "../../breadcrumbs/breadcrumbs.component";
import { ItemsService } from '../../shared/items.service';
import { TableComponent } from "./list/table/table.component";
import { FormsModule } from '@angular/forms';
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
