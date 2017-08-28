
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VerificationNavigationService } from './../verification-navigation.service';
import { UiData } from './../../help-data/ui-data';
import {
  BroadcasterService,
  UiDataService,
  CommonDataService,
  ExaminerDataService,
  VerificationDataService,
  ValidateService
} from './../../services/index';
import { Examiner } from './../../help-data/verifcation-data/examiner';

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
    private validator: ValidateService) {
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
    // TODO Remove
    this.uiData.currentVerificationScreen = 1;
    this.examiner.BirthDate = '1957-10-26T00:00:00';
    this.examiner.ExaminerId = 1509;
    this.examiner.FirstName = 'אהרונה';
    this.examiner.IdentityCard = '011514338';
    this.examiner.LastName = 'קורמן -גבריהו';
    this.examiner.SexId = 1;
    this.verification.VerificationData().examiner = this.examiner;
    // ***********************************
    //  this.examiner = this.verification.VerificationData().examiner;

  }
  navigate(data: number) {
    if (data === 0) {
      // help
    } else {
      const base = 'verification'; // this.route.routeConfig.path;
      this.navigation.navigate(data, base);
    }
  }
  changeModel() {
    this.examiner.isChanged = true;
  }
}
