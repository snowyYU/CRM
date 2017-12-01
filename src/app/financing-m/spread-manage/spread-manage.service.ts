import { Injectable } from '@angular/core';
import { MyHttp } from '../../../services/myHttp/myhttp.service'
import { MyHttpClient } from '../../../services/myHttp/myhttpClient.service'


export interface SendData{
	rows:number
    page:number
    status?:number
    companyName?:string
}

@Injectable()
export class SpreadManageService {
	
	constructor(
		private myHttp:MyHttpClient,
		) {}

     getStatusList():Promise<any>{
        return this.myHttp.get({
			api:this.myHttp.api.getDictList,
			query:{
                type:'rollover_status'
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

	getDataList(sendData:SendData):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.getRolloverList,
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