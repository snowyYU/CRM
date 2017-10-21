import { Injectable } from '@angular/core';
import { MyHttp } from '../../../services/myHttp/myhttp.service'
import { MyHttpClient } from '../../../services/myHttp/myhttpClient.service'


export interface SendData{
	appId			//渠道id 					
	memberName			//会员名称 				
						
	memberType			//会员类别（1：企业；2个人）  
			
	accountName			//账户名称				
	inGoldType			//入金账户类型选择		
}

@Injectable()
export class ElectricAccService {
	
	constructor(
		private myHttp:MyHttpClient
		){}

	//accountType
	getAccountType():Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.getDictList,
			query:{
				type:'member_type'
			}
		}).toPromise().then(res=>{
			let data=res
			if (data.status==200) {
				return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
		})
	}

	getDetailData(key):Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.getSingleMemberAccountInfo,
			query:{
				searchKey:key
			}
		}).toPromise().then(res=>{
			let data=res
			if (data.status==200) {
				return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
		})
	}

	//开户
	openMemberAccount(data:SendData):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.openMemberAccount,
			query:data
		}).toPromise().then(res=>{
			console.log(res)
			let data=res
			console.log(data)
			if (data.status==200) {
				return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
		})
	}


	destroyAcc(accountId,appId,memberId):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.accountCancellation,
			query:{
				accountId:accountId,
				appId:appId,
				memberId:memberId
			}
		}).toPromise().then(res=>{
			let data=res
			if (data.status==200) {
				return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
		})
	}

	getByMemberName(memberName):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.getByMemberName,
			query:{
				memberName:memberName
			}
		}).toPromise().then(res=>{
			if (res.status==200) {
				return Promise.resolve(res)
			}else{
				return Promise.reject(res)
			}
		})
	}


}