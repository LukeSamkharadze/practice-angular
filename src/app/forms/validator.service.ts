import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  email(fromControl: FormControl): ValidationErrors | null {
    return Validators.pattern("^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$")(fromControl);
  }

  password(formControl: FormControl): ValidationErrors | null {
    return Validators.pattern("[a-zA-Z0-9]{8,}")(formControl);
  }

  confirmedPassword(abstractControl: AbstractControl): ValidationErrors | null {
    if (abstractControl.get("password")?.value === abstractControl.get("confirmPassword")?.value)
      return null;
    return { confirmPassword: true }
  }

  nickname(formControl: FormControl): ValidationErrors | null {
    return Validators.pattern("[a-zA-Z0-9-]+")(formControl);
  }

  phoneNumber(formControl: FormControl): ValidationErrors | null {
    return Validators.pattern("\\+380[0-9]{9}")(formControl)
  }

  website(formControl: FormControl): ValidationErrors | null {
    return Validators.pattern("(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]+\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,})")(formControl);
  }

  constructor() { }
}
