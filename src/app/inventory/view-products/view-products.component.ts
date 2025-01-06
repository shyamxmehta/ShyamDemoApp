import { Component, inject, OnInit } from '@angular/core';
import { BreadcrumbsComponent } from "../../breadcrumbs/breadcrumbs.component";
import { ItemsService } from '../../shared/items.service';
import { TableComponent } from "./table/table.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-products',
  standalone: true,
  imports: [BreadcrumbsComponent, TableComponent, FormsModule],
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.scss'
})
export class ViewProductsComponent implements OnInit {
  
  itemsService = inject(ItemsService);
  searchText: string = '';

  ngOnInit(): void {
    // this.itemsService
  }

}
