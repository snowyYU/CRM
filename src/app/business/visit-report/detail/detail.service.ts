import { Injectable } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';

import { MyHttp } from '../../../../services/myHttp/myhttp.service'
import { MyHttpClient } from '../../../../services/myHttp/myhttpClient.service'

@Injectable()
export class DetailService{
	constructor(
		private myHttp:MyHttpClient,
		private route:ActivatedRoute
		){
		console.log
	}

	getData():Promise<any>{

		return this.myHttp.post({
			api:this.myHttp.api.visitReportDetail,
			query:{
				timetableId:this.route.params['value']['id']
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