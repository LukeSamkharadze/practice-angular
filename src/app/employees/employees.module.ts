import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { EmployeesComponent } from './employees.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GetComponent } from './update/update.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';



@NgModule({
  declarations: [RegisterComponent, EmployeesComponent, GetComponent, EmployeesListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [EmployeesComponent]
})
export class EmployeesModule { }
