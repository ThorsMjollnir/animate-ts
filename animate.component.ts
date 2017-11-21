import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectorRef
} from '@angular/core';
import {AnimationEvent, state, style, trigger} from '@angular/animations';
import {AnimateActionAlias, AnimateActionEnum} from './animate-action.enum';
import {AnimateFrame} from './animate-frame.class';
import {AnimateFades} from './animate-fades.class';

export const AnimateTransitions = [
  state(AnimateActionEnum.Visible, style({opacity: 1})),
  state(AnimateActionEnum.Hidden, style({opacity: 0})),
  AnimateFades.FadeIn,
  AnimateFades.FadeInUp,
  AnimateFades.FadeInUpBig,
  AnimateFades.FadeInRight,
  AnimateFades.FadeInRightBig,
  AnimateFades.FadeInDown,
  AnimateFades.FadeInDownBig,
  AnimateFades.FadeInLeft,
  AnimateFades.FadeInLeftBig,
  AnimateFades.FadeOut,
  AnimateFades.FadeOutUp,
  AnimateFades.FadeOutUpBig,
  AnimateFades.FadeOutRight,
  AnimateFades.FadeOutRightBig,
  AnimateFades.FadeOutDown,
  AnimateFades.FadeOutDownBig,
  AnimateFades.FadeOutLeft,
  AnimateFades.FadeOutLeftBig,
];

@Component({
  selector: 'anm',
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
    this.actionQueueChange.emit(this.actionValue);
    this.startAnimationQueue();
  }

  @Input() display: boolean;

  @Output() started: EventEmitter<any> = new EventEmitter();
  @Output() done: EventEmitter<any> = new EventEmitter();

  @Output() onShown: EventEmitter<any> = new EventEmitter();
  @Output() onHidden: EventEmitter<any> = new EventEmitter();

  displayed: boolean;

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {

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
    if (AnimateActionAlias.getItem(this.actionValue) === AnimateActionEnum.Visible || this.display !== false) {
      this.displayed = true;
    }
  }

  private setNotDisplayed(): void {
    if (AnimateActionAlias.getItem(this.actionValue) === AnimateActionEnum.Hidden && !this.display) {
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
    if (AnimateActionAlias.getItem(this.actionValue) === AnimateActionEnum.Hidden) {
      this.onHidden.emit($event);
    } else {
      this.onShown.emit($event);
    }
  }

}
