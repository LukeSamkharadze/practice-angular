import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersManagmentModule } from './users-managment/users-managment.module';
import { CurrencyConverterComponent } from './curreny-converter/currency-converter.component';
import { CurrencyConverterModule } from './curreny-converter/currency-converter.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    UsersManagmentModule,
    CurrencyConverterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
