import { Injectable } from '@angular/core';
import { MyHttp } from '../../../../services/myHttp/myhttp.service'
import { MyHttpClient } from '../../../../services/myHttp/myhttpClient.service'

@Injectable()
export class DetailService {

	constructor(
		private myHttp: MyHttpClient
	) { }

	getLoanDetails(id:string): Promise<any> {
		return this.myHttp.post({
			api: this.myHttp.api.getLoanDetails,
			query: {
				borrowApplyId:id
			}
		}).toPromise().then(res=>{
			let data=res
			if (data.status==200) {
				return Promise.resolve(data)
			} else {
				return Promise.reject(data)
			}
		})
	}

	getRepaymentPlan(id:string): Promise<any> {
		return this.myHttp.post({
			api: this.myHttp.api.getRepaymentPlanList,
			query: {
				borrowApplyId:id
			}
		}).toPromise().then(res=>{
			let data=res
			if (data.status==200) {
				return Promise.resolve(data)
			} else {
				return Promise.reject(data)
			}
		})
	}
}