import { Injectable } from '@angular/core';
import { MyHttp } from '../../../../services/myHttp/myhttp.service'

@Injectable()
export class MemberDetailService {
	
	constructor(
		private myHttp:MyHttp
		) {


	}

	getMainDetail(id):Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.memberDetailMain,
			query:{
				memberId:id
			}
		}).toPromise().then(res=>{
			let data=res.json()
			if (data.status==200) {
				return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
		})
	}
}