import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  BroadcasterService,
  UiDataService,
  CommonDataService,
  ExaminerDataService,
  VerificationDataService
} from './services';
import { Observable } from 'rxjs/Observable';
import { UiData } from './help-data';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  title = '';
  private uiData: UiData;
  constructor(
    private common: CommonDataService,
    private route: ActivatedRoute,
    private broadcaster: BroadcasterService,
    private uiDataService: UiDataService,
    private examinerService: ExaminerDataService,
    private router: Router,
    private verification: VerificationDataService
  ) {
    this.uiData = this.uiDataService.uiData();
  }

  ngOnInit() {
    let params: Params;
    params = this.route.snapshot.queryParams;
    if (params) {
      this.uiData.searchParameters.originData = params;
      this.Decode(params);
    }

  }

  private Navigate(params: string) {
    let params_split: string[];
    params_split = params.split('&');
    this.uiData.searchParameters.setData(params);
    switch (params_split.length) {
      case 1:
        this.InitGuidanceExaminerData(this.uiData.searchParameters.guidanceexaminerid);
        break;
      default:
        this.InitExaminerData(this.uiData.searchParameters.examinerid,
          this.uiData.searchParameters.moed);
        break;
    }
    /* if (params_split.length > 0) {
      // TODO FIX
      // if (params_split.length > 2 && params_split[2].indexOf('=') > -1) {
      if (params_split.length > 1 && params_split[1].indexOf('=') > -1) {
        this.InitExaminerData(this.uiData.searchParameters.examinerID,
          this.uiData.searchParameters.moed);
      } else {
        this.InitGuidanceExaminerData(this.uiData.searchParameters.guidanceexaminerid);
      }
    } */
  }
  private InitGuidanceExaminerData(guidanceExaminer: string) {
    this.examinerService.getGuidanceExaminerDetails(guidanceExaminer)
      .subscribe(data => {
        this.verification.VerificationData().guidance = data['Guidance'];
        this.verification.SaveState();
        this.verification.VerificationData().examiner = data['Examiner'];
        this.verification.SaveState();
        this.verification.VerificationData().examinerVerifyDetails = data['ExaminerVerifyDetails'];
        this.verification.SaveState();
        this.router.navigate(['verification']);
      });
  }
  private InitExaminerData(examiner: string, moed: number) {
    this.examinerService.getExaminerDetails(examiner, moed)
      .subscribe(data => {
        this.verification.VerificationData().examiner = data['Examiner'];
        this.verification.SaveState();
        this.verification.VerificationData().examinerVerifyDetails = data['ExaminerVerifyDetails'];
        this.verification.SaveState();
        this.verification.VerificationData().examinerSocialInsurance = data['ExaminerSocialInsurance'];
        this.verification.SaveState();
        this.router.navigate(['verification']);
      });
  }
  Decode(param: Params): void {
    let result: string;
    result = '';
    this.common.Decode(param)
      .subscribe(data => {
        result = data['res'];
        this.Navigate(result);
      });
  }
  /*   Encode() {
      this.common.Encode('examinerId=e74f6dee99fd4cc79d45095b56215db8&moed=68')
        .subscribe(data => { console.log(data['res']); });
    } */
}
