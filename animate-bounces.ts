import {animate, keyframes, style, transition} from '@angular/animations';
import {ANIMATION_DURATION, FADE_BOUNCE_OFFSET, FADE_BOUNCE_START_FRAME_OFFSET, FADE_START_OFFSET} from './animate.config';
import {AnmAxis} from './types';

export class AnimateBounce {

  static inUp(expr: string, translateOffset: string = FADE_START_OFFSET, bounceOffset: string = FADE_BOUNCE_OFFSET, duration: number = ANIMATION_DURATION) {
    return AnimateBounce.bounceInFactory(expr, 'Y', false, translateOffset, bounceOffset, FADE_BOUNCE_START_FRAME_OFFSET, duration);
  }

  static inDown(expr: string, translateOffset: string = FADE_START_OFFSET, bounceOffset: string = FADE_BOUNCE_OFFSET, duration: number = ANIMATION_DURATION) {
    return AnimateBounce.bounceInFactory(expr, 'Y', true, translateOffset, bounceOffset, FADE_BOUNCE_START_FRAME_OFFSET, duration);
  }

  static inLeft(expr: string, translateOffset: string = FADE_START_OFFSET, bounceOffset: string = FADE_BOUNCE_OFFSET, duration: number = ANIMATION_DURATION) {
    return AnimateBounce.bounceInFactory(expr, 'X', true, translateOffset, bounceOffset, FADE_BOUNCE_START_FRAME_OFFSET, duration);
  }

  static inRight(expr: string, translateOffset: string = FADE_START_OFFSET, bounceOffset: string = FADE_BOUNCE_OFFSET, duration: number = ANIMATION_DURATION) {
    return AnimateBounce.bounceInFactory(expr, 'X', false, translateOffset, bounceOffset, FADE_BOUNCE_START_FRAME_OFFSET, duration);
  }

  static outUp(expr: string, translateOffset: string = FADE_START_OFFSET, bounceOffset: string = FADE_BOUNCE_OFFSET, duration: number = ANIMATION_DURATION) {
    return AnimateBounce.bounceOutFactory(expr, 'Y', false, translateOffset, bounceOffset, FADE_BOUNCE_START_FRAME_OFFSET, duration);
  }

  static outDown(expr: string, translateOffset: string = FADE_START_OFFSET, bounceOffset: string = FADE_BOUNCE_OFFSET, duration: number = ANIMATION_DURATION) {
    return AnimateBounce.bounceOutFactory(expr, 'Y', true, translateOffset, bounceOffset, FADE_BOUNCE_START_FRAME_OFFSET, duration);
  }

  static outLeft(expr: string, translateOffset: string = FADE_START_OFFSET, bounceOffset: string = FADE_BOUNCE_OFFSET, duration: number = ANIMATION_DURATION) {
    return AnimateBounce.bounceOutFactory(expr, 'X', true, translateOffset, bounceOffset, FADE_BOUNCE_START_FRAME_OFFSET, duration);
  }

  static outRight(expr: string, translateOffset: string = FADE_START_OFFSET, bounceOffset: string = FADE_BOUNCE_OFFSET, duration: number = ANIMATION_DURATION) {
    return AnimateBounce.bounceOutFactory(expr, 'X', false, translateOffset, bounceOffset, FADE_BOUNCE_START_FRAME_OFFSET, duration);
  }

  private static bounceInFactory(expr: string, axis: string, translateOffsetNegative: boolean,
                                 translateOffset: string = FADE_START_OFFSET,
                                 bounceOffset: string = FADE_BOUNCE_OFFSET,
                                 bounceFrameOffset: number = FADE_BOUNCE_START_FRAME_OFFSET,
                                 duration: number) {
    return AnimateBounce.transitionFactory(expr,
      {
        opacity: 0,
        transform: 'translate' + axis + '(' + (translateOffsetNegative ? '-' : '') + translateOffset + ')',
        offset: 0
      },
      {
        opacity: 1,
        transform: 'translate' + axis + '(' + (translateOffsetNegative ? '-' : '') + bounceOffset + ')',
        offset: bounceFrameOffset
      },
      {opacity: 1, transform: 'translate(0,0)', offset: 1.0},
      duration
    );
  }

  private static bounceOutFactory(expr: string, axis: AnmAxis, translateOffsetNegative: boolean,
                                  translateOffset: string = FADE_START_OFFSET,
                                  bounceOffset: string = FADE_BOUNCE_OFFSET,
                                  bounceFrameOffset: number = FADE_BOUNCE_START_FRAME_OFFSET,
                                  duration: number = ANIMATION_DURATION) {
    return AnimateBounce.transitionFactory(expr,
      {opacity: 1, transform: 'translate(0,0)', offset: 0},
      {
        opacity: 1,
        transform: 'translate' + axis + '(' + (translateOffsetNegative ? '-' : '') + bounceOffset + ')',
        offset: bounceFrameOffset
      },
      {
        opacity: 0,
        transform: 'translate' + axis + '(' + (translateOffsetNegative ? '-' : '') + translateOffset + ')',
        offset: 1.0
      },
      duration
    );
  }

  private static transitionFactory(expr: string, from: any, middle: any, to: any, duration: number) {
    return transition(expr, [animate(duration, keyframes([style(from), style(middle), style(to)]))]);
  }

}
