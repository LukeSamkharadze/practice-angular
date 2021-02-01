import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrencyComponent } from './currency/currency.component';
import { EmployeesComponent } from './employees/employees.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', component: HomeComponent,data: {animation: 'home'} },
  { path: 'login', component: LoginComponent,data: {animation: 'login'} },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard],data: {animation: 'users'} },
  { path: 'currency', component: CurrencyComponent,data: {animation: 'currency'}},
  { path: 'employees', component: EmployeesComponent, data: {animation: 'employees'} },
  { path: '**', component: NotFoundComponent,data: {animation: '**'} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
