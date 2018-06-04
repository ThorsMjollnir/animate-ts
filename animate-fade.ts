import {animate, keyframes, style, transition} from '@angular/animations';
import {ANIMATION_DURATION, FADE_START_OFFSET} from './animate.config';
import {AnmAxis, StyleTokens} from './types';

export class AnimateFade {

  static fadeIn(expr: string, duration: number = ANIMATION_DURATION) {
    return AnimateFade.transitionFactory(expr, {opacity: 0, offset: 0}, {opacity: 1, offset: 1.0}, duration);
  }

  static inUp(expr: string, translateOffset: string = FADE_START_OFFSET, duration: number = ANIMATION_DURATION) {
    return AnimateFade.fadeInFactory(expr, 'Y', false, translateOffset, duration);
  }

  static inRight(expr: string, translateOffset: string = FADE_START_OFFSET, duration: number = ANIMATION_DURATION) {
    return AnimateFade.fadeInFactory(expr, 'X', false, translateOffset, duration);
  }

  static inDown(expr: string, translateOffset: string = FADE_START_OFFSET, duration: number = ANIMATION_DURATION) {
    return AnimateFade.fadeInFactory(expr, 'Y', true, translateOffset, duration);
  }

  static inLeft(expr: string, translateOffset: string = FADE_START_OFFSET, duration: number = ANIMATION_DURATION) {
    return AnimateFade.fadeInFactory(expr, 'X', true, translateOffset, duration);
  }

  static fadeOut(expr: string, duration: number = ANIMATION_DURATION) {
    return AnimateFade.transitionFactory(expr, {opacity: 1, offset: 0}, {opacity: 0, offset: 1.0}, duration);
  }

  static outUp(expr: string, translateOffset: string = FADE_START_OFFSET, duration: number = ANIMATION_DURATION) {
    return AnimateFade.fadeOutFactory(expr, 'Y', true, translateOffset, duration);
  }

  static outDown(expr: string, translateOffset: string = FADE_START_OFFSET, duration: number = ANIMATION_DURATION) {
    return AnimateFade.fadeOutFactory(expr, 'Y', false, translateOffset, duration);
  }

  static outLeft(expr: string, translateOffset: string = FADE_START_OFFSET, duration: number = ANIMATION_DURATION) {
    return AnimateFade.fadeOutFactory(expr, 'X', true, translateOffset, duration);
  }

  static outRight(expr: string, translateOffset: string = FADE_START_OFFSET, duration: number = ANIMATION_DURATION) {
    return AnimateFade.fadeOutFactory(expr, 'X', false, translateOffset, duration);
  }

  private static fadeInFactory(expr: string, axis: string, translateOffsetNegative: boolean,
                               translateOffset: string, duration: number) {
    return AnimateFade.transitionFactory(expr,
      {
        opacity: 0,
        transform: 'translate' + axis + '(' + (translateOffsetNegative ? '-' : '') + translateOffset + ')',
        offset: 0
      },
      {opacity: 1, transform: 'translate(0,0)', offset: 1.0},
      duration
    );
  }

  private static fadeOutFactory(expr: string, axis: AnmAxis, translateOffsetNegative: boolean,
                                translateOffset: string = FADE_START_OFFSET,
                                duration: number = ANIMATION_DURATION) {
    return AnimateFade.transitionFactory(expr,
      {opacity: 1, transform: 'translate(0,0)', offset: 0},
      {
        opacity: 0,
        transform: 'translate' + axis + '(' + (translateOffsetNegative ? '-' : '') + translateOffset + ')',
        offset: 1.0
      },
      duration
    );
  }

  private static transitionFactory(expr: string, from: StyleTokens, to: StyleTokens, duration: number) {
    return transition(expr, [animate(duration, keyframes([style(from), style(to)]))]);
  }

}
