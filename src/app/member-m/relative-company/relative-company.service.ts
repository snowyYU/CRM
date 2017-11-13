import { Injectable } from '@angular/core';
import { MyHttp } from '../../../services/myHttp/myhttp.service'
import { MyHttpClient } from '../../../services/myHttp/myhttpClient.service'

export interface SendData{
	rows:number
	page:number
}

@Injectable()
export class RelativeCompanyService {
	
	constructor(
		private myHttp:MyHttpClient
		) {}

	getDataList(sendData:SendData):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.getRcCompanyList,
			query:sendData
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