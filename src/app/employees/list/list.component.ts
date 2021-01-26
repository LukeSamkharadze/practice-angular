import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeesService } from '../../../services/employees.service';
import { Employee } from '../../../models/employee';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class EmployeesListComponent {
  employees: Employee[] = [];
  currentPageEmployees: Employee[] = [];
  currentEmployeeSelected: Employee | undefined;

  @Output() editClicked = new EventEmitter<Employee>();

  maxEmployeesOnPage = 3;
  currentPage = 0;

  constructor(private employeesService: EmployeesService) {
    this.employeesService.getEmployees().subscribe(o => this.handleEmployees(o));
  }

  handleEmployees(employees: Employee[]) {
    this.employees = employees;
    this.updateCurrentPageEmployees();
  }

  updateCurrentPageEmployees() {
    this.currentPageEmployees = this.employees.slice(this.currentPage * this.maxEmployeesOnPage, (this.currentPage + 1) * this.maxEmployeesOnPage);
    this.currentEmployeeSelected = undefined;
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

  onUserEditClicked(employee: Employee) {
    this.editClicked.emit(employee);
  }

  onUserDeleteClicked(employee: Employee) {
    this.employees = this.employees.filter(o => o !== employee);
    this.currentEmployeeSelected = undefined;
    this.employeesService.deleteEmployee(employee.id).subscribe();
    this.updateCurrentPageEmployees();
  }
}
