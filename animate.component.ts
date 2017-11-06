import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {trigger, state, style, AnimationEvent} from '@angular/animations';
import {AnimateActionEnum, AnimateActionAlias} from './animate-action.enum';
import {AnimateFrame} from './animate-frame.class';
import {AnimateBounces} from './animate-bounces.class';
import {AnimateFades} from './animate-fades.class';
import {AnimateZooms} from './animate-zooms.class';

const AnimateTransitions = [
  state(AnimateActionEnum.Visible.toString(), style({opacity: 1})),
  state(AnimateActionEnum.Hidden.toString(), style({opacity: 0})),
];

AnimateTransitions.push.apply(AnimateTransitions, AnimateBounces.animations);
AnimateTransitions.push.apply(AnimateTransitions, AnimateFades.animations);
AnimateTransitions.push.apply(AnimateTransitions, AnimateZooms.animations);

@Component({
  selector: 'anm',
  templateUrl: './animate.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animateState', AnimateTransitions)
  ]
})

export class AnimateComponent implements OnChanges {

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


  @Input() actionQueue: AnimateFrame[];
  @Input() display: boolean;

  @Output() started: EventEmitter<any> = new EventEmitter();
  @Output() done: EventEmitter<any> = new EventEmitter();

  @Output() onShown: EventEmitter<any> = new EventEmitter();
  @Output() onHidden: EventEmitter<any> = new EventEmitter();

  displayed: boolean;

  constructor() {
  }

  ngOnChanges(): void {
    if (this.actionQueue != null &&
      this.actionQueue.length != 0) {
      this.startAnimationQueue();
    }
  }

  emitStarted($event: AnimationEvent): void {
    this.setDisplayed();
    this.started.emit($event);
  }

  emitDone($event: AnimationEvent): void {
    this.setNotDisplayed();
    this.refreshAction();
    this.emitVisibility($event);
  }

  private startAnimationQueue(): void {
    const nextFrame = this.actionQueue.shift();
    if (nextFrame != null) {
      this.action = nextFrame.action;
    }
  }

  private setDisplayed(): void {
    if (AnimateActionAlias.getItem(this.actionValue) == AnimateActionEnum.Visible || this.display != false) {
      this.displayed = true;
    }
  }

  private setNotDisplayed(): void {
    if (AnimateActionAlias.getItem(this.actionValue) == AnimateActionEnum.Hidden && this.display == false) {
      this.displayed = false;
    }
  }

  private refreshAction(): void {
    if (this.actionQueue != null && this.actionQueue.length > 0) {
      this.startAnimationQueue();
    } else {
      this.action = AnimateActionAlias.getItem(this.actionValue);
    }
  }

  private emitVisibility($event: AnimationEvent): void {
    this.done.emit($event);
    if (AnimateActionAlias.getItem(this.actionValue) == AnimateActionEnum.Hidden) {
      this.onHidden.emit($event);
    } else {
      this.onShown.emit($event);
    }
  }

}
