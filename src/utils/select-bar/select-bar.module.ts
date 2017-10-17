import {NgModule} from '@angular/core';
import {SelectBarComponent} from './select-bar.component';
import { CommonModule }        from '@angular/common';
@NgModule({
    imports: [CommonModule],
    declarations: [
      SelectBarComponent
    ],
    exports:[SelectBarComponent]
})
export class SelectBarModule {
}
