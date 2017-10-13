import { Injectable } from '@angular/core'
import { MyHttp } from '../../../services/myHttp/myhttp.service'
import { MyHttpClient } from '../../../services/myHttp/myhttpClient.service'


//获取list发送的参数格式
export interface SendData{
	rows:number;
	page:number;
	appId?:string
	memberType?:string
	companyName?:string

}

@Injectable()
export class MemberManageService{
	constructor(
		private myHttp:MyHttpClient
		){}
	//获取列表查询条件的两个下拉
	//appId
	getAllApp():Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.getAllApp,

		}).toPromise().then(res=>{
			let data=res
			if (data.status==200) {
				data.body.records.unshift({resourceName:'全部',resourceId:''})
				return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
		})

	}
	//memberType
	getMemberType():Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.getDictList,
			query:{
				type:'auth_member_type'
			}
		}).toPromise().then(res=>{
			let data=res
			if (data.status==200) {
				data.body.records.unshift({label:'全部',value:''})

				return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
		})
	}

	//获取列表数据
	getListData(sendData:SendData):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.vipManageList,
			query:sendData
		}).toPromise().then(res=>{
			let data=res
			if (data.status==200) {
				return Promise.resolve(data)
				
			}else{
				return Promise.reject(data)
			}
		})
	}

	//获取模态框的数据
	getModalData(id:number):Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.getCreditFacilityList,
			query:{
				memberId:id
			}
		}).toPromise().then(res=>{
			let data=res
			if (data.status==200) {
				let totalCreditValue:number=0
				let totalCreditBanlance:number=0
				if (data.body.records[0].creditFacility) {
					let array=data.body.records.map(e=>{
						totalCreditValue+=e.creditFacility.creditValue
						totalCreditBanlance+=e.creditFacility.creditBanlance
						let serverTime=new Date(e.serverTime)
						let expiryDateEnd=new Date(e.creditFacility.expiryDateEnd)
						
						e.lineThrough=(serverTime>expiryDateEnd)
						return e
					})
					data.body.records=array;
					data.body.totalCreditValue=totalCreditValue
					data.body.totalCreditBanlance=totalCreditBanlance
					console.log(data)
					return Promise.resolve(data)
				}else{
					return Promise.resolve(data)
				}
				
				
				
			}else{
				return Promise.reject(data)
			}
		})
	}
	//会员对应产品进行重新授信时，校验对应产品是否已经申请授信且正在审批
	checkApplyExist(operateType,memberId:number,productId:number):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.checkApplyExist,
			query:{
				operateType:operateType,
				memberId:memberId,
				productId:productId
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

	getManageL():Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.getServiceManList
		})
		.toPromise()
		.then(res=>{
			let data=res;
			if (data.status==200) {
				return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
		})
	}

	changeServiceMan(memberId,serviceMan):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.changeServiceMan,
			query:{
				memberId:memberId,
				serviceMan:serviceMan
			}
		})
		.toPromise()
		.then(res=>{
			let data=res;
			if (data.status==200) {
				return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
		})
	}


}