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

  getUser(): User | undefined {
    return this.user;
  }
}
