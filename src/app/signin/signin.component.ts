import { Component} from '@angular/core';

import { Router } from '@angular/router';
import { SignInService } from './signin.service';
import {environment} from '../../environments/environment'
// import { AuthTokenService } from '../../services/authToken/authToken.service';
import { AuthRoleService } from '../../services/authRole/authRole.service'
import { PopService } from 'dolphinng'

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.less'],
  providers:[AuthRoleService]
})
export class SigninComponent {

  user:string='拓展人员';
  password:string='123456';
  submiting:boolean=false;
  msg:string;


  banners:{
    title?:string,
    link?:string,
    active?:boolean
  }[];

  constructor(
  	private router:Router,
  	private signInService:SignInService,
  	// private authTokenService:AuthTokenService,
    private authRoleService:AuthRoleService,
    private pop:PopService
    ){
    this.banners=[{
      title:'金融业务处理系统',
      link:this.createBannerLink('fbps')
    },{
      title:'客户关系处理系统',
      link:this.createBannerLink('crm'),
      active:true
    },{
      title:'金融风控管理系统',
      link:this.createBannerLink('rcm')
    },{
      title:'后台综合管理系统',
      link:this.createBannerLink('ims')
    }/*,{
      title:'',
      link:''
    },{
      title:'',
      link:''
    }*/]
  }

  private createBannerLink(sysName:string):string{
    if(environment.production){
      return '';
    }else{
      return 'http://192.168.10.10:9091/'+sysName;
    }
  }

  signIn():void{

    
  	//进行校验

    //清空cookie
    this.authRoleService.deleteAllCookies()

  	this.submiting=true;
  	//发送数据

  	let reqBody={
  		loginName:this.user,
  		loginPwd:this.password,
      loginSysCode:'03'

  	}
  	this.signInService
  		.loginIn(reqBody)
  		.then(res=>{this.extractData(res)})
	  	.catch(res=>{
        // this.pop.error({
        //   title:'错误信息',
        //   text:res.message
        // })
        this.submiting=false;
        this.msg=res.message;

      })

  }
    o={
      '02':"/business/customerList",
      '03':"/business/visitReport",
      '11':"/memberM/memberManage",
      '12':"/memberM/memberManage",
      '13':"/memberM/getApply",
      '14':"/memberM/relativeCompany",
      '22':"/account/electricAcc/openAcc",
      '23':"/account/electricAcc/signature",
      '24':"/account/memberAccBalance",
      '25':"/account/memberAccFlow",
    }

  	extractData(res: any){
        this.authRoleService.eTime=res.body.expiresIn*500
        // this.authTokenService.expiresT=response.body.expiresIn*500
        this.authRoleService.userName=this.user;
  			this.authRoleService.token=res.body.accessToken
        this.authRoleService.employeeId=res.body.employeeId

        let roles:any[]=[]
        res.body.roles.forEach(e=>{
          roles.push(e.roleCode)
        })
        this.authRoleService.role=JSON.stringify(roles)
        let subsysFuncs:any[]=[]
        res.body.subsysFuncs.forEach(e=>{
          subsysFuncs.push(e.functionPoint)
        })
        this.authRoleService.subsysFuncs=JSON.stringify(subsysFuncs)
        console.log(this.authRoleService.subsysFuncs)

        this.router.navigate([this.o[subsysFuncs[0]]])
        subsysFuncs[0]

        // if (this.authRoleService.roleIn(['007','008'])) {
        //   this.router.navigate(['/business/customerList'])

        // }else if (this.authRoleService.roleIn(['002'])) {
        //   this.router.navigate(['/memberM/memberManage'])
          
        // }else{
        //   this.router.navigate(['/memberM/memberManage'])
        // }
  	}



  	handleError(error: Response|any):void{
  		console.log(error);
  	}



}
