
import { Directive, ElementRef, Input, OnInit, Output, Renderer, EventEmitter, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { BroadcasterService } from './../services/broadcaster.service';

@Directive({
  selector: '[appLoadImageData]'
})
export class LoadImageDataDirective implements OnInit {


  private root: any;
  private fileData: string;
  constructor(private elementRef: ElementRef, private broadcuster: BroadcasterService) { }
  //  @Output() data: EventEmitter<string> = new EventEmitter<string>();
  ngOnInit(): void {
  }
  @HostListener('change', ['$event']) onchange($event) {
    // tslint:disable-next-line:prefer-const
    let files = $event.target.files;
    if (files.length > 0) {
      // tslint:disable-next-line:prefer-const
      let messageKey = '';
      // tslint:disable-next-line:prefer-const
      let el: HTMLElement = this.elementRef.nativeElement;
      // tslint:disable-next-line:prefer-const
      switch (el.id.toLowerCase()) {
        case 'socilafiles':
          messageKey = 'loadsocialimage';
          break;
        case 'examinerfiles':
          messageKey = 'loadexaminerimage';
          break;
        case 'bankfiles':
          messageKey = 'loadbankimage';
          break;
        default:
          break;
      }
      // tslint:disable-next-line:prefer-const
      let document: Document = el.ownerDocument;
      // tslint:disable-next-line:prefer-const
      let img = document.createElement('img');
      img.src = window.URL.createObjectURL(files[0]);
      // tslint:disable-next-line:prefer-const
      let reader: FileReader = new FileReader();
      // Add an event listener to deal with the file when the reader is complete
      reader.addEventListener('load', (event: any) => {
        // Get the event.target.result from the reader (base64 of the image)
        img.src = event.target.result;

        // Resize the image
        // tslint:disable-next-line:prefer-const
        let resized_img = this.resize(img, document);
        // Push the img src (base64 string) into our array that we display in our html template
        this.fileData = resized_img;
        this.broadcuster.broadcast(messageKey, this.fileData);
        // this.data.emit(this.fileData);
      }, false);
      reader.readAsDataURL(files[0]);
    }

  }
  private resize(img, document: Document) {
    // tslint:disable-next-line:prefer-const
    let canvas = document.createElement('canvas');
    // tslint:disable-next-line:prefer-const
    let ctx = canvas.getContext('2d');
    const value = 30;
    img.width = (img.width * value) / 100;
    img.height = (img.height * value) / 100;
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);
    // tslint:disable-next-line:prefer-const
    let dataUrl = canvas.toDataURL('image/jpeg');
    return dataUrl;
  }
}

