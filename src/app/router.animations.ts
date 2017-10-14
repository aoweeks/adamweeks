import {trigger, animate, style, group, query, transition} from '@angular/animations';


// Page transition: old page exits right, new page enters from the left
const slideRight = [
    query(':enter, :leave', style({ position: 'fixed', width:'100%' })
      , { optional: true }),
    group([
      query(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('500ms cubic-bezier(.75,-0.48,.26,1.52)', style({ transform: 'translateX(0%)' }))
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('500ms cubic-bezier(.75,-0.48,.26,1.52)', style({ transform: 'translateX(100%)' }))
      ], { optional: true }),
    ])
  ];

// Page transition: old page exits left, new page enters from the right
const slideLeft = [
    query(':enter, :leave', style({ position: 'fixed', width:'100%' })
      , { optional: true }),
    group([
      query(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('500ms cubic-bezier(.75,-0.48,.26,1.52)', style({ transform: 'translateX(0%)' }))
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('500ms cubic-bezier(.75,-0.48,.26,1.52)', style({ transform: 'translateX(-100%)' }))
      ], { optional: true }),
    ])
  ];
  
export const routerTransition = trigger('routerTransition', [
  transition('* => about', slideRight),
  transition('about => *', slideLeft),
  transition('* <=> *', slideLeft)
])