import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { EmployeesComponent } from './employees.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GetComponent } from './get/get.component';



@NgModule({
  declarations: [RegisterComponent, EmployeesComponent, GetComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [EmployeesComponent]
})
export class EmployeesModule { }
