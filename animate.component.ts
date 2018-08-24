/**
 * !!!READ CAREFULLY!!!
 * In this library code is written in a way to be compiled in AOT mode.
 * Even slight changes may result in error on the build stage
 */

import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AnimationEvent, trigger} from '@angular/animations';
import {AnimateActionAlias, AnimateActionEnum} from './animate-action.enum';
import {AnimateFrame} from './animate-frame';
import {AnimateFade} from './animate-fade';
import {AnimateStatic} from './animate-static';
import {AnimateBounce} from './animate-bounces';
import {AnimateZooms} from './animate-zooms';
import {ANIMATION_DURATION} from './animate.config';

const inExpr = '* => ';

export const AnimateTransitions = [
  AnimateStatic.visible(AnimateActionEnum.Visible),
  AnimateStatic.hidden(AnimateActionEnum.Hidden),

  AnimateFade.fadeIn(inExpr + AnimateActionEnum.FadeIn),
  AnimateFade.inUp(inExpr + AnimateActionEnum.FadeInUp),
  AnimateFade.inUp(inExpr + AnimateActionEnum.FadeInUpBig),
  AnimateFade.inRight(inExpr + AnimateActionEnum.FadeInRight),
  AnimateFade.inRight(inExpr + AnimateActionEnum.FadeInRightBig),
  AnimateFade.inDown(inExpr + AnimateActionEnum.FadeInDown),
  AnimateFade.inDown(inExpr + AnimateActionEnum.FadeInDownBig),
  AnimateFade.inLeft(inExpr + AnimateActionEnum.FadeInLeft),
  AnimateFade.inLeft(inExpr + AnimateActionEnum.FadeInLeftBig),
  AnimateFade.fadeOut(inExpr + AnimateActionEnum.FadeOut),
  AnimateFade.outUp(inExpr + AnimateActionEnum.FadeOutUp),
  AnimateFade.outUp(inExpr + AnimateActionEnum.FadeOutUpBig),
  AnimateFade.outRight(inExpr + AnimateActionEnum.FadeOutRight),
  AnimateFade.outRight(inExpr + AnimateActionEnum.FadeOutRightBig),
  AnimateFade.outDown(inExpr + AnimateActionEnum.FadeOutDown),
  AnimateFade.outDown(inExpr + AnimateActionEnum.FadeOutDownBig),
  AnimateFade.outLeft(inExpr + AnimateActionEnum.FadeOutLeft),
  AnimateFade.outLeft(inExpr + AnimateActionEnum.FadeOutLeftBig),

  AnimateBounce.inUp(inExpr + AnimateActionEnum.BounceInUp),
  AnimateBounce.inUp(inExpr + AnimateActionEnum.BounceInUpBig),
  AnimateBounce.inRight(inExpr + AnimateActionEnum.BounceInRight),
  AnimateBounce.inRight(inExpr + AnimateActionEnum.BounceInRightBig),
  AnimateBounce.inDown(inExpr + AnimateActionEnum.BounceInDown),
  AnimateBounce.inDown(inExpr + AnimateActionEnum.BounceInDownBig),
  AnimateBounce.inLeft(inExpr + AnimateActionEnum.BounceInLeft),
  AnimateBounce.inLeft(inExpr + AnimateActionEnum.BounceInLeftBig),
  AnimateBounce.outUp(inExpr + AnimateActionEnum.BounceOutUp),
  AnimateBounce.outUp(inExpr + AnimateActionEnum.BouncOutUpBig),
  AnimateBounce.outRight(inExpr + AnimateActionEnum.BounceOutRight),
  AnimateBounce.outRight(inExpr + AnimateActionEnum.BounceOutRightBig),
  AnimateBounce.outDown(inExpr + AnimateActionEnum.BounceOutDown),
  AnimateBounce.outDown(inExpr + AnimateActionEnum.BounceOutDownBig),
  AnimateBounce.outLeft(inExpr + AnimateActionEnum.BounceOutLeft),
  AnimateBounce.outLeft(inExpr + AnimateActionEnum.BounceOutLeftBig),

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
    this.changeDetector.markForCheck();
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

  @Input() display = false;

  @Output() started = new EventEmitter();
  @Output() done = new EventEmitter();

  @Output() onShown = new EventEmitter();
  @Output() onHidden = new EventEmitter();

  @Output() beforeShown = new EventEmitter();
  @Output() beforeHidden = new EventEmitter();

  displayed = false;

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
