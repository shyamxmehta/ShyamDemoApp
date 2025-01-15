import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product.type';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(value: any, args: any): any {
    // debugger
    if (!value) return null;

    if (!args) return value;

    args = args.toLowerCase();
    return value.filter(function (item: any) {
      item =
        JSON.stringify(item.ProductCode) +
        JSON.stringify(item.ProductDescription) +
        JSON.stringify(item.CostPrice);
      return item.toLowerCase().includes(args);
    });
  }
}
