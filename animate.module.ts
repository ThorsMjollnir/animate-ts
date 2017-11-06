import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AnimateComponent} from './animate.component';

@NgModule({
    imports: [
        CommonModule, BrowserAnimationsModule
    ],
    declarations: [AnimateComponent],
    exports: [AnimateComponent]
})
export class AnimateModule {
}
