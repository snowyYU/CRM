import {Injectable} from '@angular/core';
import { CookieService } from 'ng2-cookies'
import { MyHttp } from '../myHttp/myhttp.service'

@Injectable()
export class AuthRoleService {
	// role:string="mem";
	// role:string;
	eTime:number

	constructor(
		private cookie:CookieService,
		private myhttp:MyHttp
		){}
	// cookie:CookieService=new CookieService;
	
	set role(type:string){
		this.cookie.set('crm_role',type,this.eTime,'/')
	}

	get role(){
		return this.cookie.get('crm_role')
	}

	set subsysFuncs(type:string){
		this.cookie.set('crm_subsysFuncs',type,this.eTime,'/')
	}

	get subsysFuncs(){
		return this.cookie.get('crm_subsysFuncs')
	}

	set userName(name:string){
		this.cookie.set('crm_userName',name,this.eTime,'/')
	}

	get userName(){
		return this.cookie.get('crm_userName')
	}

	set employeeId(name:string){
		this.cookie.set('crm_employeeId',name,this.eTime,'/')
	}

	get employeeId(){
		return this.cookie.get('crm_employeeId')
	}
	
	set token(token:string){
		this.cookie.set("crm_token",token,this.eTime,'/');
	}

	get token():string{
		return this.cookie.get("crm_token");
	}

	fnIn(param:string[]):boolean{
    for(let o of param){
      if(this.subsysFuncs.indexOf(o)>=0){
        return true;
      }
    }
    return false;
  }

  fnRequire(param:string[]|string):boolean{
    if(param instanceof Array) {
      for (let o of param) {
        if (this.subsysFuncs.indexOf(o) === -1) {
          return false;
        }
      }
    }else if(typeof param==='string'){
      if (this.subsysFuncs.indexOf(param) === -1) {
        return false;
      }
    }
    return true;
  }

  roleIn(param:string[]):boolean{
    for(let o of param){
      if(this.role.indexOf(o)>=0){
        return true;
      }
    }
    return false;
  }

  roleRequire(param:string[]|string):boolean{
    if(param instanceof Array) {
      for(let o of param){
        if(this.role.indexOf(o)===-1){
          return false;
        }
      }
    }else if(typeof param==='string'){
      if (this.role.indexOf(param) === -1) {
        return false;
      }
    }
    return true;
  }

	refreshToken(){

		if (this.token) {
			// code...
			this.myhttp.post({
			url:this.myhttp.api.loginHost+this.myhttp.api.refreshToken,
			body:{
				accessToken:this.token
			}
			}).toPromise()
		  	  .then(res=>{

		  	})
		}
		
		
	}

	deleteAllCookies(){
		this.cookie.set('role','',1,'/')
		this.cookie.set('userName','',1,'/')
		this.cookie.set('token','',1,'/')
		this.cookie.set('subsysFuncs','',1,'/')
		this.cookie.set('employeeId','',1,'/')
		

		// this.cookie.deleteAll('','/')
		console.log("cookies",document.cookie)
	}

} 