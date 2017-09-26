

import { Component, OnInit } from '@angular/core';
import { Injectable, Inject, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import {
  BroadcasterService,
  UiDataService,
  CommonDataService,
  ExaminerDataService,
  VerificationDataService
} from './../../services';
import { VerificationNavigationService } from './../verification-navigation.service';
import {
  UiData,
  VerificationData,
  ExaminerInstitutes,
  KeyValuePair,
  IKeyValuePair
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
    private navigation: VerificationNavigationService) {
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
  navigate(data: number) {
    const base = 'verification'; // this.route.routeConfig.path;
    this.navigation.navigate(data, base);
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
