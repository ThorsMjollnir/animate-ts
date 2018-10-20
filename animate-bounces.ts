/**
 * !!!READ CAREFULLY!!!
 * In this library code is written in a way to be compiled in AOT mode.
 * Even slight changes may result in error on the build stage
 */

import {animate, keyframes, style, transition} from '@angular/animations';
import {ANIMATION_DURATION, BOUNCE_OFFSET, BOUNCE_START_FRAME_OFFSET, TRANSLATE_OFFSET} from './animate.config';
import {AnmAxis, StyleTokens} from './types';

type AnimateBounceConfigReq = Readonly<{
  translateOffset: string,
  bounceOffset: string,
  duration: number,
  bounceFrameOffset: number
}>;

export type AnimateBounceConfig = {[K in keyof AnimateBounceConfigReq]?: AnimateBounceConfigReq[K]};

export class AnimateBounce {

  static inUp(expr: string, config?: AnimateBounceConfig) {
    return AnimateBounce.bounceInFactory(expr, 'Y', false, config);
  }

  static inDown(expr: string, config?: AnimateBounceConfig) {
    return AnimateBounce.bounceInFactory(expr, 'Y', true, config);
  }

  static inLeft(expr: string, config?: AnimateBounceConfig) {
    return AnimateBounce.bounceInFactory(expr, 'X', true, config);
  }

  static inRight(expr: string, config?: AnimateBounceConfig) {
    return AnimateBounce.bounceInFactory(expr, 'X', false, config);
  }

  static outUp(expr: string, config?: AnimateBounceConfig) {
    return AnimateBounce.bounceOutFactory(expr, 'Y', false, config);
  }

  static outDown(expr: string, config?: AnimateBounceConfig) {
    return AnimateBounce.bounceOutFactory(expr, 'Y', true, config);
  }

  static outLeft(expr: string, config?: AnimateBounceConfig) {
    return AnimateBounce.bounceOutFactory(expr, 'X', true, config);
  }

  static outRight(expr: string, config?: AnimateBounceConfig) {
    return AnimateBounce.bounceOutFactory(expr, 'X', false, config);
  }

  private static bounceInFactory(expr: string, axis: string, translateOffsetNegative: boolean, config?: AnimateBounceConfig) {
    return AnimateBounce.transitionFactory(expr,
      {
        transform: 'translate' + axis + '(' + (translateOffsetNegative ? '-' : '') + AnimateBounce.configOrDefault(config).translateOffset + ')',
        offset: 0,
        opacity: 0,
      },
      {
        transform: 'translate' + axis + '(' + (translateOffsetNegative ? '' : '-') + AnimateBounce.configOrDefault(config).bounceOffset + ')',
        offset: AnimateBounce.configOrDefault(config).bounceFrameOffset,
        opacity: 1,
      },
      {transform: 'translate(0,0)', offset: 1.0, opacity: 1},
      AnimateBounce.configOrDefault(config).duration
    );
  }

  private static bounceOutFactory(expr: string, axis: AnmAxis, translateOffsetNegative: boolean, config?: AnimateBounceConfig) {
    return AnimateBounce.transitionFactory(expr,
      {transform: 'translate(0,0)', offset: 0, opacity: 1},
      {
        transform: 'translate' + axis + '(' + (translateOffsetNegative ? '-' : '') + AnimateBounce.configOrDefault(config).bounceOffset + ')',
        offset: AnimateBounce.configOrDefault(config).bounceFrameOffset,
        opacity: 1,
      },
      {
        transform: 'translate' + axis + '(' + (translateOffsetNegative ? '' : '-') + AnimateBounce.configOrDefault(config).translateOffset + ')',
        offset: 1.0,
        opacity: 0,
      },
      AnimateBounce.configOrDefault(config).duration
    );
  }

  private static transitionFactory(expr: string, from: StyleTokens, middle: StyleTokens, to: StyleTokens, duration: number) {
    return transition(expr, [animate(duration, keyframes([style(from), style(middle), style(to)]))]);
  }

  private static configOrDefault(config?: AnimateBounceConfig): AnimateBounceConfigReq {
    return {
      bounceOffset: config && config.bounceOffset ? config.bounceOffset : BOUNCE_OFFSET,
      duration: config && config.duration ? config.duration : ANIMATION_DURATION,
      translateOffset: config && config.translateOffset ? config.translateOffset : TRANSLATE_OFFSET,
      bounceFrameOffset: config && config.bounceFrameOffset ? config.bounceFrameOffset : BOUNCE_START_FRAME_OFFSET
    };
  }

}
