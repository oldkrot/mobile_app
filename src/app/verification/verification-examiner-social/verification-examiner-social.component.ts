import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  BroadcasterService,
  VerificationDataService,
  CommonDataService,
  UiDataService,
  ValidateService
} from './../../services';

import {
  UiData,
  ExaminerSocialInsurance,
  VerificationData
} from './../../help-data';

import { LoadImageDataDirective } from './../../directives/load-image-data.directive';
import { Subscription } from 'rxjs/Subscription';
import { VerificationNavigationService } from './../verification-navigation.service';
import { ValidateVerificationDataService } from './../validate-verification-data.service';
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
    private navigation: VerificationNavigationService,
    private validator: ValidateService,
    private verificationValidator: ValidateVerificationDataService) {
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
      is_continue = true;
      if (this.examinerSocialInsurance.isChanged) {
        is_continue = this.ValidateData();
      }
      if (is_continue) {
        this.verification.VerificationData().examinerSocialInsurance = this.examinerSocialInsurance;
        this.broadcaster.broadcast('savestate');
        const base = 'verification'; // this.route.routeConfig.path;
        this.navigation.navigate(data, base);
      }
    }
  }
  private ValidateData(): boolean {
    let result: boolean;
    result = true;
    let validate_result: string;
    validate_result = this.verificationValidator.ValidateExaminerocialInsurance(this.examinerSocialInsurance);
    if (!this.validator.IsNullOrEmpty(validate_result)) {
      // todo show message
      result = false;
    }
    /*     // tslint:disable-next-line:prefer-const
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
      } */
    return result;
  }
}
