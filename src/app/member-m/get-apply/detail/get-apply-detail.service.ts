import { Injectable } from '@angular/core'
import { MyHttp } from '../../../../services/myHttp/myhttp.service'
import { MyHttpClient } from '../../../../services/myHttp/myhttpClient.service'

@Injectable()
export class GetApplyDetailService{
	constructor(
		private myHttp:MyHttpClient
		){}

	getData(id:string):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.getApplyDetail,
			query:{
				creditAuthId:id
			}
		}).toPromise().then(res=>{
			let data=res;
			if (data.status==200) {
				 return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
		})
	}

	//获取模态框的数据
	getCreditData(id:string):Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.getCreditFacilityList,
			query:{
				memberId:id
			}
		}).toPromise().then(res=>{
			let data=res
			if (data.status==200) {
				if (data.body.records[0].creditFacility) {
					let array=data.body.records.map(e=>{
						let serverTime=new Date(e.serverTime)
						let expiryDateEnd=new Date(e.creditFacility.expiryDateEnd)
						e.lineThrough=(serverTime>expiryDateEnd)
						return e
					})
					data.body.records=array;
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

}