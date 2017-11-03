import { Component} from '@angular/core';

import { Router } from '@angular/router';
import { SignInService } from './signin.service';
import {environment} from '../../environments/environment'
// import { AuthTokenService } from '../../services/authToken/authToken.service';
import { AuthRoleService } from '../../services/authRole/authRole.service'
import { PopService } from 'dolphinng'
import { config } from '../../services/config/app.config'

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.less'],
  providers:[AuthRoleService]
})
export class SigninComponent {

  user:string='';
  password:string='';
  submiting:boolean=false;
  msg:string;


  systems=config.getSystems();

  constructor(
  	private router:Router,
  	private signInService:SignInService,
  	// private authTokenService:AuthTokenService,
    private authRoleService:AuthRoleService,
    private pop:PopService
    ){
    
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
        console.log(res)

        //账号未分配角色

        //两个判断
        //先检验role

        if(res.body.roles&&res.body.roles.length==0) {
          this.submiting=false;
          this.msg="您没有此系统的使用权限"
          return
        }
        if(res.body.subsysFuncs&&res.body.subsysFuncs.length==0) {
          this.submiting=false;
          this.msg="您没有此系统的使用权限"
          return
        }
        // console.log(this.o[res.body.subsysFuncs[0].functionPoint])
        // console.log(res.body.subsysFuncs[0].functionPoint)

        let subsysFuncsFunctionPoint:any[]=[]
        res.body.subsysFuncs.forEach(e=>{
          if(this.o[e.functionPoint]) {
            subsysFuncsFunctionPoint.push(e.functionPoint)
          }
          
        })

        if(subsysFuncsFunctionPoint.length==0) {
          this.submiting=false;
          this.msg="您没有此系统的使用权限"
          return
        }


        this.authRoleService.eTime=res.body.expiresIn*500
        // this.authTokenService.expiresT=response.body.expiresIn*500
        this.authRoleService.userName=res.body.employeeName;
  			this.authRoleService.token=res.body.accessToken
        this.authRoleService.employeeId=res.body.employeeId

        let roles:any[]=[]
        res.body.roles.forEach(e=>{
          roles.push(e.roleCode)
        })
        this.authRoleService.role=JSON.stringify(roles)
        // let subsysFuncs:any[]=[]
        // res.body.subsysFuncs.forEach(e=>{
        //   subsysFuncs.push(e.functionPoint)
        // })
        this.authRoleService.subsysFuncs=JSON.stringify(subsysFuncsFunctionPoint)
        console.log(this.authRoleService.subsysFuncs)

        setInterval(e=>{
          this.authRoleService.refreshToken()
        },res.body.expiresIn*500)


        this.router.navigate([this.o[subsysFuncsFunctionPoint[0]]])



        // subsysFuncs[0]

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
