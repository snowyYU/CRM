import { Injectable } from '@angular/core';
import { MyHttp } from '../../../../services/myHttp/myhttp.service'
import { MyHttpClient } from '../../../../services/myHttp/myhttpClient.service'

export interface SendData{
	memberId:number			//会员ID
	// productId:number			//产品ID
	oldCreditValue:number		//原授信额
	operateType:number			//操作类型，0：新增授信；1：重新授信型；
	addCreditValue:number		//新增授信额
	appId:number				//渠道ID
	// expiryDateBegin?:string		//有效期(开始)：格式：yyyy-MM-dd
	// expiryDateEnd?:string		//有效期(结束)：格式：yyyy-MM-dd
	authRemark:string			//申请理由
}

@Injectable()
export class NewApplyService {
	
	constructor(
		private myHttp:MyHttpClient
		) {}

	getProductsList(id:number):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.getProductsList,
			query:{
				appId:id
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

	getProductsParam(appId,productId):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.getProductsParam,
			query:{
				appId:appId,
				productId:productId
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


	checkApplyExist(operateType,memberId,productId):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.checkApplyExist,
			query:{
				operateType:operateType,
				memberId:memberId,
				productId:productId
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

	submitData(data:SendData):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.creditAuthApply,
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


}