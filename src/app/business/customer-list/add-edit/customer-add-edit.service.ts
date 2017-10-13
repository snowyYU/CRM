import { Injectable } from '@angular/core'

import { MyHttp } from '../../../../services/myHttp/myhttp.service'
import { MyHttpClient } from '../../../../services/myHttp/myhttpClient.service'

import { PopService } from 'dolphinng';
import { SendData } from './sendData'

interface AreaAddress{
	parentCode:number;
	level:number;
	name?:string
}

@Injectable()
export class CustomerAddEditService{
	constructor(
			private myHttp:MyHttpClient,
			private popService:PopService
		){}


	getEditData(id:number):Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.customerDetail,
				query:{
					guestId:id
				}
			}).toPromise().then(res=>{
				if (res.status==200) {
					return Promise.resolve(res)
				}else{
					return Promise.reject(res)
				}
				
			})
	}

	//获取几个下拉列表数据

	getDictListData(type:string):Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.getDictList,
			query:{
				type:type
			}
		}).toPromise().then(res=>{
				if (res.status==200) {
					return Promise.resolve(res)
				}else{
					return Promise.reject(res)
				}
				
			})
	}

	//获取归属渠道下拉列表数据

	getBelongAppData():Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.getAllApp,

		}).toPromise().then(res=>{
				if (res.status==200) {
					return Promise.resolve(res)
				}else{
					return Promise.reject(res)
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
			if (res.status==200) {
				return Promise.resolve(res)
			}else{
				return Promise.reject(res)
			}
			
		})
	}

	//提交

	submitData(data:SendData):Promise<any>{
		return this.myHttp.post({
					api:this.myHttp.api.saveOrUpdateGuest,
					query:data
				}).toPromise().then(res=>{
					let response=res;
					if (response.status==200) {
						return Promise.resolve(response)
					}else{
						return Promise.reject(response)
					}
					
				})
	}


	
	
}