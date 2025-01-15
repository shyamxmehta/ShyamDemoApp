import { HostListener, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  manualCollapseSidebar = new BehaviorSubject<boolean>(true);

  constructor() {}
}
