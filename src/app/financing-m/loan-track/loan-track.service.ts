import { Injectable } from '@angular/core';
import { MyHttp } from '../../../services/myHttp/myhttp.service'
import { MyHttpClient } from '../../../services/myHttp/myhttpClient.service'

export interface SendData{
	rows:number
	page:number
	borrowApplyId:string      //借款申请ID
	companyName:string        //企业名称
	// approveAmount:number      //借款金额
	// productName:string        //贷款产品
	// repaymentWay:number       //还款方式
	// remarks:string            //状态备注
	status:number            
}

@Injectable()
export class LoanTrackService {
	
	constructor(
		private myHttp:MyHttpClient
		) {}

	//appId
	// getAllApp():Promise<any>{
	// 	return this.myHttp.get({
	// 		api:this.myHttp.api.getAllApp,

	// 	}).toPromise().then(res=>{
	// 		let data=res
	// 		if (data.status==200) {
	// 			return Promise.resolve(data)
	// 		}else{
	// 			return Promise.reject(data)
	// 		}
	// 	})
	// }

	//productsId
	// getProductsList(id:string):Promise<any>{
	// 	return this.myHttp.post({
	// 		api:this.myHttp.api.getProductsList,
	// 		query:{
	// 			appId:id
	// 		}
	// 	}).toPromise().then(res=>{
	// 		let data=res
	// 		if (data.status==200) {
	// 			return Promise.resolve(data)
	// 		}else{
	// 			return Promise.reject(data)
	// 		}
	// 	})
	// }

	getLoanList(sendData:SendData):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.getLoanList,
			query:sendData
		}).toPromise().then(res=>{
			let data=res
			if (data.status==200) {
				return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
		})
	}

	getRepaymentPlanList(borrowApplyId:string):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.getRepaymentPlanList,
			query:{borrowApplyId:borrowApplyId}
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