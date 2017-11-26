import {state, style} from '@angular/animations';

export class AnimateStatic {
  static visible(expr: string) {
    return state(expr, style({opacity: 1}));
  }
  static hidden(expr: string) {
    return state(expr, style({opacity: 0}));
  }
}
