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
    private editUserService: EditUserService) { }

  @Input() isEditing: boolean = false;

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


  ngOnChanges(changes: SimpleChanges) {
    if (changes['isEditing'].currentValue) {
      this.formGroup.patchValue({
        "email": this.editUserService.getUser()?.email,
        "passwordGroup": {
          "password": this.editUserService.getUser()?.password,
          "confirmPassword": this.editUserService.getUser()?.password,
        },
        "nickname": this.editUserService.getUser()?.nickname,
        "phoneNumber": this.editUserService.getUser()?.phoneNumber,
        "website": this.editUserService.getUser()?.website,
        "agreement": true
      })
    }
  }

  getSubmittedFields(): User {
    return {
      email: this.formGroup.value.email,
      password: this.formGroup.value.passwordGroup?.password,
      nickname: this.formGroup.value.nickname,
      phoneNumber: this.formGroup.value.phoneNumber,
      website: this.formGroup.value.website,
    };
  }

  onSubmit() {
    if (this.formGroup.valid) {
      if (this.isEditing) {
        this.editUserService.editUser(this.getSubmittedFields());
        this.editUserService.stopEditing();
      }
      else
        this.usersService.addUser(this.getSubmittedFields());

      this.formGroup.reset();
    }
  }

  private traverseGroup(groupPath?: string[]): AbstractControl {
    let group: AbstractControl | null | undefined = this.formGroup;
    groupPath?.forEach(o => group = group?.get(o));

    return group;
  }

  isAlertPermissible(formControlName: string, groupPath?: string[]): boolean {
    let group = this.traverseGroup(groupPath);

    return Boolean(group?.get(formControlName)?.invalid &&
      (group?.get(formControlName)?.touched ||
        !group?.get(formControlName)?.pristine));
  }

  isValid(formControlName: string, groupPath?: string[]): boolean {
    let group = this.traverseGroup(groupPath);
    return Boolean(group?.get(formControlName)?.invalid);
  }

  getAlertOpacity(formControlName: string, groupPath?: string[]): number {
    console.log(Number(this.isAlertPermissible(formControlName, groupPath)) * 100);
    return Number(this.isAlertPermissible(formControlName, groupPath)) * 100;
  }
}