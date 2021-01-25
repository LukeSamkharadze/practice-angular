import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public users: User[] = [
    {
      email: "samkharadze@mail.ru",
      password: "123456789",
      nickname: "averagewhale",
      phoneNumber: "+380123456789",
      website: "www.odnoklasniki.com"
    },
    {
      email: "lsamk19@gmail.com",
      password: "123456789123456789",
      nickname: "luke",
      phoneNumber: "+380987654321",
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
