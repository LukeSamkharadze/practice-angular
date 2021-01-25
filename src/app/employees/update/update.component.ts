import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeesService } from '../employees.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class GetComponent {

  formGet = new FormGroup({
    id: new FormControl('', Validators.required)
  })

  currentlyUpdatingID = "";
  formUpdate = new FormGroup({
    name: new FormControl("", Validators.required),
    salary: new FormControl("", [Validators.required, Validators.min(0)]),
    age: new FormControl("", [Validators.required, Validators.min(0), Validators.max(100)])
  });

  constructor(private employeesService: EmployeesService) { }

  onGetClicked() {
    this.employeesService.getSpecificEmployee(this.formGet.value.id).
      subscribe(
        o => this.handleGetEmployee(o),
        err => this.currentlyUpdatingID = ""
      )
  }

  handleGetEmployee(employee: Employee) {
    console.log(employee);
    this.currentlyUpdatingID = employee.id;
    this.formUpdate.patchValue(employee);
  }

  onDeleteClicked() {
    this.employeesService.deleteEmployee(this.formGet.value.id).
      subscribe(o => console.log("egaa", o))
  }

  onUpdateClicked() {
    this.employeesService.updateEmployee(this.formGet.value.id, this.formUpdate.value).
    subscribe(o => console.log("egaa", o))
  }
}
