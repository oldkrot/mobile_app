import { ITelephone, Telephone } from './../telephone';
export interface IExaminerTelephone {
  isChanged: boolean;
  Telephones: ITelephone[];
}

export class ExaminerTelephone implements IExaminerTelephone {
  isChanged: boolean;
  Telephones: Telephone[];
  constructor() {
    this.Telephones = new Array<Telephone>();
    this.isChanged = false;
  }
}
