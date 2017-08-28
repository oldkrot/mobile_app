import { Injectable, Inject } from '@angular/core';
import { ExaminerTelephone } from './examiner-telephone';
import { ExaminerAddress } from './examiner-address';
import { Examiner } from './examiner';
import { ExaminerSocialInsurance } from './examiner-social-insurance';
import { ExaminerBank } from './examiner-bank';
import { ExaminerInstitutes } from './examiner-institutes';

export class VerificationData {

  examinerAddress: ExaminerAddress;
  examiner: Examiner;
  examinerTelephone: ExaminerTelephone;
  examinerSocialInsurance: ExaminerSocialInsurance;
  examinerBank: ExaminerBank;
  examinerInstitute: ExaminerInstitutes;
  constructor() {
    this.examiner = new Examiner();
    this.examinerAddress = new ExaminerAddress();
    this.examinerTelephone = new ExaminerTelephone();
    this.examinerSocialInsurance = new ExaminerSocialInsurance();
    this.examinerBank = new ExaminerBank();
    this.examinerInstitute = new ExaminerInstitutes();
  }
}
