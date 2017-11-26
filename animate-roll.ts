import {animate, keyframes, style, transition} from '@angular/animations';
import {ANIMATION_DURATION, FADE_START_OFFSET} from './animate.config';

export class AnimateRoll {

  static inDown(expr: string, duration: number = ANIMATION_DURATION) {
    return AnimateRoll.rollInFactory(expr, duration);
  }

  static outUp(expr: string, duration: number = ANIMATION_DURATION) {
    return AnimateRoll.rollOutFactory(expr, duration);
  }

  private static rollInFactory(expr: string, duration: number) {
    return AnimateRoll.transitionFactory(expr,
      {height: 0},
      {height: '*'},
      duration
    );
  }

  private static rollOutFactory(expr, duration: number = ANIMATION_DURATION) {
    return AnimateRoll.transitionFactory(expr,
      {height: '*'},
      {height: 0},
      duration
    );
  }

  private static transitionFactory(expr: string, from: any, to: any, duration: number) {
    return transition(expr, [animate(duration, keyframes([style(from), style(to)]))]);
  }

}
