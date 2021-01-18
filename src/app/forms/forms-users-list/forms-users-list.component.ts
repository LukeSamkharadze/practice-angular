import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-forms-users-list',
  templateUrl: './forms-users-list.component.html',
  styleUrls: ['./forms-users-list.component.scss']
})
export class FormsUsersListComponent {
  activeUser: User | null = null;

  @Output() userEditClick = new EventEmitter<User>();

  constructor(public usersService: UsersService) { }

  onUserClicked(user: User) {
    this.activeUser = user;
  }

  onUserEditClicked(user: User) {
    this.userEditClick.emit(user);
  }

  onUserDeleteClicked(user: User) {
    if (window.confirm("Are you sure? This action is irreversible"))
      this.usersService.removeUser(user.email);
  }

  getUserMenuOpacity(user: User): number {
    return Number(this.activeUser === user) * 100;
  }
}