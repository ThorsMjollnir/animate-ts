import {AnimationTransitionMetadata, transition, animate, keyframes, style} from '@angular/animations';
import {AnimateActionEnum} from './animate-action.enum';
import {ANIMATION_DURATION, FADE_START_OFFSET, ANIMATION_BIG_DURATION, FADE_BIG_START_OFFSET} from './animate.config';

export class AnimateFades {

  static FadeIn = AnimateFades.fadeFactory('void =>' + AnimateActionEnum.FadeIn,
    {opacity: 0, offset: 0}, {opacity: 1, offset: 1.0}, ANIMATION_DURATION);

  static FadeInUp = AnimateFades.fadeInFactory(AnimateActionEnum.FadeInUp, 'Y', false, false);

  static FadeInUpBig = AnimateFades.fadeInFactory(AnimateActionEnum.FadeInUpBig, 'Y', false, true);

  static FadeInRight = AnimateFades.fadeInFactory(AnimateActionEnum.FadeInRight, 'X', false, false);

  static FadeInRightBig = AnimateFades.fadeInFactory(AnimateActionEnum.FadeInRightBig, 'X', false, true);

  static FadeInDown = AnimateFades.fadeInFactory(AnimateActionEnum.FadeInDown, 'Y', true, false);

  static FadeInDownBig = AnimateFades.fadeInFactory(AnimateActionEnum.FadeInDownBig, 'Y', true, true);

  static FadeInLeft = AnimateFades.fadeInFactory(AnimateActionEnum.FadeInLeft, 'X', true, false);

  static FadeInLeftBig = AnimateFades.fadeInFactory(AnimateActionEnum.FadeInLeftBig, 'X', true, true);

  static FadeOut = AnimateFades.fadeFactory('void =>' + AnimateActionEnum.FadeOut,
    {opacity: 1, offset: 0}, {opacity: 0, offset: 1.0}, ANIMATION_DURATION);

  static FadeOutUp = AnimateFades.fadeOutFactory(AnimateActionEnum.FadeOutUp, 'Y', true, false);

  static FadeOutUpBig = AnimateFades.fadeOutFactory(AnimateActionEnum.FadeOutUp, 'Y', true, true);

  static FadeOutDown = AnimateFades.fadeOutFactory(AnimateActionEnum.FadeOutDown, 'Y', false, false);

  static FadeOutDownBig = AnimateFades.fadeOutFactory(AnimateActionEnum.FadeOutDownBig, 'Y', false, true);

  static FadeOutLeft = AnimateFades.fadeOutFactory(AnimateActionEnum.FadeOutLeft, 'X', true, false);

  static FadeOutLeftBig = AnimateFades.fadeOutFactory(AnimateActionEnum.FadeOutLeftBig, 'X', true, true);

  static FadeOutRight = AnimateFades.fadeOutFactory(AnimateActionEnum.FadeOutRight, 'X', false, false);

  static FadeOutRightBig = AnimateFades.fadeOutFactory(AnimateActionEnum.FadeOutRightBig, 'X', false, true);

  private static fadeInFactory(animation: AnimateActionEnum, axis: string, translateOffsetNegative: boolean,
                               translateOffsetBig: boolean) {
    return AnimateFades.fadeFactory(
      '*=>' + animation,
      {
        opacity: 0,
        transform: 'translate' + axis + '(' + (translateOffsetNegative ? '-' : '') +
        (translateOffsetBig ? FADE_BIG_START_OFFSET : FADE_START_OFFSET) + ')',
        offset: 0
      },
      {opacity: 1, transform: 'translate(0,0)', offset: 1.0},
      translateOffsetBig ? ANIMATION_BIG_DURATION : ANIMATION_DURATION
    );
  }

  private static fadeOutFactory(animation: AnimateActionEnum, axis: string, translateOffsetNegative: boolean,
                                translateOffsetBig: boolean) {
    return AnimateFades.fadeFactory(
      '*=>' + animation,
      {opacity: 1, transform: 'translate(0,0)', offset: 0},
      {
        opacity: 0,
        transform: 'translate' + axis + '(' + (translateOffsetNegative ? '-' : '') +
        (translateOffsetBig ? FADE_BIG_START_OFFSET : FADE_START_OFFSET) + ')',
        offset: 1.0
      },
      translateOffsetBig ? ANIMATION_BIG_DURATION : ANIMATION_DURATION
    );
  }

  private static fadeFactory(expr: string, from: any, to: any, animationDuration: number) {
    return transition(expr, [animate(animationDuration, keyframes([style(from), style(to)]))]);
  }

}
