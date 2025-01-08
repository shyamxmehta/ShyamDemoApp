import { Component, effect, ElementRef, inject, ViewChild } from '@angular/core';
import { DropboxDirective } from './dropbox.directive';
import { ItemsService } from '../../../shared/items.service';

@Component({
  selector: 'app-drag-drop',
  standalone: true,
  imports: [DropboxDirective],
  templateUrl: './drag-drop.component.html',
  styleUrl: './drag-drop.component.scss'
})
export class DragDropComponent {
  
  itemsService = inject(ItemsService);

  itemImage: string = '';
  viewMode: boolean = false;
  editMode: boolean = false;
  
  
  @ViewChild('browseImage') browseImage!: ElementRef;
  
  constructor() {
    effect(() => {
      this.itemImage = this.itemsService.getItemPhoto();
    })
  }
  
  clearImage() {
    this.itemImage = '';
  }
  convertImage(event: any) {
    // debugger
    console.log(event);

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event: Event) => {
        this.itemImage = reader.result!.toString();
        this.itemsService.getItemPhoto.update(() => this.itemImage)

      // this.itemForm.get('Photo').patchValue(this.base64);
    };

    reader.readAsDataURL(file);
  }


  onBrowseForImage() {
    this.browseImage.nativeElement.click();
  }

}
