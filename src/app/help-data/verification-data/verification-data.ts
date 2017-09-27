import { Injectable, Inject } from '@angular/core';

import { Examiner } from './examiner';
import { ExaminerTelephone } from './examiner-telephone';
import { ExaminerAddress } from './examiner-address';
import { ExaminerSocialInsurance } from './examiner-social-insurance';
import { ExaminerBank } from './examiner-bank';
import { ExaminerInstitutes } from './examiner-institutes';
import { ExaminerVerifyDetails } from './examiner-verify-details';
import { Guidance } from './guidance';

export class VerificationData {

  examinerAddress: ExaminerAddress;
  examiner: Examiner;
  examinerTelephone: ExaminerTelephone;
  examinerSocialInsurance: ExaminerSocialInsurance;
  examinerBank: ExaminerBank;
  examinerInstitute: ExaminerInstitutes;
  examinerVerifyDetails: ExaminerVerifyDetails;
  guidance: Guidance;
  constructor() {
    this.examiner = new Examiner();
    this.examinerAddress = new ExaminerAddress();
    this.examinerTelephone = new ExaminerTelephone();
    this.examinerSocialInsurance = new ExaminerSocialInsurance();
    this.examinerBank = new ExaminerBank();
    this.examinerInstitute = new ExaminerInstitutes();
    this.examinerVerifyDetails = new ExaminerVerifyDetails();
    this.guidance = new Guidance();
  }
  static clone(source: VerificationData): VerificationData {
    let res: VerificationData;
    res = new VerificationData();
    res.examiner = source.examiner;
    res.examinerAddress = source.examinerAddress;
    res.examinerTelephone = source.examinerTelephone;
    res.examinerSocialInsurance = source.examinerSocialInsurance;
    res.examinerBank = source.examinerBank;
    res.examinerInstitute = source.examinerInstitute;
    res.examinerVerifyDetails = source.examinerVerifyDetails;
    res.guidance = source.guidance;
    return res;
  }
  static assign(source: VerificationData, destination: VerificationData): void {
    destination.examiner = source.examiner;
    destination.examinerAddress = source.examinerAddress;
    destination.examinerTelephone = source.examinerTelephone;
    destination.examinerSocialInsurance = source.examinerSocialInsurance;
    destination.examinerBank = source.examinerBank;
    destination.examinerInstitute = source.examinerInstitute;
    destination.examinerVerifyDetails = source.examinerVerifyDetails;
    destination.guidance = source.guidance;
  }
}
