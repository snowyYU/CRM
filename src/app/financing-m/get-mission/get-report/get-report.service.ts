import { Injectable } from '@angular/core';
import { MyHttp } from '../../../../services/myHttp/myhttp.service'
import { MyHttpClient } from '../../../../services/myHttp/myhttpClient.service'

export interface SendData{
    taskId:string              //任务ID
    reportId?:string            //报告ID
	howtodo?:number             //措施
	actionTime?:string          //执行时间
	status?:number              //状态（1：在跟踪，2：结束）
	nextwork?:string            //下一步工作
	remark?:string              //描述
	attchFile1?:string          //附件1
	attchFile2?:string          //附件2
}

@Injectable()
export class GetReportService {
	
	constructor(
		private myHttp:MyHttpClient
		) {}
    getOverdueReportDetails(queryData:SendData):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.getOverdueReportDetails,
			query:queryData
		}).toPromise().then(res=>{
			let data=res
			if (data.status==200) {
				return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
		})
    }
    
    saveData(queryData:SendData):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.createOverdueReport,
			query:queryData
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