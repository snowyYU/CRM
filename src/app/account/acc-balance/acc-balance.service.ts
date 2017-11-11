import { Injectable } from '@angular/core';
import { MyHttp } from '../../../services/myHttp/myhttp.service'
import { MyHttpClient } from '../../../services/myHttp/myhttpClient.service'

export interface SendData{
	rows:number
	page:number
	appId?
	companyName?
}

@Injectable()
export class AccBalanceService {
	
	constructor(
			private myHttp:MyHttpClient
		) {}

	//appId
	getAllApp():Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.getAllApp,

		}).toPromise().then(res=>{
			let data=res
			if (data.status==200) {
				// data.body.records.unshift({resourceName:'全部',resourceId:''})
				return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
		})

	}

	getDataList(data):Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.getMemberAccountInfo,
			query:data
		}).toPromise().then(res=>{
			let data=res
			if (data.status==200) {
				return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
		})
	}

	getCountInfo():Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.countMemberAccount
		}).toPromise().then(res=>{
			let data=res
			if (data.status==200) {
				return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
		})
	}

	getNotAccountMember():Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.getNotAccountMember
		}).toPromise().then(res=>{
			let data=res
			if (data.status==200) {
				return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
		})
	}



}