import { Injectable } from '@angular/core';
import { MyHttp } from '../../../../services/myHttp/myhttp.service'
import { MyHttpClient } from '../../../../services/myHttp/myhttpClient.service'

@Injectable()
export class DetailService {

	constructor(
		private myHttp: MyHttpClient
	) { }

	applyDetail(id:string): Promise<any> {
		return this.myHttp.get({
			api: this.myHttp.api.applyDetail,
			query: {
				borrowApplyId:id
			}
		}).toPromise().then(res=>{
			let data=res
			if (data.status==200) {
				return Promise.resolve(data)
			} else {
				return Promise.reject(data)
			}
		})
	}

	proveDataList(id:string): Promise<any> {
		return this.myHttp.post({
			api: this.myHttp.api.proveDataList,
			query: {
				borrowApplyId:id
			}
		}).toPromise().then(res=>{
			let data=res
			if (data.status==200) {
				return Promise.resolve(data)
			} else {
				return Promise.reject(data)
			}
		})
	}

	contractList(id:string): Promise<any> {
		return this.myHttp.post({
			api: this.myHttp.api.contractList,
			query: {
				borrowApplyId:id
			}
		}).toPromise().then(res=>{
			let data=res
			if (data.status==200) {
				return Promise.resolve(data)
			} else {
				return Promise.reject(data)
			}
		})
	}

	getBorrowFlowList(id:string): Promise<any> {
		return this.myHttp.get({
			api: this.myHttp.api.getBorrowFlowList,
			query: {
				borrowApplyId:id
			}
		}).toPromise().then(res=>{
			let data=res
			if (data.status==200) {
				return Promise.resolve(data)
			} else {
				return Promise.reject(data)
			}
		})
	}

	getRepaymentPlan(id:string): Promise<any> {
		return this.myHttp.post({
			api: this.myHttp.api.getRepaymentPlanList,
			query: {
				borrowApplyId:id
			}
		}).toPromise().then(res=>{
			let data=res
			if (data.status==200) {
				return Promise.resolve(data)
			} else {
				return Promise.reject(data)
			}
		})
	}

	logList(id:string): Promise<any> {
		return this.myHttp.post({
			api: this.myHttp.api.logList,
			query: {
				type:'0',
				id:id,
				status2:'2,3'
			}
		}).toPromise().then(res=>{
			let data=res
			if (data.status==200) {
				return Promise.resolve(data)
			} else {
				return Promise.reject(data)
			}
		})
	}

		/**
	 * 查看图片或文件的地址
	 * @param  {[type]}       id [description]
	 * @return {Promise<any>}    [description]
	 */
	getFileUrl(id,mode?){
		return this.myHttp.sShow(id,mode)
				
	}

	downLoadFile(id){
		return this.myHttp.sDownLoad(id)
	}
}