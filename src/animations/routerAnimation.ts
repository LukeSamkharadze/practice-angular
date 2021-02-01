import { trigger, transition, style, query, animateChild, animate, group } from "@angular/animations";

export let routerAnimation = trigger('routeAnimations', [
  transition('* => *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [
      style({ left: '-100%' })
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('700ms ease-out', style({ left: '100%' }))
      ]),
      query(':enter', [
        animate('700ms ease-out', style({ left: '0%' }))
      ])
    ]),
    query(':enter', animateChild()),
  ])
]);