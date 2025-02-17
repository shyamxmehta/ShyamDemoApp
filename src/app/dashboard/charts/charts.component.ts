import { Component, inject, OnInit } from '@angular/core';
import Chart, {
  ChartConfiguration,
  ChartData,
  ChartOptions,
} from 'chart.js/auto';
import { Product } from '../../shared/objects/product';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ItemsService } from '../../shared/services/products.service';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss',
})
export class ChartsComponent implements OnInit {
  itemsService = inject(ItemsService);
  products: Product[] = [];
  labelData: any = [];
  valueData: any = [];

  ngOnInit(): void {
    this.itemsService.getProducts.subscribe((products) => {
      //get complete dataset
      this.products = products;
      //check for actual data
      if (this.products.length > 0) {
        //sort data in order desired eg asc/desc
        this.products.sort((a: Product, b: Product) => {
          if (a.CostPrice! > b.CostPrice!) {
            return -1;
          } else {
            return 1;
          }
        });
        //get sorted data
        const top10Products: Product[] = this.products.slice(0, 10);
        //get label and value data
        top10Products.forEach((v) => {
          const label = v.ProductDescription?.split(' ', 2);
          this.labelData.push(label);
          this.valueData.push(v.CostPrice);
        });

        this.renderBarChart(this.labelData, this.valueData);
      }
    });

    this.renderPieChart();
  }

  renderBarChart(labelData: [], valueData: number) {
    const mychar = new Chart('bar-chart', {
      type: 'bar',
      data: {
        labels: labelData,
        datasets: [
          {
            data: valueData,
            backgroundColor: '#2c4e80',
            barThickness: 30,
            borderRadius: 3,
            borderSkipped: false,
            // clip: { bottom: 100 },
            label: 'Cost',
            base: 70,
          },
        ],
      },
      options: {
        responsive: true,
        // maintainAspectRatio: true,
        // aspectRatio: 1.5,
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              align: 'center',
              maxRotation: 0,
              font: {
                weight: 600,
              },
            },
          },
          y: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                weight: 600,
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          colors: {
            enabled: false,
          },
        },
      },
    });
  }

  renderPieChart() {
    const data: ChartData = {
      labels: [
        'Flour Wheat',
        'Kabras Sugar',
        'Blue Band',
        'Coca Cola',
        'Banana',
      ],
      datasets: [
        {
          label: `Stock '%'`,
          data: [30, 25, 25, 15, 8],
          datalabels: {
            color: '#fff',
            font: {
              size: 15,
              weight: 600,
            },
            align: 'end',
          },
          backgroundColor: [
            '#e23a0f',
            '#f9892e',
            '#499844',
            '#284473',
            '#6e98e0',
          ],
          // hoverOffset: 4
        },
      ],
    };

    const options: ChartOptions = {
      //remove pie chart internal border
      elements: {
        arc: {
          borderWidth: 0,
        },
      },
      //test commit comment
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.5,
      plugins: {
        legend: {
          labels: {
            boxWidth: 14,
            boxHeight: 14,
          },
          position: 'right',
        },
        //moidify labels
        datalabels: {
          formatter: function (value) {
            return value + '%';
          },
        },
      },
      layout: {
        padding: {
          top: 25,
        },
      },
    };

    const config: ChartConfiguration = {
      type: 'pie',
      data: data,
      options: options,
      plugins: [ChartDataLabels],
    };
    const pieChart = new Chart('pie-chart', config);
  }
}
