import { Injectable } from '@angular/core';
import { MyHttp } from '../../../services/myHttp/myhttp.service'

export interface SendData{
	rows:number
	page:number
	qryStatus:number;
	startDate?:string;
	endDate?:string
}

@Injectable()
export class GetApplyService {
	
	constructor(
		private myHttp:MyHttp,
		) {}

	getDataList(sendData:SendData):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.getApplyList,
			query:sendData
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