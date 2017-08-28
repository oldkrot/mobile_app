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
}
