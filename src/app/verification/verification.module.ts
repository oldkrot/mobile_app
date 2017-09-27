import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdChipsModule,
  MdCoreModule,
  MdDatepickerModule,
  MdDialogModule,
  MdExpansionModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdNativeDateModule,
  MdPaginatorModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  MdRippleModule,
  MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdSortModule,
  MdTableModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk';
import 'hammerjs';
import { DxDataGridModule, DxButtonModule, DxDateBoxModule } from 'devextreme-angular';

import { VerificationComponent } from './verification.component';
import { VerificationExaminerDetailsComponent } from './verification-examiner-details/verification-examiner-details.component';
import { VerificationExaminerBankComponent } from './verification-examiner-bank/verification-examiner-bank.component';
import { VerificationExaminerAddressComponent } from './verification-examiner-address/verification-examiner-address.component';
import { VerificationNavigationComponent } from './verification-navigation/verification-navigation.component';
import { VerificationExaminerSocialComponent } from './verification-examiner-social/verification-examiner-social.component';
import { VerificationNavigationService } from './verification-navigation.service';
import { ValidateVerificationDataService } from './validate-verification-data.service';
import { VerificationExaminerTelephoneComponent } from './verification-examiner-telephone/verification-examiner-telephone.component';
import { VerificationExaminerInstitutesComponent } from './verification-examiner-institutes/verification-examiner-institutes.component';
import { VerificationTelephoneDetailsComponent } from './verification-telephone-details/verification-telephone-details.component';
import { VerificationVerifyDataComponent } from './verification-verify-data/verification-verify-data.component';

const VerificationRoutes: Routes = [
  {
    path: 'verification',
    component: VerificationComponent,
    children: [{
      path: 'social',
      component: VerificationExaminerSocialComponent
    },
    {
      path: 'address',
      component: VerificationExaminerAddressComponent
    },
    {
      path: 'bank',
      component: VerificationExaminerBankComponent
    },
    {
      path: 'phone',
      component: VerificationExaminerTelephoneComponent
    },
    {
      path: 'institutes',
      component: VerificationExaminerInstitutesComponent
    },

    {
      path: 'verify',
      component: VerificationVerifyDataComponent
    },
    { path: '', redirectTo: 'details', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    CdkTableModule,
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdCoreModule,
    MdDatepickerModule,
    MdDialogModule,
    MdExpansionModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdNativeDateModule,
    MdPaginatorModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdSortModule,
    MdTableModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
    DxDataGridModule,
    DxButtonModule,
    DxDateBoxModule,
    RouterModule.forChild(VerificationRoutes)
  ],
  declarations: [
    VerificationComponent,
    VerificationExaminerDetailsComponent,
    VerificationExaminerSocialComponent,
    VerificationExaminerBankComponent,
    VerificationExaminerAddressComponent,
    VerificationNavigationComponent,
    VerificationExaminerTelephoneComponent,
    VerificationExaminerInstitutesComponent,
    VerificationTelephoneDetailsComponent,
    VerificationVerifyDataComponent],
  exports: [
    VerificationComponent,
    VerificationExaminerDetailsComponent,
    VerificationExaminerBankComponent,
    VerificationExaminerAddressComponent,
    VerificationExaminerSocialComponent,
    VerificationNavigationComponent,
    VerificationExaminerTelephoneComponent,
    VerificationVerifyDataComponent
  ],
  providers: [VerificationNavigationService,
    ValidateVerificationDataService
  ],
  bootstrap: [VerificationComponent]
})
export class VerificationModule { }
