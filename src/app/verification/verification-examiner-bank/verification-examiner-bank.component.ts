
import { Component, OnInit } from '@angular/core';
import { Injectable, Inject, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { VerificationNavigationService } from './../verification-navigation.service';
import { VerificationData } from './../../help-data/verifcation-data/verification-data';
import { ExaminerBank } from './../../help-data/verifcation-data/examiner-bank';
import { Examiner } from './../../help-data/verifcation-data/examiner';
import { KeyValuePair, IKeyValuePair } from './../../help-data/key-value-pair';
import { UiData } from './../../help-data/ui-data';
import { Branch, IBranch } from './../../help-data/branch';
import {
  BroadcasterService,
  UiDataService,
  CommonDataService,
  ExaminerDataService,
  VerificationDataService
} from './../../services/index';
import { Observable } from 'rxjs/Observable';
import { MdAutocompleteTrigger } from '@angular/material';
import * as Rx from 'rxjs/Rx';
@Component({
  selector: 'app-verification-examiner-bank',
  templateUrl: './verification-examiner-bank.component.html',
  styleUrls: ['./verification-examiner-bank.component.css']
})
export class VerificationExaminerBankComponent implements OnInit {
  banks: KeyValuePair[];
  selectedBank: KeyValuePair;
  private uiData: UiData;
  private message: any[] = [];
  filteredBanks: Observable<KeyValuePair[]>;
  examinerBank: ExaminerBank;
  bankControl: FormControl;
  filteredBranches: Observable<Branch[]>;
  selectedBranch: Branch;
  private AllBranches: Branch[];
  branchControl: FormControl;
  private branches: Branch[];

  constructor(private uiDataService: UiDataService,
    private common: CommonDataService,
    private verification: VerificationDataService,
    private broadcaster: BroadcasterService,
    private examinerData: ExaminerDataService,
    private router: Router,
    private route: ActivatedRoute,
    private navigation: VerificationNavigationService) {
    this.uiData = this.uiDataService.uiData();
    this.examinerBank = this.verification.VerificationData().examinerBank;
    this.selectedBank = new KeyValuePair();
    this.banks = new Array<KeyValuePair>();
    this.selectedBranch = new Branch();
    this.AllBranches = new Array<Branch>();
    this.branches = new Array<Branch>();
    this.bankControl = new FormControl();
    this.branchControl = new FormControl();

  }

  ngOnInit() {
    // TODO Remove

    this.verification.VerificationData().examiner.ExaminerId = 1509;
    this.uiData.currentVerificationScreen = 4;
    this.filteredBanks = this.bankControl.valueChanges
      .startWith(null)
      .map(val => val ? this.filterBank(val) : this.banks.slice());
    this.filteredBranches = this.branchControl.valueChanges
      .startWith(null)
      .map(val => val ? this.filterBranch(val) : this.branches.slice());
    this.common.getBranches()
      .subscribe(data => this.AllBranches = <Branch[]>data['Branches'],
      error => console.log(error),
      () => this.completeFn());


    this.common.getBanks()
      .subscribe(data => this.banks = <KeyValuePair[]>data['Banks'],
      error => console.log(error),
      () => this.completeFn());
    this.examinerData.getExaminerBank(this.verification.VerificationData().examiner.ExaminerId)
      .subscribe(
      result => this.examinerBank = <ExaminerBank>result,
      error => console.log(error),
      () => this.completeFn());
    //  setTimeout(() => { this.completeFn(); }, 5000);
  }
  filterBank(val): KeyValuePair[] {
    if (typeof (val) === 'string') {
      return this.banks.filter(option => new RegExp(val, 'gi').test(option.Name));
    }
    if (typeof (val) === 'object') {
      // this.autoComplete.closePanel();
      //   this.is_after_closing = true;
      this.bankChange(val);
      return val ? this.banks.filter(c => c.Code === (<KeyValuePair>val).Code) : this.banks;
    }
    return [];
  }
  bankChange(val: any) {
    if (typeof (val) === 'object') {
      this.selectedBank = new KeyValuePair();
      // tslint:disable-next-line:prefer-const
      let bank: KeyValuePair = this.banks.find(b => b.Code === (<IKeyValuePair>val).Code);
      if (bank && typeof bank === 'object') {
        this.selectedBank = bank;
        if (this.selectedBank.Code !== this.examinerBank.Code) {
          this.examinerBank.Code = this.selectedBank.Code;
          this.branches = this.AllBranches.filter(br => br.BankID === this.selectedBank.Code);
          this.selectedBranch = new Branch();
          this.examinerBank.BankBranchId = 0;
          this.changeModel();
        }
      }
    }
  }
  filterBranch(val): IBranch[] {
    if (typeof (val) === 'string') {
      return this.branches.filter(option => new RegExp(val, 'gi').test(option.Name));
    }
    if (typeof (val) === 'object') {
      this.branchChange(val);
      return val ? this.branches.filter(br => br.Code === (<Branch>val).Code) : this.branches;
    }
    return [];
  }
  branchChange(val: any) {
    if (typeof (val) === 'object') {
      // tslint:disable-next-line:prefer-const
      let branch: Branch = this.branches.find(b => b.Code === (<Branch>val).Code);
      if (branch && typeof branch === 'object') {
        this.selectedBranch = branch;
        this.examinerBank.BankBranchId = this.selectedBranch.Code;
        this.changeModel();
      }
    }
  }

  changeModel() {
    this.examinerBank.isChanged = true;
  }
  navigate(data: number) {
    if (data === 0) {
      // help
    } else {
      const base = 'verification'; // this.route.routeConfig.path;
      this.navigation.navigate(data, base);
    }
  }
  change($event) {

  }
  completeFn() {
    if ((this.examinerBank !== null && this.examinerBank !== undefined) &&
      (this.banks !== null && this.banks !== undefined) &&
      (this.AllBranches !== null && this.AllBranches !== undefined)) {
      this.selectedBranch = new Branch();
      // tslint:disable-next-line:prefer-const
      let bn: KeyValuePair = this.banks.find(b => b.Code === this.examinerBank.Code);
      if (bn !== null && bn !== undefined) {
        this.selectedBank = bn;
        this.filterBank(bn);
      }
      if (this.selectedBank !== null && this.selectedBank !== undefined) {
        this.branches = this.selectedBank ? this.AllBranches.filter(br => br.BankID === this.selectedBank.Code) : this.AllBranches;
        // tslint:disable-next-line:prefer-const
        let br: Branch = this.branches.find(brn => brn.Code === this.examinerBank.BankBranchId);
        if (br !== null && br !== undefined) {
          this.selectedBranch = br;
          this.filterBranch(br);
        }
      }
      this.examinerBank.isChanged = false;
    }
  }
}
