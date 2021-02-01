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
      password: "123",
      nickname: "luke",
      phoneNumber: "+380987654321",
      website: "www.facebook.com"
    },
    {
      email: "lsamk19@gmail.com",
      password: "123",
      nickname: "luke",
      phoneNumber: "+380987654321",
      website: "www.facebook.com"
    },
    {
      email: "lsamk19@gmail.com",
      password: "123",
      nickname: "luke",
      phoneNumber: "+380987654321",
      website: "www.facebook.com"
    },
    {
      email: "lsamk19@gmail.com",
      password: "123",
      nickname: "luke",
      phoneNumber: "+380987654321",
      website: "www.facebook.com"
    },
    {
      email: "lsamk19@gmail.com",
      password: "123",
      nickname: "luke",
      phoneNumber: "+380987654321",
      website: "www.facebook.com"
    },
    {
      email: "lsamk19@gmail.com",
      password: "123",
      nickname: "luke",
      phoneNumber: "+380987654321",
      website: "www.facebook.com"
    },
    {
      email: "lsamk19@gmail.com",
      password: "123",
      nickname: "luke",
      phoneNumber: "+380987654321",
      website: "www.facebook.com"
    },
    {
      email: "1",
      password: "1",
      nickname: "NoobMaster69",
      phoneNumber: "+380987654321",
      website: "www.facebook.com"
    }
  ]

  private loggedInUser: User | undefined;

  addUser(user: User) {
    this.users.push(user);
  }

  removeUser(email: string) {
    this.users = this.users.filter(o => o.email !== email);
  }

  getLoggedInUser() {
    return this.loggedInUser;
  }

  logOut() {
    this.loggedInUser = undefined;
  }

  logIn(email: string, password: string) {
    let matchedUserWithMail = this.users.find(o => o.email === email);
    if (password && matchedUserWithMail?.password === password) {
      this.loggedInUser = matchedUserWithMail;
      return true;
    }

    return false;
  }
}
