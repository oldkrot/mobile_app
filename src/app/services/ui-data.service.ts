import { IStateOperations } from './../help-data/interfaces/istate-operations';
import { Injectable, Inject, OnDestroy } from '@angular/core';
import { BroadcasterService } from './broadcaster.service';
import { UiData } from './../help-data/ui-data';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class UiDataService implements IStateOperations, OnDestroy {

  private localData: UiData;
  private subscription: Subscription;
  constructor(private broadcaster: BroadcasterService) {
    this.localData = new UiData();
    this.Register();
  }
  Register() {
    this.subscription = this.broadcaster.on('savestate')
      .subscribe(message => {
        this.SaveState();
      });
  }

  SaveState() {
    if (this.localData.guid !== undefined && this.localData.guid.length > 0) {
      sessionStorage.uiData = JSON.stringify(this.localData); // angular.toJson(this.service);
    }
  }
  RestoreState() {
    if (sessionStorage.uiData !== undefined && this.localData.guid.length === 0) {
      this.localData = JSON.parse(sessionStorage.uiData); // angular.fromJson(sessionStorage.uiData);
    }
  }
  /*   On() {
      this.broadcaster.on('savestate');
      {
        this.SaveState();
      }
    } */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  uiData(): UiData {
    if (sessionStorage.uiData) {
      this.RestoreState();
    }
    return this.localData;
  }
}
