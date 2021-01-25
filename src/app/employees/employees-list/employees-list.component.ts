import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../employees.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent {
  employees: Employee[] = [];
  currentPageEmployees: Employee[] = [];

  maxEmployeesOnPage = 2;
  currentPage = 0;

  constructor(private employeesService: EmployeesService) {
    this.employeesService.getEmployees().subscribe(o => this.handleEmployees(o));
  }

  handleEmployees(employees: Employee[]) {
    this.employees = employees;
    this.updateCurrentPageEmployees();
  }

  updateCurrentPageEmployees() {
    this.currentPageEmployees = this.employees.slice(this.currentPage * this.maxEmployeesOnPage, (this.currentPage + 1) * this.maxEmployeesOnPage)
  }

  leftClicked() {
    if (this.currentPage) {
      this.currentPage--;
      this.updateCurrentPageEmployees();
    }
  }

  rightClicked() {
    this.currentPage++;
    this.updateCurrentPageEmployees();
  }
}
