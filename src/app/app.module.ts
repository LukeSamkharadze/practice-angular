import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormsComponent } from './forms/forms.component';
import { FormsRegisterComponent } from './forms/forms-register/forms-register.component';
import { FormsUsersListComponent } from './forms/forms-users-list/forms-users-list.component';
import { FormsEditComponent } from './forms/forms-edit/forms-edit.component';
import { FormsRemoveComponent } from './forms/forms-remove/forms-remove.component';

@NgModule({
  declarations: [
    AppComponent,
    FormsComponent,
    FormsRegisterComponent,
    FormsUsersListComponent,
    FormsEditComponent,
    FormsRemoveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
