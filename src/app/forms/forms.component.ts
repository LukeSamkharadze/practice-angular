import { Component } from '@angular/core';

type ComponentType = "register" | "list";

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {
  current: ComponentType = "register";
}
