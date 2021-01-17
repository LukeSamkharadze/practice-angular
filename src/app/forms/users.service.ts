import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public users: User[] = [
    {
      email: "samkharadze",
      password: "aeae",
      nickname: "averagewhale",
      phoneNumber: "595",
      website: "www.odnoklasniki.com"
    },
    {
      email: "lsamk19",
      password: "zd",
      nickname: "luka",
      phoneNumber: "59555555555",
      website: "www.facebook.com"
    }
  ]

  addUser(user: User) {
    this.users.push(user);
  }

  removeUser(email: string) {
    this.users = this.users.filter(o => o.email !== email);
  }
}
