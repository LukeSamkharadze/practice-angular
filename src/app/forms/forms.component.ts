import { Component } from '@angular/core';
import { EditUserService } from './edit-user.service';
import { User } from './user';

type ComponentType = "register" | "list";

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {
  current: ComponentType = "register";

  constructor(public editUserService: EditUserService) { }

  onUserEditClicked(user: User) {
    this.current = "register";
    this.editUserService.startEditing(user);
  }
}
