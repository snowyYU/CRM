import { Injectable } from '@angular/core'
import { MyHttp } from '../../../../services/myHttp/myhttp.service'
import { MyHttpClient } from '../../../../services/myHttp/myhttpClient.service'

@Injectable()
export class AuthDetailService{
	constructor(
		private myHttp:MyHttpClient
		){}

	getData(id:number):Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.authMemberDetail,
			query:{
				authId:id
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

	getFileUrl(id,mode?):any{
		return this.myHttp.sShow(id,mode)

	}
	downLoadFile(id){
		return this.myHttp.sDownLoad(id)
	}

}