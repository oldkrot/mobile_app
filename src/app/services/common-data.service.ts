


import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UiData } from './../help-data/ui-data';
import { UiDataService } from './ui-data.service';
import { Injectable } from '@angular/core';
// import { Http, Response, RequestOptionsArgs, BaseRequestOptions, ConnectionBackend } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { IKeyValuePair } from './../help-data/key-value-pair';
import { IBranch } from './../help-data/branch';
import { Params } from '@angular/router';

@Injectable()
export class CommonDataService {

  private uiData: UiData;
  private headers: HttpHeaders;
  constructor(// private http: Http,
    private uiDataService: UiDataService,
    private httpClient: HttpClient) {
    this.uiData = this.uiDataService.uiData();
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    this.headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
  }


  getCities(): Observable<IKeyValuePair[]> {
    return this.httpClient.get(this.uiData.serverIP + '/CommonData/11', { headers: this.headers })
      .catch(this.handleError);
  }
  getBanks(): Observable<any> {
    return this.httpClient.get(this.uiData.serverIP + '/CommonData/7', { headers: this.headers })
      .catch(this.handleError);
  }
  getTelephoneType(): Observable<IKeyValuePair[]> {
    return this.httpClient.get(this.uiData.serverIP + '/CommonData/46', { headers: this.headers })
      .catch(this.handleError);
  }
  getBranches(): Observable<any> {
    return this.httpClient.get(this.uiData.serverIP + '/CommonData/8', { headers: this.headers })
      .catch(this.handleError);
  }
  getInsitutes(): Observable<IKeyValuePair[]> {
    return this.httpClient.get(this.uiData.serverIP + '/CommonData/21', { headers: this.headers })
      .catch(this.handleError);
  }
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json || 'Server Error');
  }
  Decode(param: Params): any {
    return this.httpClient.post(this.uiData.serverIP + '/AngularDecode',
      { User: param['guidanceexaminerid'], Password: '' },
      { headers: this.headers })
      .catch(this.handleError);
  }
}
