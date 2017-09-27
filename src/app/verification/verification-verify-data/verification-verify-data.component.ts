import { VerificationData } from './../../help-data/verification-data/verification-data';
import { VerificationNavigationService } from './../verification-navigation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import {
  VerificationDataService,
  BroadcasterService,
  UiDataService,
  ExaminerDataService
} from '../../services/index';
import { UiData } from '../../help-data/index';

@Component({
  selector: 'app-verification-verify-data',
  templateUrl: './verification-verify-data.component.html',
  styleUrls: ['./verification-verify-data.component.css']
})
export class VerificationVerifyDataComponent implements OnInit {
  private uiData: UiData;
  constructor(
    private verification: VerificationDataService,
    private broadcaster: BroadcasterService,
    private router: Router,
    private route: ActivatedRoute,
    private examinerData: ExaminerDataService,
    private navigation: VerificationNavigationService,
    private uiDataService: UiDataService
  ) {
    this.uiData = this.uiDataService.uiData();
  }

  ngOnInit() {
    this.uiData.currentVerificationScreen = 8;
  }
  navigate(data: number) {
    switch (data) {
      case 8:
        const base = 'verification';
        this.navigation.navigate(data, base);
        break;
      default:
        break;
    }
  }
  private Save() {
    let tempRequestData: VerificationData;
    tempRequestData = VerificationData.clone(this.verification.VerificationData());
    this.examinerData.saveVerificationData(tempRequestData)
      .subscribe(data => {
        // todo message
      });
  }
}
