import {
  Directive,
  ElementRef,
  Host,
  HostListener,
  inject,
  Renderer2,
} from '@angular/core';
import { ItemsService } from '../../../shared/services/products.service';

@Directive({
  selector: '[appDropbox]',
  standalone: true,
  exportAs: 'dropboxDirective',
})
export class DropboxDirective {
  renderer = inject(Renderer2);
  element = inject(ElementRef);
  itemsService = inject(ItemsService);

  file!: File;
  imageBase64: string | ArrayBuffer | null = '';

  constructor() {}

  @HostListener('dragstart', ['$event'])
  onDragStart(e: Event) {
    e.preventDefault();
  }

  @HostListener('dragover', ['$event'])
  onDragOver(e: DragEvent) {
    this.renderer.setStyle(this.element.nativeElement, 'border', 'solid');
    this.element.nativeElement.childNodes[1].innerText =
      'Release to Upload Image';
    e.preventDefault();
  }

  @HostListener('dragleave')
  onDragLeave() {
    this.renderer.setStyle(
      this.element.nativeElement,
      'border',
      '4px dashed var(--blue-gray)'
    );
    this.element.nativeElement.childNodes[1].innerText =
      'Drag & Drop to Upload File';
  }

  @HostListener('drop', ['$event'])
  onDrop(e: any) {
    e.preventDefault();
    this.file = e.dataTransfer.files[0];
    this.checkValidity();
  }

  checkValidity() {
    const fileType = this.file.type;
    let validExtentions = ['image/jpeg', 'image/jpg', 'image/png']; // valid extentions
    if (validExtentions.includes(fileType)) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.file);
      fileReader.onload = () => {
        this.imageBase64 = fileReader.result;
        const imgBase64 = this.imageBase64!.toString();
        this.itemsService.getItemPhoto.update(() => imgBase64);
      };
    } else {
      alert('Not a valid image!');
      this.renderer.setStyle(
        this.element.nativeElement,
        'border',
        '4px dashed var(--blue-gray)'
      );
      this.element.nativeElement.childNodes[1].innerText =
        'Drag & Drop to Upload File';
    }
  }
}
