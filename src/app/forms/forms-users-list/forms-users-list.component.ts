import { Component } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-forms-users-list',
  templateUrl: './forms-users-list.component.html',
  styleUrls: ['./forms-users-list.component.scss']
})
export class FormsUsersListComponent {
  constructor(public usersService: UsersService) { }
}