import { element } from 'protractor';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TS } from './../../..//node_modules/typescript-linq/TS';
import {
  ExaminerAddress,
  Examiner,
  ExaminerBank,
  ExaminerInstitutes,
  ExaminerSocialInsurance,
  ExaminerTelephone
} from './../help-data/verification-data';
import { Telephone } from './../help-data/telephone';

import { ValidateService } from '../services/index';
import { Institute } from '../help-data/index';
@Injectable()
export class ValidateVerificationDataService {

  constructor(private validator: ValidateService) { }
  ValidateExaminerDetails(value: Examiner): string {
    let result: string;
    result = '';
    let is_continue: boolean;
    is_continue = true;
    if (!this.validator.IsNullOrEmpty(value.IdentityCard)) {
      if (this.validator.TryParseInt(value.IdentityCard, 0) !== 0) {
        if (!this.validator.ValidateIdentityCard(value.IdentityCard)) {
          result = 'מספר ת.ז. לא תקין';
          is_continue = false;
        }
      } else {
        result = 'מספר ת.ז. לא תקין';
        is_continue = false;
      }
    } else {
      result = 'מספר ת.ז. לא תקין';
      is_continue = false;
    }
    if (is_continue) {
      if (this.validator.IsNullOrEmpty(value.FirstName)) {
        result = 'נא למלא שם פרטי';
        is_continue = false;
      }
    }
    if (is_continue) {
      if (this.validator.IsNullOrEmpty(value.LastName)) {
        result = 'נא למלא שם משפחה';
        is_continue = false;
      }
    }
    if (is_continue) {
      if (!this.validator.IsNullOrEmpty(value.BirthDate)) {
        // tslint:disable-next-line:prefer-const
        let bDate: Date = new Date(value.BirthDate);
        // tslint:disable-next-line:prefer-const
        let currDate: Date = new Date();
        // tslint:disable-next-line:prefer-const
        let currYear: number = currDate.getFullYear();
        // tslint:disable-next-line:prefer-const
        let bYear: number = bDate.getFullYear();
        // tslint:disable-next-line:prefer-const
        let diff: number = Math.abs(currYear - bYear);
        if (diff < 18) {
          result = 'תאריך לידה לא תקין';
          is_continue = false;
        }
      } else {
        result = 'נא למלא תאריך לידה';
        is_continue = false;
      }
    }
    /*     if (is_continue) {

        }
        if (is_continue) {

        } */
    return result;
  }
  ValidateExaminerAddress(value: ExaminerAddress): string {
    let result: string;
    result = '';
    let is_continue: boolean;
    is_continue = true;
    if (value === undefined || value === null) {
      result = 'address is empty';
      is_continue = false;
    }
    if (is_continue) {
      if (value.tCityId === 0) {
        result = 'נא לבחור עיר';
        is_continue = false;
      }
    }
    if (is_continue) {
      if (value.Email === undefined || this.validator.IsNullOrEmpty(value.Email)) {
        result = 'נא למלא דוא"ל';
        is_continue = false;
      }
    }
    if (is_continue) {
      if (!this.validator.ValidateMail(value.Email)) {
        result = 'דוא"ל לא תקין';
        is_continue = false;
      }
    }
    /*     if (is_continue) {

        }
        if (is_continue) {

        }
        if (is_continue) {

        } */
    return result;
  }
  ValidateExaminerTelephones(value: ExaminerTelephone): string {
    let result: string;
    result = '';
    let is_continue: boolean;
    is_continue = true;
    if (value.Telephones === undefined || value.Telephones.length === 0) {
      result = 'empty telphone list';
      is_continue = false;
    }
    if (is_continue) {
      for (let index = 0; index < value.Telephones.length; index++) {
        if (is_continue) {
          let telephone: Telephone;
          telephone = value.Telephones[index];
          if (telephone._telephoneType === undefined) {
            result = 'נא לבחור סוג טלפון';
            is_continue = false;
            break;
          }
          if (telephone._prefix === undefined || this.validator.IsNullOrEmpty(telephone._prefix)) {
            result = 'נא למלא את הקידומת';
            is_continue = false;
            break;
          }
          if (telephone._number === undefined || this.validator.IsNullOrEmpty(telephone._number)) {
            result = 'נא למלא את מספר הטלפון';
            is_continue = false;
            break;
          }
          if (isNaN(parseInt(telephone._number, 10)) || isNaN(parseInt(telephone._prefix, 10))) {
            result = 'בקידומת ומספר טלפון יש להכניס ספרות בלבד';
            is_continue = false;
            break;
          }
          if (telephone._number.length !== 7) {
            result = 'מספר הטלפון חייב להיות בן 7 ספרות';
            is_continue = false;
            break;
          }
          if (telephone._prefix.length !== 3 && telephone._prefix.length !== 2) {
            result = 'קידומת הטלפון חייבת להיות בת 2-3 ספרות';
            is_continue = false;
            break;
          }
          let enumerator: TS.Linq.Enumerator<Telephone>;
          enumerator = new TS.Linq.Enumerator<Telephone>(value.Telephones);
          let query_result: Telephone[];
          query_result = enumerator.where(item => item._prefix === telephone._prefix
            && item._number === telephone._number
            && item._telephoneType === telephone._telephoneType).toArray();
          if (query_result.length > 1) {
            result = 'אין להכניס מספר טלפון יותר מפעם אחת';
            is_continue = false;
            break;
          }

        }
      }
    }
    return result;
  }
  ValidateExaminerBank(value: ExaminerBank): string {
    let result: string;
    result = '';
    let is_continue: boolean;
    is_continue = true;
    let retValue: number;
    retValue = this.validator.TryParseInt(value.BankAccount, 0);
    if (retValue === 0) {
      result = 'יש למלא את חשבון הבנק';
      is_continue = false;
    }
    if (is_continue) {
      if (value.BankBranchId === undefined || value.BankBranchId < 1) {
        result = 'נא לבחור סניף';
        is_continue = false;
      }
    }
    if (is_continue) {
      if (value.Code === undefined || value.Code < 1) {
        result = 'נא לבחור בנק';
        is_continue = false;
      }
    }
    /*     if (is_continue) {
          if (value.ImageData === undefined
            || this.validator.IsNullOrEmpty(value.ImageData.data)
            || this.validator.IsNullOrEmpty(value.ImageData.extension)) {
            is_continue = false;
    }
        } */
    return result;
  }
  ValidateExaminerInstitutes(value: ExaminerInstitutes): string {
    let result: string;
    result = '';
    let is_continue: boolean;
    is_continue = true;
    let enumerator: TS.Linq.Enumerator<Institute>;
    enumerator = new TS.Linq.Enumerator<Institute>(value.Institutes);
    let query_result: Institute[];
    query_result = enumerator.where(item => this.validator.IsNullOrEmpty(item.IMOHCode)).toArray();
    if (query_result.length > 0) {
      result = 'יש למלא סמל מוסד';
      is_continue = false;
    }
    if (is_continue) {
      query_result = enumerator.where(item => item.StartDate === undefined
        || this.validator.IsNullOrEmpty(item.StartDate.toString())).toArray();
      if (query_result.length > 0) {
        result = 'יש למלא תאריך תחילת עבודה במוסד';
        is_continue = false;
      }
    }
    if (is_continue) {
      for (let index = 0; index < value.Institutes.length; index++) {
        let element: Institute;
        element = value.Institutes[index];
        query_result = enumerator.where(item => item.IMOHCode === element.IMOHCode
          && (item.StartDate !== undefined && !this.validator.IsNullOrEmpty(item.StartDate.toString()))
          && (item.EndDate === undefined || this.validator.IsNullOrEmpty(item.EndDate.toString()))).toArray();
        if (query_result.length > 1) {
          result = 'כפילות נתונים';
          is_continue = false;
          break;
        }
        /*         if (is_continue) {

                } */
      }
    }
    return result;
  }
  ValidateExaminerocialInsurance(value: ExaminerSocialInsurance): string {
    let result: string;
    result = '';
    if (value.IsSocialSecurityCoordination) {
      if (value.ImageData === undefined
        || this.validator.IsNullOrEmpty(value.ImageData.data)
        || this.validator.IsNullOrEmpty(value.ImageData.extension)) {
        // may be in future
      }
    }
    return result;
  }
}

