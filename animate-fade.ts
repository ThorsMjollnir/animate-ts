/**
 * !!!READ CAREFULLY!!!
 * In this library code is written in a way to be compiled in AOT mode.
 * Even slight changes may result in error on the build stage
 */

import {animate, keyframes, style, transition} from '@angular/animations';
import {ANIMATION_DURATION, TRANSLATE_OFFSET} from './animate.config';
import {AnmAxis, StyleTokens} from './types';

interface AnimateFadeConfigReq {
  readonly duration: number;
}

interface AnimationFadeMotionReq {
  readonly duration: number;
  readonly translateOffset: string;
}

export type AnimateFadeConfig = {[K in keyof AnimateFadeConfigReq]?: AnimateFadeConfigReq[K]};
export type AnimateFadeMotionConfig = {[K in keyof AnimationFadeMotionReq]?: AnimationFadeMotionReq[K]};

export class AnimateFade {

  static fadeIn(expr: string, config?: AnimateFadeConfig) {
    return AnimateFade.transitionFactory(expr, {opacity: 0, offset: 0}, {opacity: 1, offset: 1.0},
      AnimateFade.configOrDefault(config).duration);
  }

  static inUp(expr: string, config?: AnimateFadeMotionConfig) {
    return AnimateFade.fadeInFactory(expr, 'Y', false, config);
  }

  static inRight(expr: string, config?: AnimateFadeMotionConfig) {
    return AnimateFade.fadeInFactory(expr, 'X', false, config);
  }

  static inDown(expr: string, config?: AnimateFadeMotionConfig) {
    return AnimateFade.fadeInFactory(expr, 'Y', true, config);
  }

  static inLeft(expr: string, config?: AnimateFadeMotionConfig) {
    return AnimateFade.fadeInFactory(expr, 'X', true, config);
  }

  static fadeOut(expr: string, config?: AnimateFadeConfig) {
    return AnimateFade.transitionFactory(expr, {opacity: 1, offset: 0}, {opacity: 0, offset: 1.0},
      AnimateFade.configOrDefault(config).duration);
  }

  static outUp(expr: string, config?: AnimateFadeMotionConfig) {
    return AnimateFade.fadeOutFactory(expr, 'Y', true, config);
  }

  static outDown(expr: string, config?: AnimateFadeMotionConfig) {
    return AnimateFade.fadeOutFactory(expr, 'Y', false, config);
  }

  static outLeft(expr: string, config?: AnimateFadeMotionConfig) {
    return AnimateFade.fadeOutFactory(expr, 'X', true, config);
  }

  static outRight(expr: string, config?: AnimateFadeMotionConfig) {
    return AnimateFade.fadeOutFactory(expr, 'X', false, config);
  }

  private static fadeInFactory(expr: string, axis: string, translateOffsetNegative: boolean, config?: AnimateFadeMotionConfig) {
    return AnimateFade.transitionFactory(expr,
      {
        opacity: 0,
        transform: 'translate' + axis + '(' + (translateOffsetNegative ? '-' : '') + AnimateFade.configMotionOrDefault(config).translateOffset + ')',
        offset: 0
      },
      {opacity: 1, transform: 'translate(0,0)', offset: 1.0},
      AnimateFade.configMotionOrDefault(config).duration
    );
  }

  private static fadeOutFactory(expr: string, axis: AnmAxis, translateOffsetNegative: boolean, config?: AnimateFadeMotionConfig) {
    return AnimateFade.transitionFactory(expr,
      {opacity: 1, transform: 'translate(0,0)', offset: 0},
      {
        opacity: 0,
        transform: 'translate' + axis + '(' + (translateOffsetNegative ? '-' : '') + AnimateFade.configMotionOrDefault(config).translateOffset + ')',
        offset: 1.0
      },
      AnimateFade.configMotionOrDefault(config).duration
    );
  }

  private static transitionFactory(expr: string, from: StyleTokens, to: StyleTokens, duration: number) {
    return transition(expr, [animate(duration, keyframes([style(from), style(to)]))]);
  }

  private static configOrDefault(config?: AnimateFadeConfig) {
    return {
      duration: config && config.duration ? config.duration : ANIMATION_DURATION
    };
  }

  private static configMotionOrDefault(config?: AnimateFadeMotionConfig) {
    return {
      duration: config && config.duration ? config.duration : ANIMATION_DURATION,
      translateOffset: config && config.translateOffset ? config.translateOffset : TRANSLATE_OFFSET
    };
  }


}
