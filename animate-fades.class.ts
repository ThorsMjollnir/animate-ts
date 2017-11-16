import {AnimationTransitionMetadata, transition, animate, keyframes, style} from '@angular/animations';
import {AnimateActionEnum} from './animate-action.enum';
import {ANIMATION_DURATION, FADE_START_OFFSET, ANIMATION_BIG_DURATION, FADE_BIG_START_OFFSET} from './animate.config';

export class AnimateFades {

  static FadeIn = transition(AnimateActionEnum.Hidden + '=>' + AnimateActionEnum.FadeIn, [
    animate(ANIMATION_DURATION, keyframes([
      style({opacity: 0, offset: 0}),
      style({opacity: 1, offset: 1.0})
    ]))
  ]);

  static FadeInUp = transition(AnimateActionEnum.Hidden + '=>' + AnimateActionEnum.FadeInUp, [
    animate(ANIMATION_DURATION, keyframes([
      style({opacity: 0, transform: 'translateY(' + FADE_START_OFFSET + ')', offset: 0}),
      style({opacity: 1, transform: 'translate(0,0)', offset: 1.0})
    ]))
  ]);

  static FadeInUpBig = transition(AnimateActionEnum.Hidden + '=>' + AnimateActionEnum.FadeInUpBig, [
    animate(ANIMATION_BIG_DURATION, keyframes([
      style({opacity: 0, transform: 'translateY(' + FADE_BIG_START_OFFSET + ')', offset: 0}),
      style({opacity: 1, transform: 'translate(0,0)', offset: 1.0})
    ]))
  ]);

  static FadeInDown = transition(AnimateActionEnum.Hidden + '=>' + AnimateActionEnum.FadeInDown, [
    animate(ANIMATION_DURATION, keyframes([
      style({opacity: 0, transform: 'translateY(-' + FADE_START_OFFSET + ')', offset: 0}),
      style({opacity: 1, transform: 'translate(0,0)', offset: 1.0})
    ]))
  ]);

  static FadeInDownBig = transition(AnimateActionEnum.Hidden + '=>' + AnimateActionEnum.FadeInDownBig, [
    animate(ANIMATION_BIG_DURATION, keyframes([
      style({opacity: 0, transform: 'translateY(-' + FADE_BIG_START_OFFSET + ')', offset: 0}),
      style({opacity: 1, transform: 'translate(0,0)', offset: 1.0})
    ]))
  ]);

  static FadeInLeft = transition(AnimateActionEnum.Hidden + '=>' + AnimateActionEnum.FadeInLeft, [
    animate(ANIMATION_DURATION, keyframes([
      style({opacity: 0, transform: 'translateX(-' + FADE_START_OFFSET + ')', offset: 0}),
      style({opacity: 1, transform: 'translate(0,0)', offset: 1.0})
    ]))
  ]);

  static FadeInLeftBig = transition(AnimateActionEnum.Hidden + '=>' + AnimateActionEnum.FadeInLeftBig, [
    animate(ANIMATION_BIG_DURATION, keyframes([
      style({opacity: 0, transform: 'translateX(-' + FADE_BIG_START_OFFSET + ')', offset: 0}),
      style({opacity: 1, transform: 'translate(0,0)', offset: 1.0})
    ]))
  ]);

  static FadeOut = transition(AnimateActionEnum.Visible + '=>' + AnimateActionEnum.FadeOut, [
    animate(ANIMATION_DURATION, keyframes([
      style({opacity: 1, offset: 0}),
      style({opacity: 0, offset: 1.0})
    ]))
  ]);

  static FadeOutLeft = transition(AnimateActionEnum.Visible + '=>' + AnimateActionEnum.FadeOutLeft, [
    animate(ANIMATION_DURATION, keyframes([
      style({opacity: 1, transform: 'translate(0,0)', offset: 0}),
      style({opacity: 0, transform: 'translateX(-' + FADE_START_OFFSET + ')', offset: 1.0})
    ]))
  ]);

