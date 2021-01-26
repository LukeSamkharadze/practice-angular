import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/models/employee';

type SelectedComponent = "register" | "update" | "employees";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {

  currentComponent: SelectedComponent = "employees";
  editingEmployee: Employee | undefined;

  constructor() { }

  onEditClick(employee: Employee)
  {
    this.editingEmployee = employee; 
    this.currentComponent = 'update';
  }

}
