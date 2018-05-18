import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AnimationEvent, trigger} from '@angular/animations';
import {AnimateActionAlias, AnimateActionEnum} from './animate-action.enum';
import {AnimateFrame} from './animate-frame';
import {AnimateFade} from './animate-fade';
import {ANIMATION_BIG_DURATION, ANIMATION_DURATION, FADE_BIG_START_OFFSET, FADE_BOUNCE_OFFSET, FADE_START_OFFSET} from './animate.config';
import {AnimateStatic} from './animate-static';
import {AnimateZooms} from './animate-zooms';
import {AnimateBounce} from './animate-bounces';

const inExpr = '* => ';

export const AnimateTransitions = [
  AnimateStatic.visible(AnimateActionEnum.Visible),
  AnimateStatic.hidden(AnimateActionEnum.Hidden),

  AnimateFade.fadeIn(inExpr + AnimateActionEnum.FadeIn, ANIMATION_DURATION),
  AnimateFade.inUp(inExpr + AnimateActionEnum.FadeInUp, FADE_START_OFFSET, ANIMATION_DURATION),
  AnimateFade.inUp(inExpr + AnimateActionEnum.FadeInUpBig, FADE_BIG_START_OFFSET, ANIMATION_BIG_DURATION),
  AnimateFade.inRight(inExpr + AnimateActionEnum.FadeInRight, FADE_START_OFFSET, ANIMATION_DURATION),
  AnimateFade.inRight(inExpr + AnimateActionEnum.FadeInRightBig, FADE_BIG_START_OFFSET, ANIMATION_BIG_DURATION),
  AnimateFade.inDown(inExpr + AnimateActionEnum.FadeInDown, FADE_START_OFFSET, ANIMATION_DURATION),
  AnimateFade.inDown(inExpr + AnimateActionEnum.FadeInDownBig, FADE_BIG_START_OFFSET, ANIMATION_BIG_DURATION),
  AnimateFade.inLeft(inExpr + AnimateActionEnum.FadeInLeft, FADE_START_OFFSET, ANIMATION_DURATION),
  AnimateFade.inLeft(inExpr + AnimateActionEnum.FadeInLeftBig, FADE_BIG_START_OFFSET, ANIMATION_BIG_DURATION),
  AnimateFade.fadeOut(inExpr + AnimateActionEnum.FadeOut, ANIMATION_DURATION),
  AnimateFade.outUp(inExpr + AnimateActionEnum.FadeOutUp, FADE_START_OFFSET, ANIMATION_DURATION),
  AnimateFade.outUp(inExpr + AnimateActionEnum.FadeOutUpBig, FADE_BIG_START_OFFSET, ANIMATION_BIG_DURATION),
  AnimateFade.outRight(inExpr + AnimateActionEnum.FadeOutRight, FADE_START_OFFSET, ANIMATION_DURATION),
  AnimateFade.outRight(inExpr + AnimateActionEnum.FadeOutRightBig, FADE_BIG_START_OFFSET, ANIMATION_BIG_DURATION),
  AnimateFade.outDown(inExpr + AnimateActionEnum.FadeOutDown, FADE_START_OFFSET, ANIMATION_DURATION),
  AnimateFade.outDown(inExpr + AnimateActionEnum.FadeOutDownBig, FADE_BIG_START_OFFSET, ANIMATION_BIG_DURATION),
  AnimateFade.outLeft(inExpr + AnimateActionEnum.FadeOutLeft, FADE_START_OFFSET, ANIMATION_DURATION),
  AnimateFade.outLeft(inExpr + AnimateActionEnum.FadeOutLeftBig, FADE_BIG_START_OFFSET, ANIMATION_BIG_DURATION),

  AnimateBounce.inUp(inExpr + AnimateActionEnum.BounceInUp, FADE_START_OFFSET, FADE_BOUNCE_OFFSET, ANIMATION_DURATION),
  AnimateBounce.inUp(inExpr + AnimateActionEnum.BounceInUpBig, FADE_BIG_START_OFFSET, FADE_BOUNCE_OFFSET, ANIMATION_BIG_DURATION),
  AnimateBounce.inRight(inExpr + AnimateActionEnum.BounceInRight, FADE_START_OFFSET, FADE_BOUNCE_OFFSET, ANIMATION_DURATION),
  AnimateBounce.inRight(inExpr + AnimateActionEnum.BounceInRightBig, FADE_BIG_START_OFFSET, FADE_BOUNCE_OFFSET, ANIMATION_BIG_DURATION),
  AnimateBounce.inDown(inExpr + AnimateActionEnum.BounceInDown, FADE_START_OFFSET, FADE_BOUNCE_OFFSET, ANIMATION_DURATION),
  AnimateBounce.inDown(inExpr + AnimateActionEnum.BounceInDownBig, FADE_BIG_START_OFFSET, FADE_BOUNCE_OFFSET, ANIMATION_BIG_DURATION),
  AnimateBounce.inLeft(inExpr + AnimateActionEnum.BounceInLeft, FADE_START_OFFSET, FADE_BOUNCE_OFFSET, ANIMATION_DURATION),
  AnimateBounce.inLeft(inExpr + AnimateActionEnum.BounceInLeftBig, FADE_BIG_START_OFFSET, FADE_BOUNCE_OFFSET, ANIMATION_BIG_DURATION),
  AnimateBounce.outUp(inExpr + AnimateActionEnum.BounceOutUp, FADE_START_OFFSET, FADE_BOUNCE_OFFSET, ANIMATION_DURATION),
  AnimateBounce.outUp(inExpr + AnimateActionEnum.BouncOutUpBig, FADE_BIG_START_OFFSET, FADE_BOUNCE_OFFSET, ANIMATION_BIG_DURATION),
  AnimateBounce.outRight(inExpr + AnimateActionEnum.BounceOutRight, FADE_START_OFFSET, FADE_BOUNCE_OFFSET, ANIMATION_DURATION),
  AnimateBounce.outRight(inExpr + AnimateActionEnum.BounceOutRightBig, FADE_BIG_START_OFFSET, FADE_BOUNCE_OFFSET, ANIMATION_BIG_DURATION),
  AnimateBounce.outDown(inExpr + AnimateActionEnum.BounceOutDown, FADE_START_OFFSET, FADE_BOUNCE_OFFSET, ANIMATION_DURATION),
  AnimateBounce.outDown(inExpr + AnimateActionEnum.BounceOutDownBig, FADE_BIG_START_OFFSET, FADE_BOUNCE_OFFSET, ANIMATION_BIG_DURATION),
  AnimateBounce.outLeft(inExpr + AnimateActionEnum.BounceOutLeft, FADE_START_OFFSET, FADE_BOUNCE_OFFSET, ANIMATION_DURATION),
  AnimateBounce.outLeft(inExpr + AnimateActionEnum.BounceOutLeftBig, FADE_BIG_START_OFFSET, FADE_BOUNCE_OFFSET, ANIMATION_BIG_DURATION),

  AnimateZooms.in(inExpr + AnimateActionEnum.ZoomIn, ANIMATION_DURATION),
  AnimateZooms.out(inExpr + AnimateActionEnum.ZoomOut, ANIMATION_DURATION)
];

