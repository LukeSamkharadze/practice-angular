import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeesService } from '../../../services/employees.service';
import { Employee } from '../../../models/employee';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  isLoading = false;

  form: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    salary: new FormControl("", [Validators.required, Validators.min(0)]),
    age: new FormControl("", [Validators.required, Validators.min(0)])
  })

  constructor(private employeesService: EmployeesService) { }

  onSubmit() {
    if (this.form.valid) {
      this.isLoading = true;
      this.employeesService.register(this.form.value as Employee).subscribe(
        o => window.alert("SUCCESSFULLY REGISTERED"),
        err => window.alert("SOMETHING WENT WRONG"),
        () => this.isLoading = false);
    }
  }

}
