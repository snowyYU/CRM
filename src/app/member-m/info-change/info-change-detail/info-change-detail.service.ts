import { Injectable } from '@angular/core';
import { MyHttp } from '../../../../services/myHttp/myhttp.service'
import { MyHttpClient } from '../../../../services/myHttp/myhttpClient.service'

export interface SendData{
	updateApplyId:number
	status:number
	applyMessage:string
}

@Injectable()
export class InfoChangeDetailService {
	
	constructor(
		private myHttp:MyHttpClient
		) {}

	//获取详情的数据
	getDetailData(id:number):Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.infoChangeDetail,
			query:{
				updateApplyId:id
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

	//提交审核结果
	submitData(data:SendData):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.infoChangeCheckSubmit,
			query:data
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