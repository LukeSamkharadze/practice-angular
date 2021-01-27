import { Component, Input, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { EditUserService } from '../../../services/edit-user.service';
import { User } from '../../../models/user';
import { UsersService } from '../../../services/users.service';
import { ValidatorService } from '../../../services/validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(
    private validatorService: ValidatorService,
    private usersService: UsersService,
    private editUserService: EditUserService) {
    this.form.get("password")?.valueChanges.subscribe(o => this.form.get("confirmPassword")?.updateValueAndValidity());
  }

  @Input() isEditing: boolean = false;

  form: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, this.validatorService.email]),
    password: new FormControl("", [Validators.required, this.validatorService.password]),
    confirmPassword: new FormControl("", [Validators.required, this.validatorService.confirmedPasswordFactory(this)]),
    nickname: new FormControl("", [Validators.required, this.validatorService.nickname]),
    phoneNumber: new FormControl("", [Validators.required, this.validatorService.phoneNumber]),
    website: new FormControl("", [Validators.required, this.validatorService.website]),
    agreement: new FormControl("", [Validators.required]),
  });


  ngOnChanges(changes: SimpleChanges) {
    if (changes['isEditing'].currentValue) {
      this.form.patchValue({
        "email": this.editUserService.getUser()?.email,
        "password": this.editUserService.getUser()?.password,
        "confirmPassword": this.editUserService.getUser()?.password,
        "nickname": this.editUserService.getUser()?.nickname,
        "phoneNumber": this.editUserService.getUser()?.phoneNumber,
        "website": this.editUserService.getUser()?.website,
        "agreement": true
      })
    }
  }

  getSubmittedFields(): User {
    return {
      email: this.form.value.email,
      password: this.form.value.passwordGroup?.password,
      nickname: this.form.value.nickname,
      phoneNumber: this.form.value.phoneNumber,
      website: this.form.value.website,
    };
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.isEditing) {
        this.editUserService.editUser(this.getSubmittedFields());
        this.editUserService.stopEditing();
      }
      else
        this.usersService.addUser(this.getSubmittedFields());

      this.form.reset();
    }
  }

  isAlertPermissible(controlName: string): boolean {
    console.log(this.form);
    return Boolean(this.form.get(controlName)?.invalid && this.form.get(controlName)?.touched);
  }

  isValid(controlName: string, groupPath?: string[]): boolean {
    return Boolean(this.form.get(controlName)?.invalid);
  }
}