import { Component } from '@angular/core';
import { User } from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-forms-users-list',
  templateUrl: './forms-users-list.component.html',
  styleUrls: ['./forms-users-list.component.scss']
})
export class FormsUsersListComponent {
  activeUser: User | null = null;

  constructor(public usersService: UsersService) { }

  onUserClicked(user: User) {
    this.activeUser = user;
  }
}