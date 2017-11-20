import { NgModule } from '@angular/core';

import { routing } from './data-center.routes'
import { DataCenterComponent } from './data-center.component';
import { BusinessDataComponent } from './business-data/business-data.component';
import { FinancingDealComponent } from './financing-deal/financing-deal.component';

@NgModule({
	declarations:[
		// DataCenterComponent,
		BusinessDataComponent,
		FinancingDealComponent
	],
	imports:[
		routing
	]
})

export class DataCenterModule{}