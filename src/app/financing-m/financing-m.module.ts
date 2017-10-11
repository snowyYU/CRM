import { NgModule } from '@angular/core';

import {routing} from './financing-m.routes';

import { FinancingMComponent } from './financing-m.component';
// import { BusinessDataComponent } from './data-center/business-data/business-data.component';
// import { FinancingDealComponent } from './data-center/financing-deal/financing-deal.component'
import { GetMissonComponent } from './get-mission/get-mission.component';
import { LoanHistoryComponent } from './loan-history/loan-history.component';
import { LoanTrackComponent } from './loan-track/loan-track.component';

@NgModule({
	declarations:[
		FinancingMComponent,
		// BusinessDataComponent,
		// FinancingDealComponent,
		GetMissonComponent,
		LoanHistoryComponent,
		LoanTrackComponent

	],
	imports:[
		routing
	]
})

export class FinancingMModule{}