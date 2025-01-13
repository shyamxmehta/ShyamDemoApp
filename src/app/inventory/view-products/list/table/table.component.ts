import { Component, inject, Input, OnInit } from '@angular/core';
import { Product } from '../../../../shared/product.interface';
import { ItemsService } from '../../../../shared/products.service';
import { SearchPipe } from '../../../../shared/pipes/search.pipe';
import { DecimalPipe, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [SearchPipe, DecimalPipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  itemsService = inject(ItemsService);
  products: Product[] = [];
  router = inject(Router);

  @Input() searchText: string = '';
  constructor() {
    this.itemsService.getProducts.subscribe({
      next: (products) => (this.products = products),
      error(err) {
        console.log(err);
      },
      complete() {
        console.log('complete view table');
      },
    });
  }

  edit(item: Product) {
    const urlString = this.router.url + '/' + item.id;
    this.router.navigateByUrl(urlString, { state: { data: item } });
  }

  delete(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.itemsService.deleteProduct(id);

        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
          confirmButtonColor: '#3f93f1',
        });
      }
    });
  }
}
