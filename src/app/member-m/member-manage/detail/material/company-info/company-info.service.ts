import { Injectable } from '@angular/core';
import { MyHttp } from '../../../../../../services/myHttp/myhttp.service'
import { MyHttpClient } from '../../../../../../services/myHttp/myhttpClient.service'


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
	getFileUrl(id){
		return this.myHttp.sShow(id,1)
				
	}

	deleteFile(id):Promise<any>{
		return this.myHttp.sDelete(id)
				.toPromise()
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

	//四个保存编辑
	saveCompanyBorrower(data:Part1Data):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.saveCompanyBorrower,
			query:data
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
			query:data
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
			query:data
		}).toPromise().then(res=>{
			let data=res
			if (data.status==200) {
				return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
			
		})
	}
	saveCompanyBankCard(data:Part4Data):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.saveCompanyBankCard,
			query:data
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




}