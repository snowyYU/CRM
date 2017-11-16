import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module'
//导入table组件
import {DataTableModule as PDataTableModule,SharedModule as PSharedModule} from 'primeng/primeng';
import {MultiSelectModule,SliderModule,DropdownModule,ContextMenuModule} from 'primeng/primeng';

import { FinancingMComponent } from './financing-m.component';
import { DataCenterComponent } from './data-center/data-center.component';
// import { BusinessDataComponent } from './data-center/business-data/business-data.component';
// import { FinancingDealComponent } from './data-center/financing-deal/financing-deal.component'
import { GetMissonComponent } from './get-mission/get-mission.component';
import { LoanHistoryComponent } from './loan-history/loan-history.component';
import { LoanTrackComponent } from './loan-track/loan-track.component';
import { DetailComponent } from './loan-track/detail/detail.component';

import {routing} from './financing-m.routes';

@NgModule({
	declarations:[
		FinancingMComponent,
		DataCenterComponent,
		// BusinessDataComponent,
		// FinancingDealComponent,
		GetMissonComponent,
		LoanHistoryComponent,
		LoanTrackComponent,
		DetailComponent

	],
	imports:[
		SharedModule,
		PDataTableModule,
    	PSharedModule,
		routing
	]
})

export class FinancingMModule{}