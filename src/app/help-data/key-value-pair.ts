export interface IKeyValuePair {
  Code: number;
  Name: string;
}
export class KeyValuePair implements IKeyValuePair {
  Code: number;
  Name: string;
  constructor() {
    this.Name = '';
  }
}

