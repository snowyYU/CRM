import { RouterModule,Routes } from '@angular/router';

import { FinancingMComponent } from './financing-m.component';
// import { DataCenterComponent} from './data-center/data-center.component';
// import { BusinessDataComponent } from './data-center/business-data/business-data.component';
// import { FinancingDealComponent } from './data-center/financing-deal/financing-deal.component'
import { GetMissonComponent } from './get-mission/get-mission.component';
import { GetReportComponent }  from './get-mission/get-report/get-report.component';
import { LoanHistoryComponent } from './loan-history/loan-history.component';
import { LoanTrackComponent } from './loan-track/loan-track.component';
import { DetailComponent } from './loan-track/detail/detail.component';
import { SpreadManageComponent } from './spread-manage/spread-manage.component';
import { SpreadManageDetailComponent } from './spread-manage/detail/spread-manage-detail.component';

const routes:Routes=[
	{
		path:'',
		component:FinancingMComponent
	},
	{
		path:'',
		// component:DataCenterComponent,
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
		path:'getMission/getReport/:data',
		component:GetReportComponent
	},
	{
		path:'loanHistory',
		component:LoanHistoryComponent
	},
	{
		path:'loanTrack',
		component:LoanTrackComponent
	},
	{
		path:'loanTrack/detail/:data',
		component:DetailComponent
	},
	{
		path:'spreadManage',
		component:SpreadManageComponent
	},
	{
		path:'spreadManage/detail/:id',
		component:SpreadManageDetailComponent
	}

]

export const routing = RouterModule.forChild(routes)
