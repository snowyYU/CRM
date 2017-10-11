import { Injectable } from '@angular/core';
import { MyHttp } from '../../../../../services/myHttp/myhttp.service'

@Injectable()
export class MemberReportService {
	
	constructor(
		private myHttp:MyHttp
		) {}

	getDetailData(memId):Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.getMemberReports,
			query:{
				memberId:memId
			}
		}).toPromise().then(res=>{
			let data=res.json()
			if (data.status==200) {
				return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
		})
	}

	/**
	 * 查看图片或文件的地址
	 * @param  {[type]}       id [description]
	 * @return {Promise<any>}    [description]
	 */
	getFileUrl(id){
		return this.myHttp.sShow(id,1)
				
	}

}