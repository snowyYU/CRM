import { RouterModule,Routes } from '@angular/router';
import { MemberMComponent } from './member-m.component';
import { GetApplyComponent } from './get-apply/get-apply.component';
import { GetApplyDetailComponent } from './get-apply/detail/get-apply-detail.component'
//会员详情
import { MemberDetailComponent } from './member-manage/detail/member-detail.component'
import { EleAttachmentComponent } from './member-manage/detail/ele-attachment/ele-attachment.component'
import { MemberReportComponent } from './member-manage/detail/report/member-report.component'
//会员详情尽调资料三个部分
import { CompanyInfoComponent } from './member-manage/detail/material/company-info/company-info.component'
import { RiskMComponent } from './member-manage/detail/material/risk-m/risk-m.component'
import { RunSituationComponent } from './member-manage/detail/material/run-situation/run-situation.component'

import { InfoChangeComponent } from './info-change/info-change.component';
import { MemberManageComponent } from './member-manage/member-manage.component';
//申请授信
import { NewApplyComponent } from './member-manage/new-apply/new-apply.component'
import { ReApplyComponent } from './member-manage/re-apply/re-apply.component'

import { InfoChangeDetailComponent } from './info-change/info-change-detail/info-change-detail.component';

import { RelativeCompanyComponent } from './relative-company/relative-company.component'
import { RelativeDetailComponent } from './relative-company/relative-detail/relative-detail.component'

const routes: Routes =[
	{
		path:'',
		component: MemberMComponent
	},
	
	{
		path:'getApply',
		component:GetApplyComponent

	},
	{
		path:'getApply/detail/:id',
		component:GetApplyDetailComponent

	},
	{
		path:'infoChange',
		component:InfoChangeComponent
	},
	{
		path:'infoChange/detail/:id',
		component:InfoChangeDetailComponent
	},
	{
		path:'memberManage',
		component:MemberManageComponent
	},
	{
		path:'memberManage/detail/:id',
		component:MemberDetailComponent
	},
	{
		path:'memberManage/detail/:id/eleAttachment',
		component:EleAttachmentComponent
	},
	{
		path:'memberManage/detail/:id/memberReport',
		component:MemberReportComponent
	},
	//尽调资料三个部分
	{
		path:'memberManage/detail/:id/companyInfo',
		component:CompanyInfoComponent
	},
	{
		path:'memberManage/detail/:id/riskM',
		component:RiskMComponent
	},
	{
		path:'memberManage/detail/:id/runSituation',
		component:RunSituationComponent
	},
	{
		path:'memberManage/newApply/:data',
		component:NewApplyComponent
	},
	{
		path:'memberManage/reApply/:data',
		component:ReApplyComponent
	},
	{
		path:'relativeCompany',
		component:RelativeCompanyComponent
	},
	{
		path:'relativeCompany/detail/:data',
		component:RelativeDetailComponent
	}
]

export const routing = RouterModule.forChild(routes);