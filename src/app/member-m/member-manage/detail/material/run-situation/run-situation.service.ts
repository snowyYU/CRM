import { Injectable } from '@angular/core';
import { MyHttp } from '../../../../../../services/myHttp/myhttp.service'
import { MyHttpClient } from '../../../../../../services/myHttp/myhttpClient.service'


export interface SendData{
	memberId
	operatePattern//	经营模式：			
	// operatePatternDic			
	employeeNum//企业员工数量
	turnover//年营业额						
	operatingArea//营业面积

	mcacctmonthlyWate//	主要结算账户月均流水			
	mainacctdailyFlow//主要留存账户日均流水
	upcooperClosing//与上游主要的结算周期					
	upcoopertime//与上游合作最长时间
	mainTrading//	主要交易方式
	// mainTradingDic				
	operateArea//业务区域
	operateArea2
	salaryPayStatus//工资支出情况
	// salaryPayStatusDic			    
	insurance//购买保险情况
	// insuranceDic
	infoLevel//信息化程度
	// infoLevelDic
	attachList
}

@Injectable()
export class RunSituationService {
	
	constructor(
		private myHttp:MyHttpClient
		) {}

	getDetailData(memId):Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.getOperationSituation,
			query:{
				memberId:memId
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

	getDictionaryData(type:string):Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.getDictList,
			query:{
				type:type
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



	/**
	 * 查看图片或文件的地址
	 * @param  {[type]}       id [description]
	 * @return {Promise<any>}    [description]
	 */
	getFileUrl(id){
		return this.myHttp.sShow(id,1)
				
	}

	deleteFile(memberId,attachId,fileLoadId):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.deleteAttach,
			query:{
				memberId:memberId,
				attachId:attachId,
				fileLoadId:fileLoadId
			}
			}).toPromise()
				.then(res=>{
					let data=res
					if (data.status==200) {
						return Promise.resolve(data)
					}else{
						return Promise.reject(data)
					}
				})
				
	}

	saveData(data:SendData):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.saveRunInfo,
			body:data
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