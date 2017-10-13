import { Injectable } from '@angular/core';

import { MyHttp } from '../../../services/myHttp/myhttp.service'
import { MyHttpClient } from '../../../services/myHttp/myhttpClient.service'

import { SendData } from './sendData'


@Injectable()
export class InfoChangeService{
	status:number;
	constructor(
		private myHttp:MyHttpClient
	){}

	getListData(param:SendData):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.infoChangeList,
			query:{
				status:param.status,
				rows:param.rows,
				page:param.page
			}
		}).toPromise().then(res=>{
			let data=res
			if (data.status==200) {
				return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
		})
	};

}
