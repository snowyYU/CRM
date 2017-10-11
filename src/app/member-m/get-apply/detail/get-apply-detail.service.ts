import { Injectable } from '@angular/core'
import { MyHttp } from '../../../../services/myHttp/myhttp.service'

@Injectable()
export class GetApplyDetailService{
	constructor(
		private myHttp:MyHttp
		){}

	getData(id:number):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.getApplyDetail,
			query:{
				creditAuthId:id
			}
		}).toPromise().then(res=>{
			let data=res.json();
			if (data.status==200) {
				 return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
		})
	}



}