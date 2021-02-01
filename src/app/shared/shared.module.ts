import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingCircleComponent } from './loading-circle/loading-circle.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ConfirmPopupComponent } from './confirm-popup/confirm-popup.component';


@NgModule({
  declarations: [LoadingCircleComponent, ConfirmPopupComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  exports: [
    LoadingCircleComponent,
    ConfirmPopupComponent
  ]
})
export class SharedModule { }
