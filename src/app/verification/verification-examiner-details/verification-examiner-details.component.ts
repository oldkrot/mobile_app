import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VerificationNavigationService } from './../verification-navigation.service';
import { ValidateVerificationDataService } from './../validate-verification-data.service';

import {
  UiData,
  Examiner
} from './../../help-data';
import {
  BroadcasterService,
  UiDataService,
  CommonDataService,
  ExaminerDataService,
  VerificationDataService,
  ValidateService
} from './../../services';


@Component({
  selector: 'app-verification-examiner-details',
  templateUrl: './verification-examiner-details.component.html',
  styleUrls: ['./verification-examiner-details.component.css']
})
export class VerificationExaminerDetailsComponent implements OnInit {
  examiner: Examiner;
  private uiData: UiData;
  maxDate: Date;
  minDate: Date;
  private message: any[] = [];
  constructor(private uiDataService: UiDataService,
    private common: CommonDataService,
    private verification: VerificationDataService,
    private broadcaster: BroadcasterService,
    private examinerData: ExaminerDataService,
    private router: Router,
    private route: ActivatedRoute,
    private navigation: VerificationNavigationService,
    private validator: ValidateService,
    private verificationValidator: ValidateVerificationDataService) {
    this.uiData = this.uiDataService.uiData();
    this.examiner = this.verification.VerificationData().examiner;
    // tslint:disable-next-line:prefer-const
    let today: Date = new Date();
    this.minDate = new Date((today.getFullYear() - 50), today.getMonth(), today.getDate());
    this.maxDate = today;
  }
  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday from being selected.
    return day !== 6;
  }
  ngOnInit() {
    this.uiData.currentVerificationScreen = 1;
    this.examiner = this.verification.VerificationData().examiner;

  }
  navigate(data: number) {
    if (data === 0) {
      // help
    } else {
      let is_continue: boolean;
      is_continue = true;
      if (this.examiner.isChanged) {
        let validate_result: string;
        validate_result = this.verificationValidator.ValidateExaminerDetails(this.examiner);
        if (!this.validator.IsNullOrEmpty(validate_result)) {
          is_continue = false;
          // todo message
        }
      }
      if (is_continue) {
        this.verification.VerificationData().examiner = this.examiner;
        this.broadcaster.broadcast('savestate');
        const base = 'verification'; // this.route.routeConfig.path;
        this.navigation.navigate(data, base);
      }
    }
  }
  changeModel() {
    this.examiner.isChanged = true;
  }
}
