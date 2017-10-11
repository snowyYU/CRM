import { RouterModule,Routes } from '@angular/router'

import { AccountComponent } from './account.component'
import { AccBalanceComponent } from './acc-balance/acc-balance.component'
import { AccFlowComponent } from './acc-flow/acc-flow.component'
import { ElectricAccComponent } from './electric-acc/electric-acc.component'
import { SignatureComponent } from './electric-acc/signature/signature.component'

const routes:Routes=[
	{
		path:'',
		component:AccountComponent
	},
	{
		path:'memberAccBalance',
		component:AccBalanceComponent
	},
	{
		path:'memberAccFlow',
		component:AccFlowComponent
	},
	{
		path:'electricAcc',
		component:ElectricAccComponent
	},
	{
		path:'electricAcc/openAcc',
		component:ElectricAccComponent
	},
	{
		path:'electricAcc/signature',
		component:SignatureComponent
	},
	

]

export const routing = RouterModule.forChild(routes);