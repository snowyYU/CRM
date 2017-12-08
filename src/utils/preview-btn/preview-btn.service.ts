import { Injectable } from '@angular/core';
import { MyHttpClient } from '../../services/myHttp/myhttpClient.service'
import { file_api } from '../../services/config/app.config'
@Injectable()
export class PreviewBtnService {
	
	constructor(
		private myHttp:MyHttpClient
		) {}

	getFileInfo(fileId):Promise<any>{
		return this.myHttp.post({
				url:file_api.getInfo,
				body:{
					fileId:fileId
				}
			}).toPromise().then(res=>{
				return Promise.resolve(res)
			})
	}
	getFileUrl(id,mode?){
		return this.myHttp.sShow(id,mode)
				
	}
	downLoadFile(id){
		return this.myHttp.sDownLoad(id)
	}

}