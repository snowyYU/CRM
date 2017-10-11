import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { MyHttp } from '../../services/myHttp/myhttp.service';
import { HOST,API } from '../../services/config/app.config'

import 'rxjs/add/operator/toPromise';

let param ={

}

@Injectable()
export class SignInService{
	constructor(private httpService:MyHttp){}

	loginIn(loginInfo:any):Promise<any>{
	  	return this.httpService.post({
	  		url:API.loginHost+API.login.url,
	  		body:loginInfo
	  	}).toPromise().then(res=>{
	  		let data=res.json()
	  		console.log(data)
	  		if (data.status==200) {
	  			return Promise.resolve(data)
	  		}else{
	  			return Promise.reject(data)
	  		}
	  	})
	  	
  	}

  	

}


