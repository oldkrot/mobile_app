import { ImageData } from './../image-data';
export interface IExaminerSocialInsurance {
   isChanged: boolean;
   IsSocialSecurityCoordination: boolean;
   ImageData: ImageData;
}

export class ExaminerSocialInsurance implements IExaminerSocialInsurance {
   isChanged: boolean;
   IsSocialSecurityCoordination: boolean;
   ImageData: ImageData;
   constructor() {
      this.ImageData = new ImageData();
      this.isChanged = false;
      this.IsSocialSecurityCoordination = false;
   }
}
