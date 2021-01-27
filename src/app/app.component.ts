import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/services/users.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isNavbarCollapsed = true;

  constructor(private userService: UsersService, private router: Router) { }

  get isLoggedIn() {
    return Boolean(this.userService.getLoggedInUser());
  }

  get loggedInUserName() {
    return this.userService.getLoggedInUser()?.nickname;
  }

  signOutClicked() {
    this.userService.logOut();
    this.router.navigate(["/login"]);
  }

  logInClicked() {
    this.router.navigate(["/login"]);
  }
}