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

function configOrDefault(config?: AnimateFadeConfig): AnimateFadeConfigReq {
  const cf = config || {};
  return {
    duration: cf.duration || ANIMATION_DURATION
  };
}

function configMotionOrDefault(config?: AnimateFadeMotionConfig): AnimationFadeMotionReq {
  const cf = config || {};
  return {
    duration: cf.duration || ANIMATION_DURATION,
    translateOffset: cf.translateOffset || TRANSLATE_OFFSET
  };
}

export class AnimateFade {

  static fadeIn(expr: string, config?: AnimateFadeConfig) {
    return AnimateFade.transitionFactory(expr, {opacity: 0, offset: 0}, {opacity: 1, offset: 1.0},
      configOrDefault(config).duration);
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
      configOrDefault(config).duration);
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
    const cf = configMotionOrDefault(config);
    return AnimateFade.transitionFactory(expr,
      {
        opacity: 0,
        transform: 'translate' + axis + '(' + (translateOffsetNegative ? '-' : '') + cf.translateOffset + ')',
        offset: 0
      },
      {opacity: 1, transform: 'translate(0,0)', offset: 1.0},
      cf.duration
    );
  }

  private static fadeOutFactory(expr: string, axis: AnmAxis, translateOffsetNegative: boolean, config?: AnimateFadeMotionConfig) {
    const cf = configMotionOrDefault(config);
    return AnimateFade.transitionFactory(expr,
      {opacity: 1, transform: 'translate(0,0)', offset: 0},
      {
        opacity: 0,
        transform: 'translate' + axis + '(' + (translateOffsetNegative ? '-' : '') + cf.translateOffset + ')',
        offset: 1.0
      },
      cf.duration
    );
  }

  private static transitionFactory(expr: string, from: StyleTokens, to: StyleTokens, duration: number) {
    return transition(expr, [animate(duration, keyframes([style(from), style(to)]))]);
  }

}
