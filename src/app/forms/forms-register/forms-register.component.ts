import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forms-register',
  templateUrl: './forms-register.component.html',
  styleUrls: ['./forms-register.component.scss']
})
export class FormsRegisterComponent {
  formGroup = new FormGroup({
    email: new FormControl(""),
    passwordGroup: new FormGroup({
      password: new FormControl(""),
      confirmPassword: new FormControl("")
    }),
    nickname: new FormControl(""),
    phoneNumber: new FormControl(""),
    website: new FormControl(""),
    agreement: new FormControl(""),
  });

  constructor() { }
}