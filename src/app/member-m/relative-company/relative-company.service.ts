import { Injectable } from '@angular/core';
import { MyHttp } from '../../../services/myHttp/myhttp.service'

@Injectable()
export class RelativeCompanyService {
	
	constructor(
		private myHttp:MyHttp
		) {}

	getDataList(page,rows):Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.getRcCompanyList,
			query:{
				page:page,
				rows:rows
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