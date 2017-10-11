import {NgModule} from '@angular/core';
import { SharedModule } from '../shared/shared.module';


import { BusinessComponent } from './business.component';

import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerAddEditComponent } from './customer-list/add-edit/customer-add-edit.component'
import { DetailComponent as CustomerDetailComponent } from './customer-list/detail/detail.component'
import { ApplyAuthComponent } from './customer-list/apply-auth/apply-auth.component'

import { AuthListComponent } from './authentication/auth-list/auth-list.component';
import { AuthApplyComponent } from './authentication/auth-apply/auth-apply.component';
import { AuthDetailComponent } from './authentication/auth-detail/auth-detail.component'

import { VisitReportComponent } from './visit-report/visit-report.component';
import {AddEditComponent} from './visit-report/add-edit-template/add-edit-template.component';
import { DetailComponent } from './visit-report/detail/detail.component'

//导入table组件
import {DataTableModule as PDataTableModule,SharedModule as PSharedModule} from 'primeng/primeng';
import {MultiSelectModule,SliderModule,DropdownModule,ContextMenuModule} from 'primeng/primeng';




import {routing} from './business.routes'

@NgModule({
	declarations:[
		BusinessComponent,
		CustomerListComponent,
		CustomerAddEditComponent,
		CustomerDetailComponent,
		ApplyAuthComponent,
		VisitReportComponent,
		DetailComponent,
		AddEditComponent,
		
		AuthListComponent,
		AuthApplyComponent,
		AuthDetailComponent
		],
	imports:[
		SharedModule,
		PDataTableModule,
    	PSharedModule,
		routing
	]
})
export class BusinessModule {

}