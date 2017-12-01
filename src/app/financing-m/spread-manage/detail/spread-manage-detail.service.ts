import { Injectable } from '@angular/core';
import { MyHttp } from '../../../../services/myHttp/myhttp.service'
import { MyHttpClient } from '../../../../services/myHttp/myhttpClient.service'


export interface SendData{
    rolloverApplyId?:string  //展期申请ID
    // remarks?:string          //申请理由
    status?:number           //展期审批状态
    auditOneRemarks?:string  //一审意见
}

@Injectable()
export class SpreadManageDetailService {
	
	constructor(
		private myHttp:MyHttpClient,
        ) {}
        
	getRolloverDetail(id:string):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.getRolloverDetail,
			query:{
                rolloverApplyId:id
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

    getfinanceApply(id:string):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.getfinanceApply,
			query:{
                borrowApplyId:id
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

    getRepaymentPlan(id:string):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.getRepaymentPlan,
			query:{
                borrowApplyId:id
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

    saveRollover(queryData:SendData):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.saveRollover,
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