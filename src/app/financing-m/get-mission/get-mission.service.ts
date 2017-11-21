import { Injectable } from '@angular/core';
import { MyHttp } from '../../../services/myHttp/myhttp.service'
import { MyHttpClient } from '../../../services/myHttp/myhttpClient.service'

export interface SendData{
    status?:number              //状态（0:新建 1：在跟踪，2：结束）
    taskId?:string              //任务ID
    serviceMan?:string          //服务经理
    memberId?:string            //会员ID
    borrowApplyId?:string       //借款申请ID
    repaymentPlan?:string       //还款期数（格式：2/3期）
    repaymentPrinciple?:number  //还款本金
    repaymentInterest?:number   //还款利息
}

@Injectable()
export class GetMissionService {
	
	constructor(
		private myHttp:MyHttpClient
        ) {}

    getTotalByStatus(queryData:SendData):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.getTotalByStatus,
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

    getStatusAndRepaymentTotal(queryData:SendData):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.getStatusAndRepaymentTotal,
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

    getOverdueTaskList(queryData:SendData):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.getOverdueTaskList,
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

    getOverdueTaskDetails(queryData:SendData):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.getOverdueTaskDetails,
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
    createOverdueTask(queryData:SendData):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.createOverdueTask,
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
    updateOverdueTask(queryData:SendData):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.updateOverdueTask,
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
    
    getOverdueReportList(queryData:SendData):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.getOverdueReportList,
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