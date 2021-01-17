import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { ValidatorService } from '../validator.service';

@Component({
  selector: 'app-forms-register',
  templateUrl: './forms-register.component.html',
  styleUrls: ['./forms-register.component.scss']
})
export class FormsRegisterComponent {
  constructor(
    private validatorService: ValidatorService,
    private usersService: UsersService) { }

  formGroup = new FormGroup({
    email: new FormControl("", [Validators.required, this.validatorService.email]),
    passwordGroup: new FormGroup({
      password: new FormControl("", [Validators.required, this.validatorService.password]),
      confirmPassword: new FormControl("", [Validators.required])
    }, [this.validatorService.confirmedPassword]),
    nickname: new FormControl("", [Validators.required, this.validatorService.nickname]),
    phoneNumber: new FormControl("", [Validators.required, this.validatorService.phoneNumber]),
    website: new FormControl("", [Validators.required, this.validatorService.website]),
    agreement: new FormControl("", [Validators.required]),
  });

  onSubmit() {
    if (this.formGroup.valid) {
      this.usersService.addUser({
        email: this.formGroup.value.email,
        password: this.formGroup.value.passwordGroup?.password,
        nickname: this.formGroup.value.nickname,
        phoneNumber: this.formGroup.value.phoneNumber,
        website: this.formGroup.value.website,
      })
    }
  }

  private isAlertPermissible(formControlName: string, groupPath?: string[]): boolean {
    let group: AbstractControl | null | undefined = this.formGroup;
    groupPath?.forEach(o => group = group?.get(o));

    return Boolean(group?.get(formControlName)?.invalid &&
      (group?.get(formControlName)?.touched ||
        !group?.get(formControlName)?.pristine));
  }
  getAlertOpacity(formControlName: string, groupPath?: string[]): number {
    return Number(this.isAlertPermissible(formControlName, groupPath)) * 100;
  }
}