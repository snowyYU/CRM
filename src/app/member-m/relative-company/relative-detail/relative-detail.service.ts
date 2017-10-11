import { Injectable } from '@angular/core';
import { MyHttp } from '../../../../services/myHttp/myhttp.service'


@Injectable()
export class RelativeDetailService {
	
	constructor(
		private myHttp:MyHttp
		) {}

	getDetailData(id):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.getMembers,
			query:{
				companyId:id
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