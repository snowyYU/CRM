import {NgModule} from '@angular/core';
import {UploaderDirective} from './uploader.directive';
import {Uploader} from './Uploader';
@NgModule({
  declarations: [
    UploaderDirective
  ],
  providers: [],
  exports: [
    UploaderDirective,
  ]
})
export class UploaderModule {
}
