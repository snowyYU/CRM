import { Injectable } from '@angular/core';
import { MyHttp } from '../../../../services/myHttp/myhttp.service'
import { MyHttpClient } from '../../../../services/myHttp/myhttpClient.service'


@Injectable()
export class MemberDetailService {
	
	constructor(
		private myHttp:MyHttpClient
		) {


	}

	getMainDetail(id):Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.memberDetailMain,
			query:{
				memberId:id
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