import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isWrong = false;
  email: string = "";
  password: string = "";

  constructor(private usersService: UsersService, private router: Router) { }

  onSubmit() {
    this.isWrong = !this.usersService.logIn(this.email, this.password);
    if(!this.isWrong)
    {
      this.router.navigate([""])
    }
  }
}
