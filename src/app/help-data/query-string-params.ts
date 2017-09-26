import { element } from 'protractor';
import { Params } from '@angular/router';
export class QueryStringParams {
  private data: string;
  examinerID: string;
  moed: number;
  guidanceexaminerid: string;
  originData: Params;
  constructor() {
    this.data = '';
    this.moed = 0;
    this.guidanceexaminerid = '';
    this.examinerID = '';
  }
  static clone(source: QueryStringParams): QueryStringParams {
    // tslint:disable-next-line:prefer-const
    let res = new QueryStringParams();
    res.data = source.data;
    return res;
  }
  static assign(source: QueryStringParams, destination: QueryStringParams): void {
    destination.data = source.data;
  }
  setData(value: string): void {
    this.data = value;
    // tslint:disable-next-line:prefer-const
    let data_params: string[] = this.data.split('&');
    // TODO FIX
    // if (data_params.length > 2) {
    if (data_params.length > 1) {
      for (let index = 0; index < data_params.length; index++) {
        // tslint:disable-next-line:prefer-const
        let element: string = data_params[index];
        // tslint:disable-next-line:prefer-const
        let element_array: string[] = element.split('=');
        switch (index) {
          case 0:
            this.examinerID = element_array[1];
            break;
          case 1:
            this.moed = parseInt(element_array[1], 10);
            break;
          case 2:
            break;
          default:
            break;
        }
      }
    }
    // tslint:disable-next-line:one-line
    else {
      // tslint:disable-next-line:prefer-const
      let element: string = data_params[0];
      // tslint:disable-next-line:prefer-const
      let element_array: string[] = element.split('=');
      this.guidanceexaminerid = element_array[1];
    }
  }
}
