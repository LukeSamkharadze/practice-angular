import { Component } from '@angular/core';
import { EditUserService } from '../../services/edit-user.service';
import { User } from '../../models/user';

type ComponentType = "register" | "list";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  current: ComponentType = "register";

  constructor(public editUserService: EditUserService) { }

  onUserEditClicked(user: User) {
    this.current = "register";
    this.editUserService.startEditing(user);
  }
}
