import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class EditUserService {
  private user: User | undefined;
  public isEditing: boolean = false;

  startEditing(user: User) {
    this.isEditing = true;
    this.user = user;
  }

  stopEditing() {
    this.isEditing = false;
    this.user = undefined;
  }

  editUser(updatedUserInfo: User) {
    let key: keyof User;
    if (this.user)
      for (key in updatedUserInfo)
        this.user[key] = updatedUserInfo[key];
  }

  getUser(): User | undefined {
    return this.user;
  }
}
