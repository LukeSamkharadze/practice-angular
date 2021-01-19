import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsComponent } from './forms.component';
import { FormsUsersListComponent } from './forms-users-list/forms-users-list.component';
import { FormsRegisterComponent } from './forms-register/forms-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FormsComponent,
    FormsRegisterComponent,
    FormsUsersListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    FormsComponent
  ]
})
export class UsersManagmentModule { }
