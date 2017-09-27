export interface IExaminerAddress {
   isChanged: boolean;
   tCityId: number;
   HouseNumber: string;
   Email: string;
   Entrance: string;
   Street: string;
   AppartmentNumber: number;
   Postbox: number;
   ZipCode: number;
   addressID: number;
   fk_ID: number;
}

export class ExaminerAddress implements IExaminerAddress {
   isChanged: boolean;
   tCityId: number;
   HouseNumber: string;
   Email: string;
   Entrance: string;
   Street: string;
   AppartmentNumber: number;
   Postbox: number;
   ZipCode: number;
   addressID: number;
   fk_ID: number;
   constructor() {
      this.isChanged = false;
      this.tCityId = 0;
      this.HouseNumber = '';
      this.Email = '';
      this.Entrance = '';
      this.Street = '';
   }
}
