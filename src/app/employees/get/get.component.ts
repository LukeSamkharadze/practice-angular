import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.scss']
})
export class GetComponent {

  form = new FormGroup({
    id: new FormControl('', Validators.required)
  })

  constructor(private employeesService: EmployeesService) { }

  onSubmit() {
    this.employeesService.getSpecificEmployee(this.form.value.id).subscribe(o => console.log("egaa", o))
  }

}
