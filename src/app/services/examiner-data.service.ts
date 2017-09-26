import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { UiDataService } from './ui-data.service';
import {
  UiData,
  ExaminerAddress,
  ExaminerBank,
  ExaminerTelephone,
  ExaminerInstitutes
} from './../help-data';

@Injectable()
export class ExaminerDataService {
  private uiData: UiData;
  private headers: HttpHeaders;
  constructor(private uiDataService: UiDataService,
    private httpClient: HttpClient) {
    this.uiData = this.uiDataService.uiData();
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
  }
  getExaminerAddress(examiner: number): Observable<ExaminerAddress> {
    return this.httpClient.get(this.uiData.serverIP + '/ExaminerAddress/' + examiner.toString(), { headers: this.headers })
      .catch(this.handleError);
  }
  getExaminerBank(examiner: number): Observable<ExaminerBank> {
    return this.httpClient.get(this.uiData.serverIP + '/ExaminerBank/' + examiner.toString(), { headers: this.headers })
      .catch(this.handleError);
  }
  getExaminerTelephones(examiner: number): Observable<ExaminerTelephone> {
    return this.httpClient.get(this.uiData.serverIP + '/ExaminerTelephone/' + examiner.toString(), { headers: this.headers })
      .catch(this.handleError);
  }
  getExaminerInstitutes(examiner: number): Observable<ExaminerInstitutes> {
    return this.httpClient.get(this.uiData.serverIP + '/ExaminerInstitutes/' + examiner.toString(), { headers: this.headers })
      .catch(this.handleError);
  }
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json || 'Server Error');
  }
  getExaminerDetails(examiner: string, moed: number): Observable<any> {
    // tslint:disable-next-line:prefer-const
    let RequestData = { Key: examiner, Moed: moed, QuestID: '' };
    return this.httpClient.post(this.uiData.serverIP + '/examinerdetails',
      RequestData,
      { headers: this.headers })
      .catch(this.handleError);
  }
  getGuidanceExaminerDetails(inputData: string): Observable<any> {
    // tslint:disable-next-line:prefer-const
    let data = { key: inputData };
    return this.httpClient.post(this.uiData.serverIP + '/GuidanceExaminerDetails',
      data,
      { headers: this.headers })
      .catch(this.handleError);
  }
}
