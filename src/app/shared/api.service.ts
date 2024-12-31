import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Product } from './product.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  http = inject(HttpClient);;

  getProductListing() {
    
  const url = 'http://localhost:3000/products';
   
    const body = {
      // UserName : 
    };

    return this.http.get( url );
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
    const url = 'http://localhost:3000/products';
    
    return this.http.put(url, item);
    
  }

  updateItem(item: Product) {
    
    const url = 'https://www.aspiresoft.co.ke/Wt/APIs.aspx/edititem';

    return this.http.post(url, item);

  }

  deleteItem(item: {UserName: string, ItemCode: number}) {
    
    const url = 'https://www.aspiresoft.co.ke/Wt/APIs.aspx/deleteitem';

    return this.http.post(url, item);

  }
  constructor() { }
}
