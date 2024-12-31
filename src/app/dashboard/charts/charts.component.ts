import { Component, inject, OnInit } from '@angular/core';
import Chart from 'chart.js/auto'
import { ItemsService } from '../../shared/items.service';
import { Product } from '../../shared/product.interface';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent implements OnInit {

  itemsService = inject(ItemsService);
  products: Product[] = [];
  labelData: any = [];
  realData: any = [];

  ngOnInit(): void {
    this.itemsService.getProducts.subscribe(products => {
      debugger
      this.products = products;
      if (this.products.length > 0) {
        this.products.map(o => {
          this.labelData.push(o.ProductDescription);
          this.realData.push(o.CostPrice);
        })
        this.renderChart(this.labelData, this.realData);
      }
    });
  }

  renderChart(labelData: any, valueData: any) {
    const mychar = new Chart( 'bar-chart', {
      type: 'bar',
      data: {
        labels: labelData,
        datasets: [
          {
            data: valueData,
            // backgroundColor: colordata
          }
        ]
      },
      options: {}
    })
  }

}
