import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrencyComponent } from './currency/currency.component';
import { EmployeesComponent } from './employees/employees.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'users-component', component: UsersComponent },
  { path: 'currency-component', component: CurrencyComponent },
  { path: 'employees-component', component: EmployeesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
