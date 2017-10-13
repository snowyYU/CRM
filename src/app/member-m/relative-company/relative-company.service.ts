import { Injectable } from '@angular/core';
import { MyHttp } from '../../../services/myHttp/myhttp.service'
import { MyHttpClient } from '../../../services/myHttp/myhttpClient.service'


@Injectable()
export class RelativeCompanyService {
	
	constructor(
		private myHttp:MyHttpClient
		) {}

	getDataList(page,rows):Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.getRcCompanyList,
			query:{
				page:page,
				rows:rows
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