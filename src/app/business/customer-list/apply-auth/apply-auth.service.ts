import { Injectable } from '@angular/core';
import { MyHttp } from '../../../../services/myHttp/myhttp.service'
import { MyHttpClient } from '../../../../services/myHttp/myhttpClient.service'

interface AreaAddress{
	parentCode:number;
	level:number;
	name?:string
}


@Injectable()
export class ApplyAuthService{
	constructor(
			private myHttp:MyHttpClient
			
		){}

	getData(id:number):Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.customerDetail,
			query:{
				guestId:id
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

	getTypeList():Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.getDictList,
			query:{
				type:'auth_member_type'
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
	getIsLegal():Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.getDictList,
			query:{
				type:'auth_is_legal'
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



	getBigClassify():Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.getBigClassifyList,
			
		}).toPromise().then(res=>{
			let data=res
			if (data.status==200) {
				return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
		})
	}
	getClassifyL(code):Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.getClassifyList,
			query:{
				bigClassifyCode:code
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

	deleteAttachment(id):Promise<any>{
		return this.myHttp.sDelete(id)
				.toPromise()
				.then(res=>{
					let data=res
					console.log(data)
					if (data.status==200) {
						// code...
						return Promise.resolve(data)
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

	saveData(data):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.authMemberApply,
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


	//新增可修改的部分

	//获取几个下拉列表数据,根据字典值

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



}