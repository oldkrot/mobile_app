import { Router, ActivatedRoute } from '@angular/router';
import { UiData } from './../../help-data/ui-data';

import { Component, OnInit } from '@angular/core';
import { UiDataService } from './../../services/ui-data.service';

@Component({
  selector: 'app-verification-navigation',
  templateUrl: './verification-navigation.component.html',
  styleUrls: ['./verification-navigation.component.css']
})
export class VerificationNavigationComponent implements OnInit {
  private uiData: UiData;
  show: boolean;

  constructor(private uiDataService: UiDataService,
    private router: Router,
    private route: ActivatedRoute) {
    this.uiData = this.uiDataService.uiData();
  }

  ngOnInit() {
    this.uiData.IsGuidanceExaminer = true;
    this.showButton();
  }
  private showButton(): void {
    // tslint:disable-next-line:prefer-const
    if (this.uiData.IsGuidanceExaminer === true) {
      this.show = true;
    } else {
      this.show = false;
    }
  }
  getButtonStyle(value: number): any {
    // tslint:disable-next-line:prefer-const
    let res: string;
    res = '';
    if (this.uiData.currentVerificationScreen === value) {
      res = 'btn-primary outline';
    } else {
      if (this.uiData.currentVerificationScreen > value) {
        res = 'btn-success outline';
      } else {
        res = 'btn-info outline';
      }
    }
    return res;
  }
}
