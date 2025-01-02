import { Component, inject, OnInit } from '@angular/core';
import Chart, { ChartConfiguration, ChartData, ChartOptions } from 'chart.js/auto'
import { ItemsService } from '../../shared/items.service';
import { Product } from '../../shared/product.interface';
import ChartDataLabels from 'chartjs-plugin-datalabels';
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
      this.products = products;
      if (this.products.length > 0) {
        this.products.map(o => {
          this.labelData.push(o.ProductDescription);
          this.realData.push(o.CostPrice);
        })
        this.realData.sort((a: any,b: any) => {
          if (a > b) {
            return -1
          } else {return 1}
        })
        this.renderBarChart(this.labelData, this.realData);
      }
    });
    this.renderPieChart();
  }

  renderBarChart(labelData: any, realData: any) {
    const mychar = new Chart( 'bar-chart', {
      type: 'bar',
      data: {
        labels: labelData,
        datasets: [
          {
            data: realData,
            backgroundColor: '#2c4e80',
            barThickness: 20,
            borderRadius: 3,
            label: 's'
          }
        ]
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              align: 'center',
              maxRotation: 0,
              
            }
          },
          y: {
            grid: {
              display: false
            },
          }
        },
        plugins: {
          legend: {
            display: false
          },
          colors: {
            enabled: false
          },
        }
      }
    })
  }

  renderPieChart() {

    const data: ChartData = {
      labels: [
        'Flour Wheat',
        'Kabras Sugar',
        'Blue Band',
        'Coca Cola',
        'Banana'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [30, 25, 25, 15, 4.5],
        datalabels: {
          color: '#fff',
          font: {
            size: 15,
            weight: 600
          },
          align: 'end'
        },
        backgroundColor: [
          '#e23a0f',
          '#f9892e',
          '#499844',
          '#284473',
          '#6e98e0'
        ],
        // hoverOffset: 4
      }]
    };

    const options: ChartOptions = {
      responsive: false,
      maintainAspectRatio: false,
      aspectRatio: 1.5,
      plugins: {
        legend: {
          position: 'right'
        }
      },
      layout: {
        padding: {
          top: 25
        }
      }
    }

    const config: ChartConfiguration = {
      type: 'pie',
      data: data,
      options: options,
      plugins: [ChartDataLabels]
    };


    const pieChart = new Chart( 'pie-chart', config)
  }

}
