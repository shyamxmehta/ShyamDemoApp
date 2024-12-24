import { Component } from '@angular/core';
import { InfoBarsComponent } from "./info-bars/info-bars.component";
import { ChartsComponent } from "./charts/charts.component";
import { ProductSummaryComponent } from "./product-summary/product-summary.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [InfoBarsComponent, ChartsComponent, ProductSummaryComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
