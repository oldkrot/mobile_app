export interface IExaminerVerifyDetails {
  IsNeedDataverification: boolean;
  VerifiedDetails: boolean;
  IsNeedAgreement: boolean;
  ExaminerId: number;
  tMoedId: number;
  ExaminerDataVerificationId: number;
  LastDataVerificationStatusId: number;
  UpdateBy: number;
}

export class ExaminerVerifyDetails implements IExaminerVerifyDetails {
  IsNeedDataverification: boolean;
  VerifiedDetails: boolean;
  IsNeedAgreement: boolean;
  ExaminerId: number;
  tMoedId: number;
  ExaminerDataVerificationId: number;
  LastDataVerificationStatusId: number;
  UpdateBy: number;

  constructor() {
    this.IsNeedDataverification = false;
    this.VerifiedDetails = false;
    this.IsNeedAgreement = false;
    this.tMoedId = 0;
    this.ExaminerId = 0;
    this.ExaminerDataVerificationId = 0;
    this.LastDataVerificationStatusId = 0;
    this.UpdateBy = 0;
  }
}
