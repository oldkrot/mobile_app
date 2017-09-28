import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import {
  VerificationDataService,
  BroadcasterService,
  UiDataService,
  ExaminerDataService,
  ValidateService,
  CommonDataService
} from '../../services/index';
import { UiData } from '../../help-data/index';
import { VerificationData } from './../../help-data/verification-data/verification-data';
import { VerificationNavigationService } from './../verification-navigation.service';

@Component({
  selector: 'app-verification-verify-data',
  templateUrl: './verification-verify-data.component.html',
  styleUrls: ['./verification-verify-data.component.css']
})
export class VerificationVerifyDataComponent implements OnInit {
  private uiData: UiData;
  private link: string;
  constructor(
    private verification: VerificationDataService,
    private broadcaster: BroadcasterService,
    private router: Router,
    private route: ActivatedRoute,
    private examinerData: ExaminerDataService,
    private navigation: VerificationNavigationService,
    private uiDataService: UiDataService,
    private validator: ValidateService,
    private common: CommonDataService,
  ) {
    this.uiData = this.uiDataService.uiData();
  }

  ngOnInit() {
    this.uiData.currentVerificationScreen = 8;
    this.InitLinkData();
  }
  private InitLinkData() {
    this.common.Encode(this.uiData.searchParameters.data)
      .subscribe(data => this.link = data['res']);
  }
  navigate(data: number) {
    switch (data) {
      case 8:
        const base = 'verification';
        this.navigation.navigate(data, base);
        break;
      default:
        this.Save();
        break;
    }
  }
  private Save() {
    let tempRequestData: VerificationData;
    tempRequestData = VerificationData.clone(this.verification.VerificationData());
    this.examinerData.saveVerificationData(tempRequestData)
      .subscribe(data => {
        // todo message
        // check if ok
        this.Redirect();
      });
  }
  private Redirect() {
    if (!this.validator.IsNullOrEmpty(this.link)) {
      window.location.href = this.link;
    }
  }

}
