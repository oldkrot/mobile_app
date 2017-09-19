import { ActivatedRoute, Params } from '@angular/router';
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
    private uiDataService: UiDataService
  ) {
    this.uiData = this.uiDataService.uiData();
  }

  ngOnInit() {
    // tslint:disable-next-line:prefer-const
    let params = this.route.snapshot.queryParams;
    if (params) {
      this.Decode(params);
    }

  }
  Decode(param: Params) {
    this.common.Decode(param)
      .subscribe(data => { });
  }
}