  static FadeOutUp = transition(AnimateActionEnum.Visible + '=>' + AnimateActionEnum.FadeOutUp, [
    animate(ANIMATION_DURATION, keyframes([
      style({opacity: 1, transform: 'translate(0,0)', offset: 0}),
      style({opacity: 0, transform: 'translateY(-' + FADE_START_OFFSET + ')', offset: 1.0})
    ]))
  ]);

  static FadeOutUpBig = transition(AnimateActionEnum.Visible + '=>' + AnimateActionEnum.FadeOutUpBig, [
    animate(ANIMATION_DURATION, keyframes([
      style({opacity: 1, transform: 'translate(0,0)', offset: 0}),
      style({opacity: 0, transform: 'translateY(-' + FADE_BIG_START_OFFSET + ')', offset: 1.0})
    ]))
  ]);

  static FadeOutDown = transition(AnimateActionEnum.Visible + '=>' + AnimateActionEnum.FadeOutDown, [
    animate(ANIMATION_DURATION, keyframes([
      style({opacity: 1, transform: 'translate(0,0)', offset: 0}),
      style({opacity: 0, transform: 'translateY(' + FADE_START_OFFSET + ')', offset: 1.0})
    ]))
  ]);

  static FadeOutDownBig = transition(AnimateActionEnum.Visible + '=>' + AnimateActionEnum.FadeOutDownBig, [
    animate(ANIMATION_BIG_DURATION, keyframes([
      style({opacity: 1, transform: 'translate(0,0)', offset: 0}),
      style({opacity: 0, transform: 'translateY(' + FADE_BIG_START_OFFSET + ')', offset: 1.0})
    ]))
  ]);

  static FadeOutLeftBig = transition(AnimateActionEnum.Visible + '=>' + AnimateActionEnum.FadeOutLeftBig, [
    animate(ANIMATION_BIG_DURATION, keyframes([
      style({opacity: 1, transform: 'translate(0,0)', offset: 0}),
      style({opacity: 0, transform: 'translateX(-' + FADE_BIG_START_OFFSET + ')', offset: 1.0})
    ]))
  ]);

  static FadeInRight = transition(AnimateActionEnum.Hidden + '=>' + AnimateActionEnum.FadeInRight, [
    animate(ANIMATION_DURATION, keyframes([
      style({opacity: 0, transform: 'translateX(' + FADE_START_OFFSET + ')', offset: 0}),
      style({opacity: 1, transform: 'translate(0,0)', offset: 1.0})
    ]))
  ]);

  static FadeInRightBig = transition(AnimateActionEnum.Hidden + '=>' + AnimateActionEnum.FadeInRightBig, [
    animate(ANIMATION_BIG_DURATION, keyframes([
      style({opacity: 0, transform: 'translateX(' + FADE_BIG_START_OFFSET + ')', offset: 0}),
      style({opacity: 1, transform: 'translate(0,0)', offset: 1.0})
    ]))
  ]);

  static FadeOutRight = transition(AnimateActionEnum.Visible + '=>' + AnimateActionEnum.FadeOutRight, [
    animate(ANIMATION_DURATION, keyframes([
      style({opacity: 1, transform: 'translate(0,0)', offset: 0}),
      style({opacity: 0, transform: 'translateX(' + FADE_START_OFFSET + ')', offset: 1.0})
    ]))
  ]);

  static FadeOutRightBig = transition(AnimateActionEnum.Visible + '=>' + AnimateActionEnum.FadeOutRightBig, [
    animate(ANIMATION_BIG_DURATION, keyframes([
      style({opacity: 1, transform: 'translate(0,0)', offset: 0}),
      style({opacity: 0, transform: 'translateX(' + FADE_BIG_START_OFFSET + ')', offset: 1.0})
    ]))
  ]);
}
