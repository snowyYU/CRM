import { Injectable } from '@angular/core'
import { MyHttp } from '../../../../services/myHttp/myhttp.service'
import { MyHttpClient } from '../../../../services/myHttp/myhttpClient.service'

@Injectable()
export class GetApplyDetailService{
	constructor(
		private myHttp:MyHttpClient
		){}

	getData(id:number):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.getApplyDetail,
			query:{
				creditAuthId:id
			}
		}).toPromise().then(res=>{
			let data=res;
			if (data.status==200) {
				 return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
		})
	}



}