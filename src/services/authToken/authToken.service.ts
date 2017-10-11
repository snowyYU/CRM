import { Injectable } from '@angular/core';

import { CookieService } from 'ng2-cookies'; 
import { MyHttp } from '../myHttp/myhttp.service';


@Injectable()
export class AuthTokenService {
	private cookie:CookieService=new CookieService;
	expiresT:number|Date;//cookie过期时间

	constructor(private myhttp:MyHttp){}

	set token(token:string){
		this.cookie.set("token",token,this.expiresT,'/');
	}

	get token():string{
		return this.cookie.get("token");
	}

	refreshToken(){

		if (this.token) {
			// code...
			this.myhttp.post({
			api:this.myhttp.api.refreshToken,
			query:{
				accessToken:this.token
			}
			}).toPromise()
		  	  .then(res=>{

		  	})
		}
		
		
	}

}