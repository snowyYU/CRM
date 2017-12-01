import { Injectable } from '@angular/core';
import { MyHttp } from '../../../../../../services/myHttp/myhttp.service'
import { MyHttpClient } from '../../../../../../services/myHttp/myhttpClient.service'

export interface BankCardSubmitData{
	memberId	//必输项 会员ID
	operation	//必输项 操作状态 1.新增申请，2.更新申请，3.删除申请，4.正常
	cardId?	//编辑申请和删除申请需要必填，新增申请不需要
	cardNo?	//编辑和新增必填
	cardName?	//编辑和新增必填
	bankName?	//编辑和新增必填
	subbankName?	//编辑和新增必填
	lineNo?	//编辑和新增必填
	type	//必输项 银行卡类型（0：收款卡；1：还款卡）
}
interface AreaAddress{
	parentCode:number;
	level:number;
	name?:number
}

export interface Part1Data{
	memberId//会员ID：
	borrwerPerson//姓名：						
	borrwerIdcard//身份证号码 	
	borrwerDegree//最高学历: 	   			
	borrwerMobile//联系手机	
	borrwerMarry//婚姻状况(字典：marryType)：
	attachList	
}

export interface Part2Data{
	memberId//会员ID：	
	companyName//公司名称：						
	companyType//公司类型（字典:guest_company_type） 
	registerCapital//注册资金					
	foundTime//注册时间 							
 	linkName//联系人							
 	linkMobile//联系手机 							
	licenceNum//营业执照号						
	companyAddress//企业地址 	
	attachList	

}

export interface Part3Data{
	memberId//会员ID： 			
	legalPerson//法人姓名 				 			
	legalIdcard//法人身份证：				
	legalDegree//最高学历		 					
	legalMarry//婚姻状况（字典：marryType）	
	legalMobile//联系手机 			
}

export interface Part4Data{
	memberId//会员ID：
	attachList
}

@Injectable()
export class CompanyInfoService {
	
	constructor(
		private myHttp:MyHttpClient
		) {}

	getDetailData(id):Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.memberCompanyInfo,
			query:{
				memberId:id
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

	//获取婚姻单选数据
	getMarrySelect():Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.getDictList,
			query:{
				type:'marryType'
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
	//获取公司类型
	getCompanyType():Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.getDictList,
			query:{
				type:'guest_company_type'
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
	//获取地区类数据

	getAddress(param:AreaAddress):Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.areaAddress,
			query:{
				parentCode:param.parentCode,
				level:param.level,
				name:param.name
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

	//获取账户类型
	getAccTypeList():Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.getDictList,
			query:{
				type:'bank_card_type'
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

	//四个保存编辑
	saveCompanyBorrower(data:Part1Data):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.saveCompanyBorrower,
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
	saveCompanyInfo(data:Part2Data):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.saveCompanyInfo,
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
	saveCompanyLegal(data:Part3Data):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.saveCompanyLegal,
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

	//银行卡编辑部分的接口
	saveCompanyBankCard(data:Part4Data):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.saveCompanyBankCard,
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

	getBanks(keyword):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.getBanks,
			query:{
				keyword:keyword
			}
		}).toPromise().then(res=>{
			if (res.status==200) {
				return Promise.resolve(res)
			}else{
				return Promise.reject(res)
			}
		})
	}

	getSubbankList(bankName,subbank):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.getSubbankList,
			query:{
				name:bankName,
				subbank:subbank
			}
		}).toPromise().then(res=>{
			if (res.status==200) {
				return Promise.resolve(res)
			}else{
				return Promise.reject(res)
			}
		})
	}

	updateApply(memberId,companyBankCard:any[]):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.updateApply,
			query:{
				memberId:memberId,
				companyBankCardVos:companyBankCard
			}
		}).toPromise().then(res=>{
			if (res.status==200) {
				return Promise.resolve(res)
			}else{
				return Promise.reject(res)
			}
		})
	}

	upBankCardApply(card:BankCardSubmitData):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.upBankCardApply,
			query:card
		}).toPromise().then(res=>{
			if (res.status==200) {
				return Promise.resolve(res)
			}else{
				return Promise.reject(res)
			}
		})
	}



}