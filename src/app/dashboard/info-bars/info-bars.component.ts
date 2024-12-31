import { Component, inject } from '@angular/core';
import { ItemsService } from '../../shared/items.service';

@Component({
  selector: 'app-info-bars',
  standalone: true,
  imports: [],
  templateUrl: './info-bars.component.html',
  styleUrl: './info-bars.component.scss'
})
export class InfoBarsComponent {

  itemsService = inject(ItemsService);
}
