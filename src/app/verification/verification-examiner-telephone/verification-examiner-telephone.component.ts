import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  BroadcasterService,
  UiDataService,
  CommonDataService,
  ExaminerDataService,
  VerificationDataService,
  ValidateService
} from './../../services';
import { ValidateVerificationDataService } from './../validate-verification-data.service';
import { TS } from 'typescript-linq';
import {
  UiData,
  ExaminerTelephone,
  Telephone,
  ITelephone,
  KeyValuePair,
  IKeyValuePair
} from './../../help-data';

import { Subscription } from 'rxjs/Subscription';
import { VerificationNavigationService } from './../verification-navigation.service';
import { DxDataGridComponent } from 'devextreme-angular';


@Component({
  selector: 'app-verification-examiner-telephone',
  templateUrl: './verification-examiner-telephone.component.html',
  styleUrls: ['./verification-examiner-telephone.component.css']
})
export class VerificationExaminerTelephoneComponent implements OnInit {
  telephoneTypes: KeyValuePair[];
  examinerTelephone: ExaminerTelephone;
  selectedTelephone: Telephone;
  private uiData: UiData;
  private message: any[] = [];
  dataSource: Telephone[];
  @ViewChild(DxDataGridComponent)
  grid: DxDataGridComponent;

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
    this.examinerTelephone = this.verification.VerificationData().examinerTelephone;
    this.telephoneTypes = new Array<KeyValuePair>();
  }

  ngOnInit() {
    this.uiData.currentVerificationScreen = 3;
    this.common.getTelephoneType()
      .subscribe(data => this.telephoneTypes = <KeyValuePair[]>data['TelephoneTypes'],
      error => console.log(error),
      () => this.completeFn());
    this.examinerData.getExaminerTelephones(this.verification.VerificationData().examiner.ExaminerId)
      .subscribe(
      result => this.examinerTelephone = <ExaminerTelephone>result,
      error => this.message = <any>error,
      () => this.completeFn()
      );
  }
  completeFn() {
    if (this.examinerTelephone !== null && this.examinerTelephone !== undefined) {
      this.dataSource = this.examinerTelephone.Telephones;
      this.examinerTelephone.isChanged = false;
    }
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
  RemoveEmptyData() {
    let enumerator: TS.Linq.Enumerator<Telephone>;
    enumerator = new TS.Linq.Enumerator<Telephone>(this.examinerTelephone.Telephones);
    let query_result: Telephone[];
    query_result = enumerator.where(item => this.validator.IsNullOrEmpty(item._prefix)
      || this.validator.IsNullOrEmpty(item._number)
      || item._telephoneType === undefined).toArray();
    if (query_result.length > 0) {
      for (let i = 0; i < query_result.length; i++) {
        let element: Telephone;
        element = query_result[i];
        let index: number;
        index = this.examinerTelephone.Telephones.indexOf(element, 0);
        if (index > -1) {
          this.examinerTelephone.Telephones.splice(index, 1);
        }
      }
    }
  }
  navigate(data: number) {
    if (data === 0) {
      // help
    } else {
      this.RemoveEmptyData();
      let is_continue: boolean;
      is_continue = true;
      if (this.examinerTelephone.isChanged) {
        let validate_result: string;
        validate_result = this.verificationValidator.ValidateExaminerTelephones(this.examinerTelephone);
        if (!this.validator.IsNullOrEmpty(validate_result)) {
          is_continue = false;
          // TODO message
        }
      }
      if (is_continue) {
        this.verification.VerificationData().examinerTelephone = this.examinerTelephone;
        this.broadcaster.broadcast('savestate');
        const base = 'verification'; // this.route.routeConfig.path;
        this.navigation.navigate(data, base);
      }

    }
  }

  onEdit(gridItem): void {
    this.selectedTelephone = gridItem.data;
  }

  onTelphoneChanged($event): void {
    this.grid.instance.refresh();
  }
  onRowInserted($event): void {
    this.examinerTelephone.isChanged = true;
  }
  onRowUpdated($event): void {
    this.examinerTelephone.isChanged = true;
  }
}
