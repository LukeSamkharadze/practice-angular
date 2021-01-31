import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeesService } from '../../../services/employees.service';
import { Employee } from '../../../models/employee';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class GetComponent {
  isLoading = false;

  @Input() editingEmployee: Employee | undefined;

  formGet = new FormGroup({
    id: new FormControl("", Validators.required)
  })

  currentlyUpdatingID = -1;
  formUpdate = new FormGroup({
    name: new FormControl("", Validators.required),
    salary: new FormControl("", [Validators.required, Validators.min(0)]),
    age: new FormControl("", [Validators.required, Validators.min(0)])
  });

  constructor(private employeesService: EmployeesService) { }

  onGetClicked() {
    this.isLoading = true;
    this.employeesService.getSpecificEmployee(this.formGet.value.id).
      subscribe(
        o => this.handleGetEmployee(o),
        err => {
          this.currentlyUpdatingID = -1;
          window.alert("SOMETHING WENT WRONG");
        },
        () => this.isLoading = false
      )
  }

  handleGetEmployee(employee: Employee) {
    this.currentlyUpdatingID = employee.id;
    console.log(employee);
    this.formUpdate.patchValue(employee);
    window.alert("SUCCESSFULLY FOUND");
  }

  ngOnChanges() {
    if (this.editingEmployee) {
      this.formGet.patchValue(this.editingEmployee);
      this.currentlyUpdatingID = this.editingEmployee.id;
      this.formUpdate.patchValue(this.editingEmployee);
    }
  }

  onDeleteClicked() {
    this.isLoading = true;
    this.employeesService.deleteEmployee(this.formGet.value.id).
      subscribe(
        o => window.alert("SUCCESSFULLY DELETED"),
        err => window.alert("SOMETHING WENT WRONG"),
        () => this.isLoading = false
      );
    this.formGet.reset();
    this.formUpdate.reset();
    this.currentlyUpdatingID = -1;
  }

  onUpdateClicked() {
    this.isLoading = true;
    this.employeesService.updateEmployee(this.formGet.value.id, this.formUpdate.value).
      subscribe(
        o => window.alert("SUCCESSFULLY UPDATED"),
        err => window.alert("SOMETHING WENT WRONG"),
        () => this.isLoading = false
      );
  }
}
