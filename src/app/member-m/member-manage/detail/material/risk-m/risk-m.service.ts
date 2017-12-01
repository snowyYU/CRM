import { Injectable } from '@angular/core';
import { MyHttp } from '../../../../../../services/myHttp/myhttp.service'
import { MyHttpClient } from '../../../../../../services/myHttp/myhttpClient.service'


export interface Part1Data{
			memberId	//会员ID：
			buyCarYear    //家用轿车购买年份					
			carValue    //轿车价值
			carNum    //自有运营车辆数量						
			nativeRenting    //本地租房状况(字典)	
			houseNum    //自有房产套数					
			houseValue    //住房价值
			debtReceivableValue    //应收账款价值		    
			debtReceivableLimit    //应付账款额度
			attachList
}
export interface Part2Data{
			memberId		//会员ID：
			creditDebtSituation		//征信负债状况			
			houseMortgageLoanamt		//住房按揭贷款金额
			mortgageLoanamtRate		//低压贷占总贷款比例			
			repayLoanamtPermonth		//申请人每月偿还的贷款额
			accountspayable		//应付账款	
}
export interface Part3Data{
			memberId		//会员ID：
			maxamtofoverdueCreditcard  //信用卡最大逾期金额			
			maxamtofoverdueLoan  //贷款最大逾期金额
			overdueNum  //信用卡、贷款逾期次数							
			overdueDay  //信用卡、贷款最大逾期天数
			housemortgageloanOverdueNum  //租房按揭贷款逾期次数 		
			inquiriesnumWithintwoyear  //两年内征信被查询次数
			inquiriesnumWithinthreemonth  //3个月内征信被查询次数		
			memberRatingGrate  //征信评级：
			attachList
}

@Injectable()
export class RiskMService {
	constructor(
		private myHttp:MyHttpClient
		) {}

	getDetailData(memId):Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.getRiskFill,
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
	getFileUrl(id,mode?){
		return this.myHttp.sShow(id,mode)
				
	}

	downLoadFile(id){
		return this.myHttp.sDownLoad(id)
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

	//三块的保存
	save1(data:Part1Data):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.saveCompanyAsset,
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
	save2(data:Part2Data):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.saveCompanyDebt,
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
	save3(data:Part3Data):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.saveCompanyCredit,
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
