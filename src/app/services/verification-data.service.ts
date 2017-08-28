import { UiData } from './../help-data/ui-data';
import { UiDataService } from './ui-data.service';
import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BroadcasterService } from './broadcaster.service';
import { IStateOperations } from './../help-data/interfaces/istate-operations';
import { VerificationData } from './../help-data/verifcation-data/verification-data';

/* import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw'; */
import { Observable } from 'rxjs/Observable';
/* import 'rxjs/operator/delay';
import 'rxjs/operator/mergeMap';
import 'rxjs/operator/switchMap'; */
import { ExaminerAddress } from './../help-data/verifcation-data/examiner-address';
import { Subscription } from 'rxjs/Subscription';


@Injectable()
export class VerificationDataService implements IStateOperations, OnDestroy {
  private localData: VerificationData;

  private uiData: UiData;
  private subscription: Subscription;
  // constructor( @Inject('$rootScope') private $rootScope: any, private broadcaster: BroadcasterService)
  constructor(private broadcaster: BroadcasterService,
    private uiDataService: UiDataService,
    private httpClient: HttpClient
  ) {
    this.localData = new VerificationData();
    this.uiData = this.uiDataService.uiData();
    this.Register();
  }
  SaveState() {
    sessionStorage.VerificationData = JSON.stringify(this.localData); // angular.toJson(this.service);
  }
  RestoreState() {
    this.localData = JSON.parse(sessionStorage.VerificationData); // angular.fromJson(sessionStorage.uiData);
  }
  VerificationData(): VerificationData {
    if (sessionStorage.VerificationData) {
      this.RestoreState();
    }
    return this.localData;
  }
  Register() {
    this.subscription = this.broadcaster.on('savestate')
      .subscribe(message => {
        this.SaveState();
      });
    // this.broadcaster.on('savestate'); {
    //    this.SaveState();
    //  }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
