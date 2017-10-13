import { Injectable } from '@angular/core';

import { MyHttp } from '../../../services/myHttp/myhttp.service';
import { MyHttpClient } from '../../../services/myHttp/myhttpClient.service'

import { API } from '../../../services/config/app.config';
import { SendData } from './sendData';
import { AddSerialService } from '../../../services/addSerial/addSerial.service';
import { AuthRoleService } from '../../../services/authRole/authRole.service'


@Injectable()
export class CustomerListService{
	constructor(
			private myHttp:MyHttpClient,
			private addSerialService:AddSerialService,
			private user:AuthRoleService
		){}

	getListData(param:SendData):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.customerList,
			query:param
		}).toPromise().then(res=>{
			let data=res;
			if (data.status==200) {
				this.addSerialService.addSerial(data.body.records)
				return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
			
		})
	}

	deleteData(param:number):Promise<any>{
		return this.myHttp.delete({
			api:this.myHttp.api.customerDelete,
			query:{
				guestId:param
			}
		}).toPromise()
	}

	getAuthCount():Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.authMemberCount,
			query:{
				serviceMan:this.user.userName
			}
		})
		.toPromise()
		.then(res=>{
			let data=res;
			if (data.status==200) {
				return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
		})
	}

	getManageL():Promise<any>{
		return this.myHttp.post({
			url:API.loginHost+API.getByDepart.url,
			body:{
				departCode:'003'
			}
		})
		.toPromise()
		.then(res=>{
			let data=res;
			if (data.status==200) {
				return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
		})
	}

	updateServiceMan(companyName,serviceMan):Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.updateServiceMan,
			query:{
				companyName:companyName,
				serviceMan:serviceMan
			}
		})
		.toPromise()
		.then(res=>{
			let data=res;
			if (data.status==200) {
				return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
		})
	}

}