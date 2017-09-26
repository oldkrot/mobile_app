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
  VerificationData,
  ExaminerAddress,
  KeyValuePair,
  IKeyValuePair,
  UiData
} from './../../help-data';


import { Observable } from 'rxjs/Observable';
import { MdAutocompleteTrigger } from '@angular/material';
import * as Rx from 'rxjs/Rx';

@Component({
  selector: 'app-verification-examiner-address',
  templateUrl: './verification-examiner-address.component.html',
  styleUrls: ['./verification-examiner-address.component.css']
})
export class VerificationExaminerAddressComponent implements OnInit {
  cities: KeyValuePair[];
  selectedValue: KeyValuePair;
  myControl: FormControl;
  private uiData: UiData;
  private message: any[] = [];
  examinerAddress: ExaminerAddress;
  filteredCities: Observable<KeyValuePair[]>;
  constructor(private uiDataService: UiDataService,
    private common: CommonDataService,
    private verification: VerificationDataService,
    private broadcaster: BroadcasterService,
    private examinerData: ExaminerDataService,
    private router: Router,
    private route: ActivatedRoute,
    private navigation: VerificationNavigationService) {
    this.uiData = this.uiDataService.uiData();
    this.examinerAddress = this.verification.VerificationData().examinerAddress;
    this.selectedValue = new KeyValuePair();
    this.cities = new Array<KeyValuePair>();
    this.myControl = new FormControl();
  }

  ngOnInit() {
    this.uiData.currentVerificationScreen = 2;
    this.filteredCities = this.myControl.valueChanges
      .startWith(null)
      .map(val => val ? this.filterCity(val) : this.cities.slice());
    this.common.getCities()
      .subscribe(data => this.cities = data,
      error => this.message = <any>error,
      () => this.completeFn(this.examinerAddress));

    this.examinerData.getExaminerAddress(this.verification.VerificationData().examiner.ExaminerId)
      .subscribe(
      result => this.examinerAddress = <ExaminerAddress>result,
      error => this.message = <any>error,
      () => this.completeFn(this.examinerAddress)
      );
  }
  completeFn(value: ExaminerAddress): void {
    if (value !== null && value !== undefined) {
      // tslint:disable-next-line:prefer-const
      let selectedCity: KeyValuePair = this.cities.find(c => c.Code === value.tCityId);
      if (selectedCity !== null && selectedCity !== undefined) {
        this.selectedValue = selectedCity;
        this.filterCity(selectedCity.Name);
      }
      this.displayFn(this.selectedValue);
      this.examinerAddress.isChanged = false;
    }
  }
  inputChange(val: any) {
    if (typeof (val) === 'object') {
      // tslint:disable-next-line:prefer-const
      let city: KeyValuePair = this.cities.find(c => c.Code === (<IKeyValuePair>val).Code);
      if (city && typeof city === 'object') {
        this.selectedValue = city;
        if (this.selectedValue.Code !== this.examinerAddress.tCityId) {
          this.examinerAddress.tCityId = this.selectedValue.Code;
          this.changeModel();
        }
      }
    }
  }

  filterCity(val): KeyValuePair[] {
    if (typeof (val) === 'string') {
      return this.cities.filter(option => new RegExp(val, 'gi').test(option.Name));
    }
    if (typeof (val) === 'object') {
      // this.autoComplete.closePanel();
      //   this.is_after_closing = true;
      this.inputChange(val);
      this.displayFn(val);
      return val ? this.cities.filter(c => c.Code === (<KeyValuePair>val).Code) : this.cities;
    }
    return [];
  }
  displayFn(city: KeyValuePair): string {
    if (city !== null && city !== undefined && this.examinerAddress !== null && this.examinerAddress !== undefined) {
      if (city.Code === this.examinerAddress.tCityId) {
        return city.Name;
      }
    }
    return '';
  }
  changeModel() {
    this.examinerAddress.isChanged = true;
  }
  navigate(data: number) {
    const base = 'verification'; // this.route.routeConfig.path;
    this.navigation.navigate(data, base);
  }
}
