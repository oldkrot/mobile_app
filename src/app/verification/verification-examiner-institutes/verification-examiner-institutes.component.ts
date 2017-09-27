import {
  Component,
  OnInit,
  Injectable,
  Inject,
  ViewChild
} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import {
  BroadcasterService,
  UiDataService,
  CommonDataService,
  ExaminerDataService,
  VerificationDataService,
  ValidateService
} from './../../services';
import { VerificationNavigationService } from './../verification-navigation.service';
import { ValidateVerificationDataService } from './../validate-verification-data.service';
import { TS } from 'typescript-linq';
import {
  UiData,
  VerificationData,
  ExaminerInstitutes,
  KeyValuePair,
  IKeyValuePair,
  Institute
} from './../../help-data';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-verification-examiner-institutes',
  templateUrl: './verification-examiner-institutes.component.html',
  styleUrls: ['./verification-examiner-institutes.component.css']
})
export class VerificationExaminerInstitutesComponent implements OnInit {

  institutes: KeyValuePair[];
  private uiData: UiData;
  private message: any[] = [];
  examinerInstitute: ExaminerInstitutes;
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
    this.examinerInstitute = this.verification.VerificationData().examinerInstitute;
  }

  ngOnInit() {
    this.uiData.currentVerificationScreen = 5;
    this.common.getInsitutes()
      .subscribe(data => this.institutes = data,
      error => this.message = <any>error,
      () => this.completeFn());
    this.examinerData.getExaminerInstitutes(this.verification.VerificationData().examiner.ExaminerId)
      .subscribe(
      result => this.examinerInstitute = <ExaminerInstitutes>result,
      error => this.message = <any>error,
      () => this.completeFn()
      );
  }
  completeFn(): void {
    /*     if  (this.examinerInstitute !== null && this.examinerInstitute !== undefined) {

        } */
    return;
  }
  changeModel() {
    this.examinerInstitute.isChanged = true;
  }
  private RemoveEmptyData(): void {
    let enumerator: TS.Linq.Enumerator<Institute>;
    enumerator = new TS.Linq.Enumerator<Institute>(this.examinerInstitute.Institutes);
    let query_result: Institute[];
    query_result = enumerator.where(item => this.validator.IsNullOrEmpty(item.IMOHCode)
      || item.StartDate === undefined).toArray();
    if (query_result.length > 0) {
      for (let i = 0; i < query_result.length; i++) {
        let element: Institute;
        element = query_result[i];
        let index: number;
        index = this.examinerInstitute.Institutes.indexOf(element, 0);
        if (index > -1) {
          this.examinerInstitute.Institutes.splice(index, 1);
        }
      }
    }
  }
  navigate(data: number) {
    if (data === 0) {
      // Help window
    } else {
      let is_coninue: boolean;
      is_coninue = true;
      if (this.examinerInstitute.isChanged) {
        this.RemoveEmptyData();
        is_coninue = this.ValidateData();
      }
      if (is_coninue) {
        this.verification.VerificationData().examinerInstitute = this.examinerInstitute;
        this.broadcaster.broadcast('savestate');
        const base = 'verification'; // this.route.routeConfig.path;
        this.navigation.navigate(data, base);
      }
    }

  }
  private ValidateEmptyData(): boolean {
    let result: boolean;
    result = true;
    let enumerator: TS.Linq.Enumerator<Institute>;
    enumerator = new TS.Linq.Enumerator<Institute>(this.examinerInstitute.Institutes);
    let query_result: Institute[];
    query_result = enumerator.where(item => this.validator.IsNullOrEmpty(item.IMOHCode)
      || item.StartDate === undefined).toArray();
    if (query_result.length > 0) {
      // TODO message 'נא למלא תאריך תחילת עבודה'
      result = false;
    }
    return result;
  }
  private ValidateData(): boolean {
    let result: boolean;
    result = true;
    let validate_result: string;
    validate_result = this.verificationValidator.ValidateExaminerInstitutes(this.examinerInstitute);
    if (!this.validator.IsNullOrEmpty(validate_result)) {
      // TODO show message
      result = false;
    }
    return result;
  }
  onContentReady($event) {
    $event.component.columnOption('command:edit', {
      visibleIndex: -1,
      width: 80
    });
  }

  onCellPrepared($event) {
    if ($event.rowType === 'data' && $event.column.command === 'edit') {
      // tslint:disable-next-line:prefer-const
      let isEditing = $event.row.isEditing,
        // tslint:disable-next-line:prefer-const
        $links = $event.cellElement.find('.dx-link');

      $links.text('');

      if (isEditing) {
        $links.filter('.dx-link-save').addClass('dx-icon-save');
        $links.filter('.dx-link-cancel').addClass('dx-icon-revert');
      } else {
        $links.filter('.dx-link-edit').addClass('dx-icon-edit');
        $links.filter('.dx-link-delete').addClass('dx-icon-trash');
      }
    }
  }
}
