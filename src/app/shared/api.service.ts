import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Product } from './product.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000/products';

  getProductListing() {
    // const url = 'http://localhost:3000/products';

    // const body = {
    //   // UserName :
    // };

    return this.http.get(this.url);
    // .pipe(
    //   catchError(err => {
    //     console.log('Api service received error');
    //     return throwError(() => {
    //       console.log(`error thrown again by API service`);
    //       return err;
    //     })
    //   })
    // );
  }

  addProduct(item: Product) {
    return this.http.post(this.url, item);
  }

  // updateItem(item: Product) {

  //   const url = 'https://www.aspiresoft.co.ke/Wt/APIs.aspx/edititem';

  //   return this.http.post(url, item);

  // }
  updateItem(item: Product) {
    const itemUrl = this.url + '/' + item.id;
    return this.http.patch(itemUrl, item);
  }

  // deleteItem(item: {UserName: string, ItemCode: number}) {

  //   const url = 'https://www.aspiresoft.co.ke/Wt/APIs.aspx/deleteitem';

  //   return this.http.post(url, item);

  // }

  deleteItem(id: string) {
    const itemUrl = this.url + '/' + id;

    return this.http.delete(itemUrl);
  }

  constructor() {}
}
