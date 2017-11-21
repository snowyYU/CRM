import { Injectable } from '@angular/core';
import { MyHttp } from '../../../../services/myHttp/myhttp.service'
import { MyHttpClient } from '../../../../services/myHttp/myhttpClient.service'

export interface SendData {
	memberId:string            //会员ID
	borrowApplyId: string      //借款申请ID
	paymentWay: number         //还款方式
}

@Injectable()
export class DetailService {

	constructor(
		private myHttp: MyHttpClient
	) { }


	getLoanDetails(queryData): Promise<any> {
		return this.myHttp.post({
			api: this.myHttp.api.getLoanDetails,
			query: queryData
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