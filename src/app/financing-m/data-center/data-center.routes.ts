import { RouterModule,Routes } from '@angular/router';

import { DataCenterComponent } from './data-center.component';
import { BusinessDataComponent } from './business-data/business-data.component';
import { FinancingDealComponent } from './financing-deal/financing-deal.component';

const routes:Routes=[
	{
		path:'',
		component:DataCenterComponent
	},
	{
		path:'businessData',
		component:BusinessDataComponent
	},
	{
		path:'financingDeal',
		component:FinancingDealComponent
	}
]

export const routing = RouterModule.forChild(routes);