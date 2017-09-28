import { element } from 'protractor';
import { Params } from '@angular/router';
export class QueryStringParams {
  data: string;
  examinerid: string;
  moed: number;
  guidanceexaminerid: string;
  embeddingid: number;
  originData: Params;
  constructor() {
    this.data = '';
    this.moed = 0;
    this.embeddingid = 0;
    this.guidanceexaminerid = '';
    this.examinerid = '';
  }
  static clone(source: QueryStringParams): QueryStringParams {
    let res: QueryStringParams;
    res = new QueryStringParams();
    res.data = source.data;
    return res;
  }
  static assign(source: QueryStringParams, destination: QueryStringParams): void {
    destination.data = source.data;
  }
  setData(value: string): void {
    this.data = value;
    let data_params: string[];
    data_params = this.data.split('&');
    let element: string;
    let element_array: string[];
    switch (data_params.length) {
      case 1:
        element = data_params[0];
        element_array = element.split('=');
        this.guidanceexaminerid = element_array[1];
        break;
      default:
        for (let index = 0; index < data_params.length; index++) {
          element = data_params[index];
          element_array = element.split('=');
          switch (index) {
            case 0:
              this.examinerid = element_array[1];
              break;
            case 1:
              this.moed = parseInt(element_array[1], 10);
              break;
            case 2:
              this.embeddingid = parseInt(element_array[1], 10);
              break;
            default:
              break;
          }
        }
        break;
    }
  }
}
