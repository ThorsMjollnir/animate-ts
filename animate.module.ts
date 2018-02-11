import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AnimateComponent} from './animate.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AnimateComponent],
  exports: [AnimateComponent]
})
export class AnimateModule {
}
