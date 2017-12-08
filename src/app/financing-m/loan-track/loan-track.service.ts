import { Injectable } from '@angular/core';
import { MyHttp } from '../../../services/myHttp/myhttp.service'
import { MyHttpClient } from '../../../services/myHttp/myhttpClient.service'

export interface SendData{
	rows:number
	page:number
	status:string             //状态
	serviceMan:string         //服务经理
	borrowApplyId?:string     //借款申请ID
	companyName?:string       //企业名称
	isOver?:string            //是否查询逾期,逾期传1 不逾期不传
	limitDay?:string          //距离到期天数
}

@Injectable()
export class LoanTrackService {
	
	constructor(
		private myHttp:MyHttpClient
		) {}

	getLoanList(sendData:SendData):Promise<any>{
		return this.myHttp.get({
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