import { Injectable } from '@angular/core';
import { MyHttp } from '../../../../services/myHttp/myhttp.service'
import { MyHttpClient } from '../../../../services/myHttp/myhttpClient.service'


@Injectable()
export class RelativeDetailService {
	
	constructor(
		private myHttp:MyHttpClient
		) {}

	getDetailData(id):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.getMembers,
			query:{
				companyId:id
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