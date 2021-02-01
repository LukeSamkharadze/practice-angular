import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { RegisterComponent } from 'src/app/users/register/register.component';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  email(fromControl: AbstractControl) {
    return Validators.pattern("^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$")(fromControl);
  }

  password(control: AbstractControl) {
    return Validators.pattern("[a-zA-Z0-9]{8,}")(control);
  }

  confirmedPasswordFactory(registerComponent: RegisterComponent) {
    return (control: AbstractControl) => {
      if (registerComponent.form?.get("password")?.value === registerComponent.form?.get("confirmPassword")?.value)
        return null;
      return { confirmPassword: true }
    }
  }

  nickname(control: AbstractControl) {
    return Validators.pattern("[a-zA-Z0-9-]+")(control);
  }

  phoneNumber(control: AbstractControl) {
    return Validators.pattern("\\+380[0-9]{9}")(control)
  }

  website(control: AbstractControl) {
    return Validators.pattern("(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]+\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,})")(control);
  }
}