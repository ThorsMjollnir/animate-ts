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
import {ANIMATION_BIG_DURATION, ANIMATION_DURATION, FADE_BIG_START_OFFSET, FADE_START_OFFSET} from "./animate.config";

export const AnimateTransitions = [
  state(AnimateActionEnum.Visible, style({opacity: 1})),
  state(AnimateActionEnum.Hidden, style({opacity: 0})),
  AnimateFades.fadeIn('* => ' + AnimateActionEnum.FadeIn, ANIMATION_DURATION),
  AnimateFades.fadeInUp('* => ' + AnimateActionEnum.FadeInUp, FADE_START_OFFSET, ANIMATION_DURATION),
  AnimateFades.fadeInUp('* => ' + AnimateActionEnum.FadeInUpBig, FADE_BIG_START_OFFSET, ANIMATION_BIG_DURATION),
  AnimateFades.fadeInRight('* => ' + AnimateActionEnum.FadeInRight, FADE_START_OFFSET, ANIMATION_DURATION),
  AnimateFades.fadeInRight('* => ' + AnimateActionEnum.FadeInRightBig, FADE_BIG_START_OFFSET, ANIMATION_BIG_DURATION),
  AnimateFades.fadeInDown('* => ' + AnimateActionEnum.FadeInDown, FADE_START_OFFSET, ANIMATION_DURATION),
  AnimateFades.fadeInDown('* => ' + AnimateActionEnum.FadeInDownBig, FADE_BIG_START_OFFSET, ANIMATION_BIG_DURATION),
  AnimateFades.fadeInLeft('* => ' + AnimateActionEnum.FadeInLeft, FADE_START_OFFSET, ANIMATION_DURATION),
  AnimateFades.fadeInLeft('* => ' + AnimateActionEnum.FadeInLeftBig, FADE_BIG_START_OFFSET, ANIMATION_BIG_DURATION),
  AnimateFades.fadeOut('* => ' + AnimateActionEnum.FadeOut, ANIMATION_DURATION),
  AnimateFades.fadeOutUp('* => ' + AnimateActionEnum.FadeOutUp, FADE_START_OFFSET, ANIMATION_DURATION),
  AnimateFades.fadeOutUp('* => ' + AnimateActionEnum.FadeOutUpBig, FADE_BIG_START_OFFSET, ANIMATION_BIG_DURATION),
  AnimateFades.fadeOutRight('* => ' + AnimateActionEnum.FadeOutRight, FADE_START_OFFSET, ANIMATION_DURATION),
  AnimateFades.fadeOutRight('* => ' + AnimateActionEnum.FadeOutRightBig, FADE_BIG_START_OFFSET, ANIMATION_BIG_DURATION),
  AnimateFades.fadeOutDown('* => ' + AnimateActionEnum.FadeOutDown, FADE_START_OFFSET, ANIMATION_DURATION),
  AnimateFades.fadeOutDown('* => ' + AnimateActionEnum.FadeOutDownBig, FADE_BIG_START_OFFSET, ANIMATION_BIG_DURATION),
  AnimateFades.fadeOutLeft('* => ' + AnimateActionEnum.FadeOutLeft, FADE_BIG_START_OFFSET, ANIMATION_BIG_DURATION),
  AnimateFades.fadeOutLeft('* => ' + AnimateActionEnum.FadeOutLeftBig, FADE_BIG_START_OFFSET, ANIMATION_BIG_DURATION),
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
    this.actionQueueChange.emit(this.action);
    this.startAnimationQueue();
  }

  @Input() display: boolean;

  @Output() started: EventEmitter<any> = new EventEmitter();
  @Output() done: EventEmitter<any> = new EventEmitter();

  @Output() onShown: EventEmitter<any> = new EventEmitter();
  @Output() onHidden: EventEmitter<any> = new EventEmitter();

  @Output() beforeShown: EventEmitter<any> = new EventEmitter();
  @Output() beforeHidden: EventEmitter<any> = new EventEmitter();

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
