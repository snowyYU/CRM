import { RouterModule,Routes } from '@angular/router';

import { FinancingMComponent } from './financing-m.component';
import { DataCenterComponent} from './data-center/data-center.component';
// import { BusinessDataComponent } from './data-center/business-data/business-data.component';
// import { FinancingDealComponent } from './data-center/financing-deal/financing-deal.component'
import { GetMissonComponent } from './get-mission/get-mission.component';
import { LoanHistoryComponent } from './loan-history/loan-history.component';
import { LoanTrackComponent } from './loan-track/loan-track.component';

const routes:Routes=[
	{
		path:'',
		component:FinancingMComponent
	},
	{
		path:'',
		component:DataCenterComponent,
		children:[
			{
				path:'dataCenter',
				loadChildren:'./data-center/data-center.module#DataCenterModule'

			}
		]
	},
	// {
	// 	path:'dataCenter/businessData',
	// 	component:BusinessDataComponent
	// },
	// {
	// 	path:'dataCenter/financingDeal',
	// 	component:FinancingDealComponent
	// },
	{
		path:'getMission',
		component:GetMissonComponent
	},
	{
		path:'loanHistory',
		component:LoanHistoryComponent
	},
	{
		path:'loanTrack',
		component:LoanTrackComponent
	}

]

export const routing = RouterModule.forChild(routes)
