export interface ITelephone {
  _telephoneType: number;
  _prefix: string;
  _telephoneID: number;
  _number: string;
}
export class Telephone implements ITelephone {
  _telephoneType: number;
  _telephoneID: number;
  _number: string;
  _prefix: string;
  constructor() {
    this._prefix = '';
    this._number = '';
  }
  static clone(source: Telephone): Telephone {
    // tslint:disable-next-line:prefer-const
    let res = new Telephone();
    res._number = source._number;
    res._telephoneType = source._telephoneType;
    res._telephoneID = source._telephoneID;
    res._prefix = source._prefix;
    return res;
  }
  static assign(source: Telephone, destination: Telephone): void {
    destination._number = source._number;
    destination._telephoneType = source._telephoneType;
    destination._telephoneID = source._telephoneID;
    destination._prefix = source._prefix;
  }
}
