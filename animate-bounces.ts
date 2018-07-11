import {animate, keyframes, style, transition} from '@angular/animations';
import {ANIMATION_DURATION, BOUNCE_OFFSET, BOUNCE_START_FRAME_OFFSET, TRANSLATE_OFFSET} from './animate.config';
import {AnmAxis, StyleTokens} from './types';

interface AnimateBounceConfigReq {
  readonly translateOffset: string;
  readonly bounceOffset: string;
  readonly duration: number;
  readonly bounceFrameOffset: number;
}

export type AnimateBounceConfig = {[K in keyof AnimateBounceConfigReq]?: AnimateBounceConfig[K]};

function configOrDefault(config?: AnimateBounceConfig): AnimateBounceConfigReq {
  const cf: AnimateBounceConfig = config || {};
  return {
    bounceOffset: cf.bounceOffset || BOUNCE_OFFSET,
    duration: cf.duration || ANIMATION_DURATION,
    translateOffset: cf.translateOffset || TRANSLATE_OFFSET,
    bounceFrameOffset: cf.bounceFrameOffset || BOUNCE_START_FRAME_OFFSET
  };
}

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
    const cf = configOrDefault(config);
    return AnimateBounce.transitionFactory(expr,
      {
        transform: 'translate' + axis + '(' + (translateOffsetNegative ? '-' : '') + cf.translateOffset + ')',
        offset: 0,
        opacity: 0,
      },
      {
        transform: 'translate' + axis + '(' + (translateOffsetNegative ? '' : '-') + cf.bounceOffset + ')',
        offset: cf.bounceFrameOffset,
        opacity: 1,
      },
      {transform: 'translate(0,0)', offset: 1.0, opacity: 1},
      cf.duration
    );
  }

  private static bounceOutFactory(expr: string, axis: AnmAxis, translateOffsetNegative: boolean, config?: AnimateBounceConfig) {
    const cf = configOrDefault(config);
    return AnimateBounce.transitionFactory(expr,
      {transform: 'translate(0,0)', offset: 0, opacity: 1},
      {
        transform: 'translate' + axis + '(' + (translateOffsetNegative ? '-' : '') + cf.bounceOffset + ')',
        offset: cf.bounceFrameOffset,
        opacity: 1,
      },
      {
        transform: 'translate' + axis + '(' + (translateOffsetNegative ? '' : '-') + cf.translateOffset + ')',
        offset: 1.0,
        opacity: 0,
      },
      cf.duration
    );
  }

  private static transitionFactory(expr: string, from: StyleTokens, middle: StyleTokens, to: StyleTokens, duration: number) {
    return transition(expr, [animate(duration, keyframes([style(from), style(middle), style(to)]))]);
  }

}
