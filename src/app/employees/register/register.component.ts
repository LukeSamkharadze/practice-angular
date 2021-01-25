import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { EmployeesService } from '../employees.service';
import { Employee } from '../../../models/employee';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  form: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    salary: new FormControl("", [Validators.required, Validators.min(0)]),
    age: new FormControl("", [Validators.required, Validators.min(0), Validators.max(100)])
  })

  constructor(private employeesService: EmployeesService) { }

  onSubmit() {
    if (this.form.valid)
      this.employeesService.register(this.form.value as Employee).subscribe(
        o => console.log("succ",o),
        err => console.log("err", err));
  }

}
