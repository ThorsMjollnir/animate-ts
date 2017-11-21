import {animate, keyframes, style, transition} from '@angular/animations';
import {ANIMATION_DURATION, FADE_START_OFFSET} from './animate.config';

export class AnimateFades {

  static fadeIn(expr: string, duration: number) {
    return AnimateFades.fadeFactory(expr, {opacity: 0, offset: 0}, {opacity: 1, offset: 1.0}, duration);
  }

  static fadeInUp(expr: string, translateOffset: string, duration: number) {
    return AnimateFades.fadeInFactory(expr, 'Y', false, translateOffset, duration);
  }

  static fadeInRight(expr: string, translateOffset: string, duration: number) {
    return AnimateFades.fadeInFactory(expr, 'X', false, translateOffset, duration);
  }

  static fadeInDown(expr: string, translateOffset: string, duration: number) {
    return AnimateFades.fadeInFactory(expr, 'Y', true, translateOffset, duration);
  }

  static fadeInLeft(expr: string, translateOffset: string, duration: number) {
    return AnimateFades.fadeInFactory(expr, 'X', true, translateOffset, duration);
  }

  static fadeOut(expr: string, duration: number) {
    return AnimateFades.fadeFactory(expr, {opacity: 1, offset: 0}, {opacity: 0, offset: 1.0}, duration);
  }

  static fadeOutUp(expr: string, translateOffset: string, duration: number) {
    return AnimateFades.fadeOutFactory(expr, 'Y', true, translateOffset, duration);
  }

  static fadeOutDown(expr: string, translateOffset: string, duration: number) {
    return AnimateFades.fadeOutFactory(expr, 'Y', false, translateOffset, duration);
  }

  static fadeOutLeft(expr: string, translateOffset: string, duration: number) {
    return AnimateFades.fadeOutFactory(expr, 'X', true, translateOffset, duration);
  }

  static fadeOutRight(expr: string, translateOffset: string, duration: number) {
    return AnimateFades.fadeOutFactory(expr, 'X', false, translateOffset, duration);
  }

  private static fadeInFactory(expr: string, axis: string, translateOffsetNegative: boolean,
                               translateOffset: string, duration: number) {
    return AnimateFades.fadeFactory(expr,
      {
        opacity: 0,
        transform: 'translate' + axis + '(' + (translateOffsetNegative ? '-' : '') + translateOffset + ')',
        offset: 0
      },
      {opacity: 1, transform: 'translate(0,0)', offset: 1.0},
      duration
    );
  }

  private static fadeOutFactory(expr, axis: string, translateOffsetNegative: boolean,
                                translateOffset: string = FADE_START_OFFSET,
                                duration: number = ANIMATION_DURATION) {
    return AnimateFades.fadeFactory(expr,
      {opacity: 1, transform: 'translate(0,0)', offset: 0},
      {
        opacity: 0,
        transform: 'translate' + axis + '(' + (translateOffsetNegative ? '-' : '') + translateOffset + ')',
        offset: 1.0
      },
      duration
    );
  }

  private static fadeFactory(expr: string, from: any, to: any, duration: number) {
    return transition(expr, [animate(duration, keyframes([style(from), style(to)]))]);
  }

}
