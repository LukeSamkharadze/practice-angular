import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss'],
  animations: [
    trigger("appear", [
      transition(":enter", [
        style({
          transform: "translateY(-100%)",
          opacity: 0
        }),
        animate("300ms ease-out", style({
          transform: "",
          opacity: 1
        }))
      ])
    ])
  ]
})
export class ConfirmPopupComponent {
  @Output() confirmClicked = new EventEmitter();
  @Output() cancelClicked = new EventEmitter();
}
