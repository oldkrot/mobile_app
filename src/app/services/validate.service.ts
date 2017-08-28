import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }
  ValidateIdentityCard(data: string): boolean {
    // tslint:disable-next-line:prefer-const
    let tot = 0;
    // tslint:disable-next-line:prefer-const
    let x: any;
    // tslint:disable-next-line:prefer-const
    let tz: any = data;
    for (let i = 0; i < 8; i++) {
      x = (((i % 2) + 1) * tz.charAt(i));
      if (x > 9) {
        // tslint:disable-next-line:radix
        x = parseInt(x.charAt(0)) + parseInt(x.charAt(1));
      }
      tot += x;
    }
    // tslint:disable-next-line:radix
    if ((tot + parseInt(tz.charAt(8))) % 10 === 0) {
      return true;
    } else {
      return false;
    }
  }
  ValidateMail(data: string): boolean {
    const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(data)) {
      return true;
    } else {
      return false;
    }
  }
  TryParseInt(input: any, defaultValue: number): number {
    let res: number;
    res = defaultValue;
    if (input !== undefined) {
      if (input.toString().length > 0) {
        if (!isNaN(input)) {
          // tslint:disable-next-line:radix
          res = parseInt(input);
        }
      }
    }
    return res;
  }
  IsNullOrEmpty(data: any): boolean {
    if (typeof (data) === 'number' || typeof (data) === 'boolean') {
      return false;
    }
    if (typeof (data) === 'undefined' || data === null) {
      return true;
    }
    if (typeof (data.length) !== 'undefined') {
      return data.length === 0;
    }
    let count: number;
    count = 0;
    // tslint:disable-next-line:prefer-const
    for (let i in data) {
      if (data.hasOwnProperty(i)) {
        count++;
      }
    }
    return count === 0;
  }
}

