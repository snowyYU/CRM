import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { SubmitLoadingComponent } from '../../utils/submit-loading/submit-loading.component'
import { PreviewerComponent } from '../../utils/previewer/previewer.component'

// import {HTML5ValidateDirective}   from '../../directives/HTML5Validate/HTML5Validate.directive';


import { UploaderModule } from '../../utils/uploader/uploader.module'
import { SelectBarModule } from '../../utils/select-bar/select-bar.module'

import { YuanFormatPipe } from '../../pipe/yuan-format/yuan-format.pipe'
import { EffDateFormatPipe } from '../../pipe/eff-date-format/eff-date-format.pipe'
import { DigestContentPipe } from '../../pipe/digest-content/digest-content.pipe'
import { FilterNullPipe } from '../../pipe/filter-null/filter-null.pipe'
import { FilterMultiplyPipe } from '../../pipe/filter-multiply/filter-multiply.pipe'

import { PreviewOrDownloadComponent } from '../../utils/preview-or-download/preview-or-download.component'
import { MySrcDirective } from '../../utils/previewer/mySrc.directive'
//导入模态框

import { FormsModule as MyFormsModule } from 'dolphinng'
import { ModalModule } from 'dolphinng'
import { LayoutModule } from 'dolphinng'
import {NavModule} from 'dolphinng'
import { GalleryModule } from 'dolphinng'
import { PaginatorModule } from 'dolphinng'
import { DatePickerModule } from 'dolphinng'
import { CurrencyFormatModule } from 'dolphinng'
import { CommonModule as MyCommonModule } from 'dolphinng'


@NgModule({
  imports:[
          CommonModule,
          FormsModule,
          UploaderModule,
          SelectBarModule,
          MyFormsModule,
          ModalModule,
          LayoutModule,
          NavModule,
          GalleryModule,
          PaginatorModule,
          DatePickerModule,
          CurrencyFormatModule,
          MyCommonModule
          ],
  declarations: [
    
    SubmitLoadingComponent,
    PreviewerComponent,
    YuanFormatPipe,
    EffDateFormatPipe,
    DigestContentPipe,
    FilterNullPipe,
    FilterMultiplyPipe,
    PreviewOrDownloadComponent,
    MySrcDirective
  ],
  exports:      [
    FormsModule,
    CommonModule,
    UploaderModule,
    SelectBarModule,
    MyFormsModule,
          ModalModule,
          LayoutModule,
          NavModule,
          GalleryModule,
          PaginatorModule,
          DatePickerModule,
          CurrencyFormatModule,
          MyCommonModule,
    MySrcDirective,

    SubmitLoadingComponent,
    PreviewerComponent,
    YuanFormatPipe,
    EffDateFormatPipe,
    DigestContentPipe,
    FilterNullPipe,
    FilterMultiplyPipe,
    PreviewOrDownloadComponent,
  ]
})
export class SharedModule { }
