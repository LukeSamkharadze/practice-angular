import { Component } from '@angular/core';

type CurrentPageType = "users-managment" | "currency-converter" | "employees";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  current: CurrentPageType = "employees";
}
