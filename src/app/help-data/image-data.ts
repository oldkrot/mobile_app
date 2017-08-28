export interface IImageData {
  extension: string;
  data: string;
}
export class ImageData implements IImageData {
  extension: string;
  data: string;
  constructor() {
    this.data = '';
    this.extension = '';
  }
}
