import { Component } from '@angular/core';

type CurrentPageType = "users-managment" | "currency-converter";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  current: CurrentPageType = "currency-converter";
}
