import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss']
})
export class ConfirmPopupComponent {
  @Output() confirmClicked = new EventEmitter();
  @Output() cancelClicked = new EventEmitter();
}
