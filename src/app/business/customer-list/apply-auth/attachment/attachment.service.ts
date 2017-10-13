import { Injectable } from '@angular/core';
import { MyHttp } from '../../../../../services/myHttp/myhttp.service'
import { MyHttpClient } from '../../../../../services/myHttp/myhttpClient.service'


@Injectable()
export class AttachmentService {
	
	constructor(
		private myHttp:MyHttpClient
		) {}

	getBigClassify():Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.getBigClassifyList,
			
		}).toPromise().then(res=>{
			let data=res
			if (data.status==200) {
				return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
		})
	}
	getClassifyL(code):Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.getClassifyList,
			query:{
				bigClassifyCode:code
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