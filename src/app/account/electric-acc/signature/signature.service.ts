import { Injectable } from '@angular/core';
import { MyHttp } from '../../../../services/myHttp/myhttp.service'
import { MyHttpClient } from '../../../../services/myHttp/myhttpClient.service'


@Injectable()
export class SignatureService {
	
	constructor(
		private myHttp:MyHttpClient
		){}

	

	getDetailData(key):Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.getMemberByKeyword,
			query:{
				keyword:key
				
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

	//开通电子签章
	openSignature(memberId,type):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.createUser,
			query:{
				memberId:memberId,
				type:type
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


	destroyAcc(memberId,userId,type):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.deleteUserSeal,
			query:{
				memberId:memberId,
				userId:userId,
				type:type
				
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


}