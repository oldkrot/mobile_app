export interface IBranch {
  Code: number;
  Name: string;
  BranchNumber: number;
  BankID: number;
}
export class Branch implements IBranch {
  BranchNumber: number;
  BankID: number;
  Code: number;
  Name: string;
  constructor() {
    this.Name = '';
  }
}
