import { Directive, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appClickOut]',
  standalone: true
})
export class ClickOutDirective {

  renderer = inject(Renderer2);
  el = inject(ElementRef);

  @HostListener('click', ['$event.target'])
  onClick(e: any) {
    console.log(this.el)
    this.renderer.addClass(this.el.nativeElement, 'close')
  } 

}
