import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { EmployeesComponent } from './employees.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GetComponent } from './update/update.component';
import { EmployeesListComponent } from './list/list.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [RegisterComponent, EmployeesComponent, GetComponent, EmployeesListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [EmployeesComponent]
})
export class EmployeesModule { }
