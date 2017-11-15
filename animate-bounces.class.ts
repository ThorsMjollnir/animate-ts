import {transition, animate, keyframes, style, AnimationTransitionMetadata} from '@angular/animations';
import {AnimateActionEnum} from './animate-action.enum';
import {
  ANIMATION_DURATION, FADE_START_OFFSET, FADE_BOUNCE_OFFSET,
  FADE_BOUNCE_START_FRAME_OFFSET, ANIMATION_BIG_DURATION, FADE_BIG_START_OFFSET
} from './animate.config';

export class AnimateBounces {
  static get animations(): ReadonlyArray<AnimationTransitionMetadata> {
    return [
      transition(AnimateActionEnum.Hidden + '=>' + AnimateActionEnum.BounceInUp, [
        animate(ANIMATION_DURATION, keyframes([
          style({opacity: 0, transform: 'translateY(' + FADE_START_OFFSET + ')', offset: 0}),
          style({
            opacity: 1,
            transform: 'translateY(-' + FADE_BOUNCE_OFFSET + ')',
            offset: FADE_BOUNCE_START_FRAME_OFFSET
          }),
          style({opacity: 1, transform: 'translate(0,0)', offset: 1.0})
        ]))
      ]),

      transition(AnimateActionEnum.Hidden + '=>' + AnimateActionEnum.BounceInUpBig, [
        animate(ANIMATION_BIG_DURATION, keyframes([
          style({opacity: 0, transform: 'translateY(' + FADE_BIG_START_OFFSET + ')', offset: 0}),
          style({
            opacity: 1,
            transform: 'translateY(-' + FADE_BOUNCE_OFFSET + ')',
            offset: FADE_BOUNCE_START_FRAME_OFFSET
          }),
          style({opacity: 1, transform: 'translate(0,0)', offset: 1.0})
        ]))
      ]),

      transition(AnimateActionEnum.Hidden + '=>' + AnimateActionEnum.BounceInDown, [
        animate(ANIMATION_DURATION, keyframes([
          style({opacity: 0, transform: 'translateY(-' + FADE_START_OFFSET + ')', offset: 0}),
          style({
            opacity: 1,
            transform: 'translateY(' + FADE_BOUNCE_OFFSET + ')',
            offset: FADE_BOUNCE_START_FRAME_OFFSET
          }),
          style({opacity: 1, transform: 'translate(0,0)', offset: 1.0})
        ]))
      ]),

      transition(AnimateActionEnum.Hidden + '=>' + AnimateActionEnum.BounceInDownBig, [
        animate(ANIMATION_BIG_DURATION, keyframes([
          style({opacity: 0, transform: 'translateY(-' + FADE_BIG_START_OFFSET + ')', offset: 0}),
          style({
            opacity: 1,
            transform: 'translateY(' + FADE_BOUNCE_OFFSET + ')',
            offset: FADE_BOUNCE_START_FRAME_OFFSET
          }),
          style({opacity: 1, transform: 'translate(0,0)', offset: 1.0})
        ]))
      ]),

      transition(AnimateActionEnum.Hidden + '=>' + AnimateActionEnum.BounceInLeft, [
        animate(ANIMATION_DURATION, keyframes([
          style({opacity: 0, transform: 'translateX(-' + FADE_START_OFFSET + ')', offset: 0}),
          style({
            opacity: 1,
            transform: 'translateX(' + FADE_BOUNCE_OFFSET + ')',
            offset: FADE_BOUNCE_START_FRAME_OFFSET
          }),
          style({opacity: 1, transform: 'translate(0,0)', offset: 1.0})
        ]))
      ]),

      transition(AnimateActionEnum.Hidden + '=>' + AnimateActionEnum.BounceInLeftBig, [
        animate(ANIMATION_BIG_DURATION, keyframes([
          style({opacity: 0, transform: 'translateX(-' + FADE_BIG_START_OFFSET + ')', offset: 0}),
          style({
            opacity: 1,
            transform: 'translateX(' + FADE_BOUNCE_OFFSET + ')',
            offset: FADE_BOUNCE_START_FRAME_OFFSET
          }),
          style({opacity: 1, transform: 'translate(0,0)', offset: 1.0})
        ]))
      ]),

      transition(AnimateActionEnum.Visible + '=>' + AnimateActionEnum.BounceOutLeft, [
        animate(ANIMATION_DURATION, keyframes([
          style({opacity: 1, transform: 'translate(0,0)', offset: 0}),
          style({
            opacity: 1,
            transform: 'translateX(' + FADE_BOUNCE_OFFSET + ')',
            offset: FADE_BOUNCE_START_FRAME_OFFSET
          }),
          style({opacity: 0, transform: 'translateX(-' + FADE_START_OFFSET + ')', offset: 1.0})
        ]))
      ]),

      transition(AnimateActionEnum.Visible + '=>' + AnimateActionEnum.BounceOutUp, [
        animate(ANIMATION_DURATION, keyframes([
          style({opacity: 1, transform: 'translate(0,0)', offset: 0}),
          style({
            opacity: 1,
            transform: 'translateY(' + FADE_BOUNCE_OFFSET + ')',
            offset: FADE_BOUNCE_START_FRAME_OFFSET
          }),
          style({opacity: 0, transform: 'translateY(-' + FADE_START_OFFSET + ')', offset: 1.0})
        ]))
      ]),

      transition(AnimateActionEnum.Visible + '=>' + AnimateActionEnum.BounceOutDown, [
        animate(ANIMATION_DURATION, keyframes([
          style({opacity: 1, transform: 'translate(0,0)', offset: 0}),
          style({
            opacity: 1,
            transform: 'translateY(-' + FADE_BOUNCE_OFFSET + ')',
            offset: FADE_BOUNCE_START_FRAME_OFFSET
          }),
          style({opacity: 0, transform: 'translateY(' + FADE_START_OFFSET + ')', offset: 1.0})
        ]))
      ]),

      transition(AnimateActionEnum.Visible + '=>' + AnimateActionEnum.BounceOutDownBig, [
        animate(ANIMATION_BIG_DURATION, keyframes([
          style({opacity: 1, transform: 'translate(0,0)', offset: 0}),
          style({
            opacity: 1,
            transform: 'translateY(-' + FADE_BOUNCE_OFFSET + ')',
            offset: FADE_BOUNCE_START_FRAME_OFFSET
          }),
          style({opacity: 0, transform: 'translateY(' + FADE_BIG_START_OFFSET + ')', offset: 1.0})
        ]))
      ]),

      transition(AnimateActionEnum.Visible + '=>' + AnimateActionEnum.BounceOutLeftBig, [
        animate(ANIMATION_BIG_DURATION, keyframes([
          style({opacity: 1, transform: 'translate(0,0)', offset: 0}),
          style({
            opacity: 1,
            transform: 'translateX(' + FADE_BOUNCE_OFFSET + ')',
            offset: FADE_BOUNCE_START_FRAME_OFFSET
          }),
          style({opacity: 0, transform: 'translateX(-' + FADE_BIG_START_OFFSET + ')', offset: 1.0})
        ]))
      ]),

      transition(AnimateActionEnum.Hidden + '=>' + AnimateActionEnum.BounceInRight, [
        animate(ANIMATION_DURATION, keyframes([
          style({opacity: 0, transform: 'translateX(' + FADE_START_OFFSET + ')', offset: 0}),
          style({
            opacity: 1,
            transform: 'translateX(-' + FADE_BOUNCE_OFFSET + ')',
            offset: FADE_BOUNCE_START_FRAME_OFFSET
          }),
          style({opacity: 1, transform: 'translate(0,0)', offset: 1.0})
        ]))
      ]),

      transition(AnimateActionEnum.Hidden + '=>' + AnimateActionEnum.BounceInRightBig, [
        animate(ANIMATION_BIG_DURATION, keyframes([
          style({opacity: 0, transform: 'translateX(' + FADE_BIG_START_OFFSET + ')', offset: 0}),
          style({
            opacity: 1,
            transform: 'translateX(-' + FADE_BOUNCE_OFFSET + ')',
            offset: FADE_BOUNCE_START_FRAME_OFFSET
          }),
          style({opacity: 1, transform: 'translate(0,0)', offset: 1.0})
        ]))
      ]),

      transition(AnimateActionEnum.Visible + '=>' + AnimateActionEnum.BounceOutRight, [
        animate(ANIMATION_DURATION, keyframes([
          style({opacity: 1, transform: 'translate(0,0)', offset: 0}),
          style({
            opacity: 1,
            transform: 'translateX(-' + FADE_BOUNCE_OFFSET + ')',
            offset: FADE_BOUNCE_START_FRAME_OFFSET
          }),
          style({opacity: 0, transform: 'translateX(' + FADE_START_OFFSET + ')', offset: 1.0})
        ]))
      ]),

      transition(AnimateActionEnum.Visible + '=>' + AnimateActionEnum.BounceOutRightBig, [
        animate(ANIMATION_BIG_DURATION, keyframes([
          style({opacity: 1, transform: 'translate(0,0)', offset: 0}),
          style({
            opacity: 1,
            transform: 'translateX(-' + FADE_BOUNCE_OFFSET + ')',
            offset: FADE_BOUNCE_START_FRAME_OFFSET
          }),
          style({opacity: 0, transform: 'translateX(' + FADE_BIG_START_OFFSET + ')', offset: 1.0})
        ]))
      ])
    ];
  }
}
