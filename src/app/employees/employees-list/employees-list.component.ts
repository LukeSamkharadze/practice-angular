import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../employees.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent  {

  employees: Employee[] = [];

  constructor(private employeesService: EmployeesService ) { 
    this.employeesService.getEmployees().subscribe(o => this.employees = o)
  }
}
