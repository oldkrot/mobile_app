import { Injectable, Inject } from '@angular/core';

import { Examiner } from './examiner';
import { ExaminerTelephone } from './examiner-telephone';
import { ExaminerAddress } from './examiner-address';
import { ExaminerSocialInsurance } from './examiner-social-insurance';
import { ExaminerBank } from './examiner-bank';
import { ExaminerInstitutes } from './examiner-institutes';
import { ExaminerVerifyDetails } from './examiner-verify-details';

export class VerificationData {

  examinerAddress: ExaminerAddress;
  examiner: Examiner;
  examinerTelephone: ExaminerTelephone;
  examinerSocialInsurance: ExaminerSocialInsurance;
  examinerBank: ExaminerBank;
  examinerInstitute: ExaminerInstitutes;
  examinerVerifyDetails: ExaminerVerifyDetails;
  constructor() {
    this.examiner = new Examiner();
    this.examinerAddress = new ExaminerAddress();
    this.examinerTelephone = new ExaminerTelephone();
    this.examinerSocialInsurance = new ExaminerSocialInsurance();
    this.examinerBank = new ExaminerBank();
    this.examinerInstitute = new ExaminerInstitutes();
    this.examinerVerifyDetails = new ExaminerVerifyDetails();
  }
}
