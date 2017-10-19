import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { CodeTextareaDirective }         from 'dolphinng';
import {ToggleClassDirective} from 'dolphinng';
import {CodeHighLightComponent} from 'dolphinng';
import {DatePickerDirective} from 'dolphinng';
import {CheckboxComponent} from 'dolphinng';
import {RadioComponent} from 'dolphinng';
import {ToggleComponent} from 'dolphinng';
import {PaginatorComponent} from 'dolphinng';
import {TextMaxLengthDirective} from 'dolphinng';
import {HTML5ValidateDirective}   from '../../directives/HTML5Validate/HTML5Validate.directive';


import { UploaderModule } from '../../utils/uploader/uploader.module'
import { SelectBarModule } from '../../utils/select-bar/select-bar.module'

import { YuanFormatPipe } from '../../pipe/yuan-format/yuan-format.pipe'
import { EffDateFormatPipe } from '../../pipe/eff-date-format/eff-date-format.pipe'
import { DigestContentPipe } from '../../pipe/digest-content/digest-content.pipe'
import { FilterNullPipe } from '../../pipe/filter-null/filter-null.pipe'
import { FilterMultiplyPipe } from '../../pipe/filter-multiply/filter-multiply.pipe'

import { GalleryComponent } from 'dolphinng'
//导入模态框
import { ModalComponent,ModalHeaderComponent,ModalBodyComponent,ModalFooterComponent } from 'dolphinng'

@NgModule({
  imports:[CommonModule,FormsModule,UploaderModule,SelectBarModule],
  declarations: [
    CodeTextareaDirective,
    ToggleClassDirective,
    CodeHighLightComponent,
    DatePickerDirective,
    CheckboxComponent,
    RadioComponent,
    ToggleComponent,
    PaginatorComponent,
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    YuanFormatPipe,
    EffDateFormatPipe,
    DigestContentPipe,
    FilterNullPipe,
    FilterMultiplyPipe,
    GalleryComponent,
    HTML5ValidateDirective,
    TextMaxLengthDirective
  ],
  exports:      [
    FormsModule,
    CommonModule,
    UploaderModule,
    SelectBarModule,
    CodeTextareaDirective,
    ToggleClassDirective,
    CodeHighLightComponent,
    DatePickerDirective,
    CheckboxComponent,
    RadioComponent,
    ToggleComponent,
    PaginatorComponent,
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    YuanFormatPipe,
    EffDateFormatPipe,
    DigestContentPipe,
    FilterNullPipe,
    FilterMultiplyPipe,
    GalleryComponent,
    HTML5ValidateDirective,
    TextMaxLengthDirective
  ]
})
export class SharedModule { }
