export interface IGuidance {
  GuidanceExaminerId: number;
  MoedDesc: string;
  ProfessionDesc: string;
  GuidanceDate: string;
  FromHour: string;
  UntilHour: string;
  GuidancePlaceDesc: string;
  Remark: string;
  GuidanceAddressCityName: string;
  GuidanceAddressStreet: string;
  GuidanceAddressHouse: string;
  GuidanceTelephone: string;
  Questionnaires: string;
  AnswerInSiteId: number;
  UpdateBy: number;
  LastGuidanceExaminerStatus: number;
  ExaminerEmail: string;
  isChanged: boolean;
  Key: string;
}

export class Guidance implements IGuidance {
  GuidanceExaminerId: number;
  MoedDesc: string;
  ProfessionDesc: string;
  GuidanceDate: string;
  FromHour: string;
  UntilHour: string;
  GuidancePlaceDesc: string;
  Remark: string;
  GuidanceAddressCityName: string;
  GuidanceAddressStreet: string;
  GuidanceAddressHouse: string;
  GuidanceTelephone: string;
  Questionnaires: string;
  AnswerInSiteId: number;
  UpdateBy: number;
  LastGuidanceExaminerStatus: number;
  ExaminerEmail: string;
  isChanged: boolean;
  Key: string;
  constructor() {
    this.GuidanceExaminerId = 0;
    this.MoedDesc = '';
    this.ProfessionDesc = '';
    this.GuidanceDate = '';
    this.FromHour = '';
    this.UntilHour = '';
    this.GuidancePlaceDesc = '';
    this.Remark = '';
    this.GuidanceAddressCityName = '';
    this.GuidanceAddressStreet = '';
    this.GuidanceAddressHouse = '';
    this.GuidanceTelephone = '';
    this.Questionnaires = '';
    this.AnswerInSiteId = 0;
    this.UpdateBy = 0;
    this.LastGuidanceExaminerStatus = 0;
    this.ExaminerEmail = '';
    this.isChanged = false;
    this.Key = '';
  }
}
