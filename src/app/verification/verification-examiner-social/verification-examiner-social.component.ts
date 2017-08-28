
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';


import { UiData } from './../../help-data/ui-data';
import { BroadcasterService } from './../../services/broadcaster.service';
import { VerificationDataService } from './../../services/verification-data.service';
import { CommonDataService } from './../../services/common-data.service';
import { UiDataService } from './../../services/ui-data.service';
import { VerificationData } from './../../help-data/verifcation-data/verification-data';
import { LoadImageDataDirective } from './../../directives/load-image-data.directive';


import { ExaminerSocialInsurance } from './../../help-data/verifcation-data/examiner-social-insurance';
import { Subscription } from 'rxjs/Subscription';
import { VerificationNavigationService } from './../verification-navigation.service';

@Component({
  selector: 'app-verification-examiner-social',
  templateUrl: './verification-examiner-social.component.html',
  styleUrls: ['./verification-examiner-social.component.css']
})
export class VerificationExaminerSocialComponent implements OnInit, OnDestroy {
  private uiData: UiData;
  examinerSocialInsurance: ExaminerSocialInsurance;
  private subscription: Subscription;
  constructor(private uiDataService: UiDataService,
    private verification: VerificationDataService,
    private broadcaster: BroadcasterService,
    private router: Router,
    private route: ActivatedRoute,
    private navigation: VerificationNavigationService) {
    this.uiData = this.uiDataService.uiData();
    this.examinerSocialInsurance = this.verification.VerificationData().examinerSocialInsurance;
    this.Register();
  }
  Register() {
    this.subscription = this.broadcaster.on('loadsocialimage')
      .subscribe(message => {
        this.examinerSocialInsurance.isChanged = true;
        this.examinerSocialInsurance.ImageData.extension = 'jpeg';
        this.examinerSocialInsurance.ImageData.data = <string>message;
      });
  }
  changeModel() {
    this.examinerSocialInsurance.isChanged = true;
  }
  showLabel(data: number): boolean {
    // tslint:disable-next-line:prefer-const
    let res: boolean;
    res = false;
    switch (data) {
      case 0:
        res = this.examinerSocialInsurance.IsSocialSecurityCoordination === true;
        break;
      case 1:
        res = this.examinerSocialInsurance.IsSocialSecurityCoordination === false;
        break;
      case 2:
        res = this.examinerSocialInsurance.IsSocialSecurityCoordination === true && this.examinerSocialInsurance.isChanged === true;
        break;
      default:
        break;
    }
    return res;
  }
  checked(): boolean {
    return this.examinerSocialInsurance.IsSocialSecurityCoordination;
  }
  disabled(): boolean {
    return (this.examinerSocialInsurance.IsSocialSecurityCoordination === true && this.examinerSocialInsurance.isChanged === false);
  }
  changeData($event) {
    this.examinerSocialInsurance.IsSocialSecurityCoordination = !this.examinerSocialInsurance.IsSocialSecurityCoordination;
    this.changeModel();
  }
  ngOnInit() {
    this.uiData.currentVerificationScreen = 7;
    this.examinerSocialInsurance.IsSocialSecurityCoordination = false;
    this.examinerSocialInsurance.isChanged = false;
  }
  change($event) {

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  navigate(data: number) {
    if (data === 0) {
      // Modal
    } else {
      let is_continue: boolean;
      is_continue = false;
      is_continue = this.ValidateData();
      if (is_continue === true) {
        // const base: string = this.route.routeConfig.path;
        const base = 'verification'; // this.route.routeConfig.path;
        this.navigation.navigate(data, base);
      }
    }
  }
  private ValidateData(): boolean {
    // tslint:disable-next-line:prefer-const
    let result: boolean;
    if (this.examinerSocialInsurance.isChanged === true) {
      if (this.examinerSocialInsurance.IsSocialSecurityCoordination === true) {
        if (this.examinerSocialInsurance.ImageData == null) {
          result = false;
        } else {
          if (this.examinerSocialInsurance.ImageData.data.length === 0) {
            result = false;
          } else {
            result = true;
          }
        }
      } else {
        result = true;
      }
    } else {
      result = true;
    }
    return result;
  }
}
