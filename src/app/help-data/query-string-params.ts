export class QueryStringParams {
  data: string;
  constructor() {
    this.data = '';
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
}
