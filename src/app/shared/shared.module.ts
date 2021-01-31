import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingCircleComponent } from './loading-circle/loading-circle.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


@NgModule({
  declarations: [LoadingCircleComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  exports: [LoadingCircleComponent]
})
export class SharedModule { }
