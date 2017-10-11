import { RouterModule,Routes } from '@angular/router';
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

const routes: Routes =[
	{
		path:'',
		component: BusinessComponent
	},
	{
		path:'customerList',
		component:CustomerListComponent,

	},
	{
		path:'customerList/add',
		component:CustomerAddEditComponent
	},
	{
		path:'customerList/edit/:id',
		component:CustomerAddEditComponent
	},
	{
		path:'customerList/detail/:id',
		component:CustomerDetailComponent
	},
	{
		path:'customerList/applyAuth/:id',
		component:ApplyAuthComponent
	},
	{
		path:'customerList/authList/:count',
		component:AuthListComponent
	},
	{
		path:'customerList/authDetail/:id',
		component:AuthDetailComponent
	},
	{
		path:'customerList/authApply/:id',
		component:AuthApplyComponent
	},

	{
		path:'visitReport',
		component:VisitReportComponent
	},
	{
		path:'visitReport/detail/:id',
		component:DetailComponent
	},
	{
		path:'visitReport/add',
		component:AddEditComponent
	},
	{
		path:'visitReport/edit/:id',
		component:AddEditComponent
	}
]

export const routing = RouterModule.forChild(routes);

