import {NgModule} from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MemberMComponent } from './member-m.component';
import { GetApplyComponent } from './get-apply/get-apply.component';
import { GetApplyDetailComponent } from './get-apply/detail/get-apply-detail.component'
import { InfoChangeComponent } from './info-change/info-change.component';
import { MemberManageComponent } from './member-manage/member-manage.component';
//会员详情
import { MemberDetailComponent } from './member-manage/detail/member-detail.component'
import { EleAttachmentComponent } from './member-manage/detail/ele-attachment/ele-attachment.component'
import { MemberReportComponent } from './member-manage/detail/report/member-report.component'
//会员详情尽调资料三个部分
import { CompanyInfoComponent } from './member-manage/detail/material/company-info/company-info.component'
import { RiskMComponent } from './member-manage/detail/material/risk-m/risk-m.component'
import { RunSituationComponent } from './member-manage/detail/material/run-situation/run-situation.component'

//申请授信
import { NewApplyComponent } from './member-manage/new-apply/new-apply.component'
import { ReApplyComponent } from './member-manage/re-apply/re-apply.component'


import { InfoChangeDetailComponent } from './info-change/info-change-detail/info-change-detail.component';

import { RelativeCompanyComponent } from './relative-company/relative-company.component'

//导入table组件
import {DataTableModule as PDataTableModule,SharedModule as PSharedModule} from 'primeng/primeng';
import {MultiSelectModule,SliderModule,DropdownModule,ContextMenuModule} from 'primeng/primeng';

import {routing} from './member-m.routes'

import { MyHttp } from '../../services/myHttp/myhttp.service';
import { RelativeDetailComponent } from './relative-company/relative-detail/relative-detail.component';


@NgModule({
	declarations:[
		MemberMComponent,
		GetApplyComponent,
		InfoChangeComponent,
		MemberManageComponent,
		MemberDetailComponent,
		EleAttachmentComponent,
		MemberReportComponent,
		CompanyInfoComponent,
		RiskMComponent,
		RunSituationComponent,
		NewApplyComponent,
		ReApplyComponent,
		InfoChangeDetailComponent,
		RelativeCompanyComponent,
		GetApplyDetailComponent,
		RelativeDetailComponent,
		],
	imports:[
		SharedModule,
		routing,
		PDataTableModule,
		PSharedModule,

	],
	providers:[MyHttp]
})
export class MemberMModule {

}