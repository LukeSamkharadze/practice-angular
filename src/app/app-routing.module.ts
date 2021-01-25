import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrencyConverterComponent } from './currency/currency-converter.component';
import { EmployeesComponent } from './employees/employees.component';
import { FormsComponent } from './users/forms.component';

const routes: Routes = [
  { path: 'users-component', component: FormsComponent },
  { path: 'currency-component', component: CurrencyConverterComponent },
  { path: 'employees-component', component: EmployeesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
