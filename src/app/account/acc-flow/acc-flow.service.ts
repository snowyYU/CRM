import { Injectable } from '@angular/core';
import { MyHttp } from '../../../services/myHttp/myhttp.service'
import { MyHttpClient } from '../../../services/myHttp/myhttpClient.service'

export interface SendData{
	rows:number
	page:number
	appId
	startTime?
	endTime?
	tradeType?
	memberName?
}

@Injectable()
export class AccFlowService {
	
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
	//tradeType
	getTradeType():Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.getDictList,
			query:{
				type:'account_trade_type'
			}
		}).toPromise().then(res=>{
			let data=res
			if (data.status==200) {
				data.body.records.unshift({label:'全部',value:''})

				return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
		})
	}

	getDataList(data):Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.getMemberAcctFlows,
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