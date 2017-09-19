
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnInit
} from '@angular/core';
import { Telephone, KeyValuePair } from './../../help-data';
import { CommonDataService } from '../../services';
@Component({
  selector: 'app-verification-telephone-details',
  templateUrl: './verification-telephone-details.component.html',
  styleUrls: ['./verification-telephone-details.component.css']
})
export class VerificationTelephoneDetailsComponent implements OnChanges, OnInit {

  @Input()
  telephone: Telephone;
  model: Telephone;
  @Output()
  telphoneChanged = new EventEmitter();
  telephoneTypes: KeyValuePair[];

  constructor(private common: CommonDataService) {
    this.telephoneTypes = new Array<KeyValuePair>();
  }

  ngOnChanges(): void {
    if (this.telephone) {
      this.model = Telephone.clone(this.telephone);
    }
  }
  ngOnInit() {
    this.common.getTelephoneType()
      .subscribe(data => this.telephoneTypes = <KeyValuePair[]>data['TelephoneTypes'],
      error => console.log(error));
  }
  save(): void {
    Telephone.assign(this.model, this.telephone);
    this.telphoneChanged.emit();
  }
}
