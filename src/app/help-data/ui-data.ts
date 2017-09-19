import { QueryStringParams } from './query-string-params';
import { DialogData } from './dialog-data';
export interface IUiData {
  serverIP: string;
  guid: string;
  moedId: number;
  IsLoginView: number;
  IsShowLoader: boolean;
  dialogData: DialogData;
  filterText: string;
  filterMode: number;
  currentVerificationScreen: number;
  currentUserScreen: string;
  IsGuidanceExaminer: boolean;
  IsNeedCheckTransport: boolean;
  IsShowAnswerButtons: boolean;
  searchParameters: QueryStringParams;
}
export class UiData implements IUiData {
  serverIP: string;
  guid: string;
  moedId: number;
  IsLoginView: number;
  IsShowLoader: boolean;
  dialogData: DialogData;
  filterText: string;
  filterMode: number;
  currentVerificationScreen: number;
  currentUserScreen: string;
  IsGuidanceExaminer: boolean;
  IsNeedCheckTransport: boolean;
  IsShowAnswerButtons: boolean;
  searchParameters: QueryStringParams;
  constructor() {
    this.currentUserScreen = '';
    this.serverIP = 'http://localhost/WebAPI/api';
    this.guid = '';
    this.moedId = 0;
    this.IsLoginView = 1;
    this.IsShowLoader = false;
    this.dialogData = new DialogData();
    this.dialogData.dialogText = '';
    this.dialogData.dialogType = 1; // 1-OK 2-Continiue Cancel
    this.dialogData.dialogTitle = 'לתשומת לבך';
    this.dialogData.messageType = 'info'; // warning error,
    this.dialogData.resultButton = 0;
    this.dialogData.dialogShow = false;

    this.filterText = '';
    this.filterMode = 0;
    this.currentVerificationScreen = 1;
    this.currentUserScreen = '';
    this.IsGuidanceExaminer = false;
    this.IsNeedCheckTransport = false;
    this.IsShowAnswerButtons = true;
    this.searchParameters = new QueryStringParams();
  }
}
