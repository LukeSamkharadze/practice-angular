import { Component, Input, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { EditUserService } from '../edit-user.service';
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
    private usersService: UsersService,
    private userEditService: EditUserService) { }

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
        "email": this.userEditService.getUser()?.email,
        "passwordGroup": {
          "password": this.userEditService.getUser()?.password,
          "confirmPassword": this.userEditService.getUser()?.password,
        },
        "nickname": this.userEditService.getUser()?.nickname,
        "phoneNumber": this.userEditService.getUser()?.phoneNumber,
        "website": this.userEditService.getUser()?.website,
        "agreement": true
      })
    }
  }

  onSubmit() {
    if (this.formGroup.valid) {
      let editingUser = this.userEditService.getUser();
      if (this.isEditing && editingUser !== undefined) {

        [editingUser.email,
        editingUser.password,
        editingUser.nickname,
        editingUser.phoneNumber,
        editingUser.website,
        ] = [
            this.formGroup.value.email,
            this.formGroup.value.passwordGroup?.password,
            this.formGroup.value.nickname,
            this.formGroup.value.phoneNumber,
            this.formGroup.value.website
          ];

        this.userEditService.stopEditing();
      }
      else
        this.usersService.addUser({
          email: this.formGroup.value.email,
          password: this.formGroup.value.passwordGroup?.password,
          nickname: this.formGroup.value.nickname,
          phoneNumber: this.formGroup.value.phoneNumber,
          website: this.formGroup.value.website,
        });

      this.formGroup.reset();
    }
  }

  isAlertPermissible(formControlName: string, groupPath?: string[]): boolean {
    let group: AbstractControl | null | undefined = this.formGroup;
    groupPath?.forEach(o => group = group?.get(o));

    return Boolean(group?.get(formControlName)?.invalid &&
      (group?.get(formControlName)?.touched ||
        !group?.get(formControlName)?.pristine));
  }
  getAlertOpacity(formControlName: string, groupPath?: string[]): number {
    console.log(Number(this.isAlertPermissible(formControlName, groupPath)) * 100);
    return Number(this.isAlertPermissible(formControlName, groupPath)) * 100;
  }
}