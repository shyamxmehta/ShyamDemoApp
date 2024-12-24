import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appClickOut]',
  standalone: true
})
export class ClickOutDirective {

  el = inject(ElementRef<HTMLDialogElement>);

  @HostListener('click', ['$event.target'])
  onClick(targetElement: HTMLDialogElement) {
    // if (this.el = ) {
    // console.log(targetElement)
    // }
  } 
  constructor() { }

}
