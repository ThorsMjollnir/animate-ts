import {animate, keyframes, style, transition} from '@angular/animations';
import {ANIMATION_DURATION} from './animate.config';
import {AnimationStyleMetadata} from '@angular/animations/src/animation_metadata';

export class AnimateZooms {
  static in(expr: string, duration: number = ANIMATION_DURATION) {
    return AnimateZooms.zoomInFactory(expr, duration);
  }

  static out(expr: string, duration: number = ANIMATION_DURATION) {
    return AnimateZooms.zoomOutFactory(expr, duration);
  }

  private static zoomInFactory(expr: string, duration: number) {
    return AnimateZooms.transitionFactory(expr,
      [
        style({opacity: 0, transform: 'scale(0)'}),
        style({opacity: 1, transform: 'scale(1.1)'}),
        style({opacity: 1, transform: 'scale(1)'})
      ],
      duration
    );
  }

  private static zoomOutFactory(expr: string, duration: number = ANIMATION_DURATION) {
    return AnimateZooms.transitionFactory(expr,
      [
        style({opacity: 1, transform: 'scale(1)'}),
        style({opacity: 1, transform: 'scale(1.1)'}),
        style({opacity: 0, transform: 'scale(0)'})
      ],
      duration
    );
  }

  private static transitionFactory(expr: string, styles: AnimationStyleMetadata[], duration: number) {
    return transition(expr, [animate(duration, keyframes(styles))]);
  }

}
