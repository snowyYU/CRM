import { RouterModule, Routes, Data } from '@angular/router';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { IndexComponent } from './index/index.component';

import { ModifyPasswordComponent } from './modifyPassword/modifyPassword.component'

import { LoginGuard } from '../services/guard/login.guard';
import { OauthGuard } from '../services/guard/oauth.guard';
// import { AccountComponent } from './account/account.component'
const routes: Routes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full', data: { title: '登录' } },
    { path: 'signin', component: SigninComponent, data: { title: '登录' } }, 
    {
        path: '',
        component: IndexComponent,
        data: { title: '首页' },
        canActivate:[LoginGuard],
        children: [
            { path: 'modifyPassword', component: ModifyPasswordComponent, data: { title: '修改密码' } }, 

            { 
                path: 'business', 
                loadChildren: './business/business.module#BusinessModule', 
                data: { title: '业务拓展',icon:'glyphicon glyphicon-fullscreen',fnIn:['02','03']},
                canActivate:[OauthGuard]
            },
            { 
                path: 'memberM', 
                loadChildren: './member-m/member-m.module#MemberMModule',
                data: { title: '会员管理',icon:'glyphicon glyphicon-user',fnIn:['11','12','13','14']},
                canActivate:[OauthGuard]

            },
            { 
                path: 'account', 
                loadChildren: './account/account.module#AccountModule',
                data: { title: '账户管理',icon:'glyphicon glyphicon-th-list',fnIn:['22','23','24','25']},
                canActivate:[OauthGuard]

            },
            {
                path: 'financingM',
                loadChildren: './financing-m/financing-m.module#FinancingMModule'
            }

            // { path: 'about', loadChildren: './about/about.module#AboutModule', data: { title: '关于' } },
            // { path: 'about', loadChildren: './about/about.module#AboutModule', data: { title: '关于' } },

            // { path: 'about', loadChildren: './about/about.module#AboutModule', data: { title: '关于' } },
            // { path: 'feedback', loadChildren: './feedback/feedback.module#FeedbackModule', data: { title: '操作反馈' } },
            // { path: 'components', loadChildren: './components/components.module#ComponentsModule', data: { title: '组件' } },
            // { path: 'directives', loadChildren: './directives/directives.module#DirectivesModule', data: { title: '指令' } },
            // { path: 'UIKits', loadChildren: './UIKits/UIKits.module#UIKitsModule', data: { title: 'UIKits' } },
            // { path: 'form', loadChildren: './form/form.module#FormModule', data: { title: '表单' } },
            // { path: 'dataTable', loadChildren: './data-table/data-table.module#DataTableModule', data: { title: 'dataTable' } }
        ]
    }
];
export const routing = RouterModule.forRoot(routes);
