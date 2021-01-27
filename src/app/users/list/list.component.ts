import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../models/user';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  activeUser: User | null = null;

  @Output() userEditClick = new EventEmitter<User>();

  constructor(public usersService: UsersService, private router: Router) { }

  onUserClicked(user: User) {
    this.activeUser = user;
  }

  onUserEditClicked(user: User) {
    if (user === this.usersService.getLoggedInUser())
      this.userEditClick.emit(user);
    else
      window.alert("You dont have permission to edit other users");
  }

  onUserDeleteClicked(user: User) {
    if (user === this.usersService.getLoggedInUser()) {
      if (window.confirm("Are you sure? This action is irreversible")) {
        this.usersService.logOut();
        this.router.navigate(["/login"]);
        this.usersService.removeUser(user.email);
      }
    }
    else
      window.alert("You dont have permission to edit other users");
  }

  getUserMenuOpacity(user: User): number {
    return Number(this.activeUser === user) * 100;
  }
}