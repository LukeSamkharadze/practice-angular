import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { isWorker } from 'cluster';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isWrong = false;
  email: string = "";
  password: string = "";

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.isWrong = !this.usersService.logIn(this.email, this.password);
    if(!this.isWrong)
    {
      this.router.navigate([""])
    }
  }
}
