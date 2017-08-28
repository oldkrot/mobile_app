import { ImageData } from './../image-data';
export interface IExaminerBank {
  isChanged: boolean;
  Code: number;
  BankBranchId: number;
  BankAccount: number;
  BankId: number;
  ImageData: ImageData;
}

export class ExaminerBank implements IExaminerBank {
  isChanged: boolean;
  Code: number;
  BankBranchId: number;
  BankAccount: number;
  BankId: number;
  ImageData: ImageData;

  constructor() {
    this.ImageData = new ImageData();
    this.isChanged = false;
    this.Code = 0;
    this.BankId = 0;
    this.BankAccount = 0;
    this.BankBranchId = 0;
  }
}

