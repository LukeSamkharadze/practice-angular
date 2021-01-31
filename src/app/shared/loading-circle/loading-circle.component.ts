import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-circle',
  templateUrl: './loading-circle.component.html',
  styleUrls: ['./loading-circle.component.scss'],
  animations: [
    trigger("rotate", [
      state("start", style({
        transform: "rotate(0)"
      })),

      state("end", style({
        transform: "rotate(360deg)"
      })),

      transition('start => end', [
        animate('1s cubic-bezier(.25,.63,.73,.39)')
      ]),
    ])
  ]
})
export class LoadingCircleComponent {
  state = "start";

  onRotateDone(e: AnimationEvent) {
    this.state = e.toState === "start" ? "end" : "start";
  }
}
