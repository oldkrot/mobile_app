import { ImageData } from './../image-data';

export interface IExaminer {
  SexId: number;
  BirthDate: string;
  IdentityCard: string;
  FirstName: string;
  LastName: string;
  ExaminerId: number;
  isChanged: boolean;
  ImageData: ImageData;
}
export class Examiner implements IExaminer {
  SexId: number;
  BirthDate: string;
  IdentityCard: string;
  FirstName: string;
  LastName: string;
  ExaminerId: number;
  isChanged: boolean;
  ImageData: ImageData;
  constructor() {
    this.ImageData = new ImageData();
  }
}