@Component({
  selector: 'anm-c',
  templateUrl: './animate.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animateState', AnimateTransitions)
  ]
})

export class AnimateComponent implements OnInit {

  _actionQueue: AnimateFrame[] | undefined;
  actionValue: AnimateActionEnum | undefined;

  @Input()
  get action(): AnimateActionEnum | undefined {
    return this.actionValue;
  }

  @Output() actionChange = new EventEmitter();

  set action(act: AnimateActionEnum | undefined) {
    this.actionValue = act;
    this.actionChange.emit(this.actionValue);
  }

  @Input()
  get actionQueue(): AnimateFrame[] | undefined {
    return this._actionQueue;
  }

  @Output() actionQueueChange = new EventEmitter();

  set actionQueue(act: AnimateFrame[] | undefined) {
    this._actionQueue = act;
    this.actionQueueChange.emit(this._actionQueue);
    this.startAnimationQueue();
  }

  @Input() display: boolean;

  @Output() started = new EventEmitter();
  @Output() done = new EventEmitter();

  @Output() onShown = new EventEmitter();
  @Output() onHidden = new EventEmitter();

  @Output() beforeShown = new EventEmitter();
  @Output() beforeHidden = new EventEmitter();

  displayed: boolean;

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {

  }

  emitStarted($event: AnimationEvent): void {
    this.emitBeforeVisibility($event);
    this.setDisplayed();
  }

  emitDone($event: AnimationEvent): void {
    this.setNotDisplayed();
    this.refreshAction();
    this.emitVisibility($event);
  }

  private startAnimationQueue(): void {
    if (this.actionQueue != null &&
      this.actionQueue.length !== 0) {
      const nextFrame = this.actionQueue.shift();
      if (nextFrame != null) {
        if (nextFrame instanceof AnimateFrame) {
          setTimeout(() => {
            this.action = nextFrame.action;
            this.changeDetector.markForCheck();
          }, nextFrame.timeout || 0);
        } else {
          this.action = nextFrame;
        }
      }
    }
  }

  private setDisplayed(): void {
    if (AnimateActionAlias.getItem(this.action) === AnimateActionEnum.Visible || this.display !== false) {
      this.displayed = true;
    }
  }

  private setNotDisplayed(): void {
    if (AnimateActionAlias.getItem(this.action) === AnimateActionEnum.Hidden && !this.display) {
      this.displayed = false;
    }
  }

  private refreshAction(): void {
    if (this.actionQueue != null && this.actionQueue.length > 0) {
      this.startAnimationQueue();
    } else {
      this.action = AnimateActionAlias.getItem(this.action);
    }
  }

  private emitBeforeVisibility($event: AnimationEvent): void {
    if (AnimateActionAlias.getItem(this.action) === AnimateActionEnum.Hidden) {
      this.beforeHidden.emit($event);
    } else {
      this.beforeShown.emit($event);
    }
    this.started.emit($event);
  }

  private emitVisibility($event: AnimationEvent): void {
    this.done.emit($event);
    if (AnimateActionAlias.getItem(this.action) === AnimateActionEnum.Hidden) {
      this.onHidden.emit($event);
    } else {
      this.onShown.emit($event);
    }
  }

}
