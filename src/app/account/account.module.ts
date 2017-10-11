import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'
//导入table组件
import {DataTableModule as PDataTableModule,SharedModule as PSharedModule} from 'primeng/primeng';
import {MultiSelectModule,SliderModule,DropdownModule,ContextMenuModule} from 'primeng/primeng';

import { AccountComponent } from './account.component'
import { AccBalanceComponent } from './acc-balance/acc-balance.component'
import { AccFlowComponent } from './acc-flow/acc-flow.component'
import { ElectricAccComponent } from './electric-acc/electric-acc.component'
import { SignatureComponent } from './electric-acc/signature/signature.component'

import { routing } from './account.routes'

@NgModule({
	declarations:[
		AccountComponent,
		AccBalanceComponent,
		AccFlowComponent,
		ElectricAccComponent,
		SignatureComponent
	],
	imports:[
		SharedModule,
		PDataTableModule,
    	PSharedModule,
    	routing
	]
})
export class AccountModule{}