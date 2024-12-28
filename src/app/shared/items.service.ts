import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  getItemPhoto = signal<string>('');
  constructor() { }
}
