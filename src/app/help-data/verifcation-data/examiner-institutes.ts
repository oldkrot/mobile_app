export interface IInstitute {
  Id: number;
  IMOHCode: string;
  Description: string;
  StartDate: Date;
  EndDate: Date;
}
export class Institute implements IInstitute {
  Id: number;
  IMOHCode: string;
  Description: string;
  StartDate: Date;
  EndDate: Date;
}
export interface IExaminerInstitutes {
  isChanged: boolean;
  Institutes: IInstitute[];
}
export class ExaminerInstitutes implements IExaminerInstitutes {
  isChanged: boolean;
  Institutes: IInstitute[];
  constructor() {
    this.isChanged = false;
    this.Institutes = new Array<Institute>();
  }

}
