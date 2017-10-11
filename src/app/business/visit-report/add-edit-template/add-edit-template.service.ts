import { Injectable } from '@angular/core'
import { MyHttp } from '../../../../services/myHttp/myhttp.service';
import { AuthRoleService } from '../../../../services/authRole/authRole.service';
import { PopService } from 'dolphinng';


interface AreaAddress{
	parentCode:number;
	level:number;
	name?:number
}

export interface SendData{
	serviceMan:string;// :服务经理
	guestName:string;//   客户名称
	linkName:string;//	联系人
	linkMobile:string;//	联系人手机
	visitCity:string;//	城市
	companyAddress:string;//  地址
	visitWhat:string;//   拜访目的
	visitVehicle:string;//  交通
	remark:string;//  备忘录
	visitDate:string;// 拜访日期
	timetableId?:number
}

@Injectable()
export class AddEditTemplateService{

	constructor(
		private myHttp:MyHttp,
		private authRole:AuthRoleService,
		private pop:PopService
		){}
	//详情数据
	getEditData(id:number):Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.visitReportDetail,
			query:{
				timetableId:id
			}
		}).toPromise()
			.then(res=>{
				let data=res.json();
				if (data.status==200) {
					return Promise.resolve(data)
				}else{
					return Promise.reject(res.json())
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
			if (res.json().status==200) {
				return Promise.resolve(res.json())
			}else{
				return Promise.reject(res.json())
			}
			
		})
	}

	//请求下拉字典值

	getSelectList(type:string):Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.getDictList,
			query:{
				type:type
			}
		}).toPromise().then(res=>{
			if (res.json().status==200) {
				return Promise.resolve(res.json())
			}else{
				this.pop.error({
					title:'错误提示',
					text:res.json().message
				})
			}
		}).catch(res=>{
			return Promise.reject(res.json())
		})


	}

	//选择客户列表
	getCustomer(isMember):Promise<any>{
		return this.myHttp.get({
			api:this.myHttp.api.visitReportGetGusetMemberList,
			query:{
				isMember:isMember
			}
		}).toPromise().then(res=>{
			if (res.json().status==200) {
				return Promise.resolve(res.json())
			}else{
				return Promise.reject(res.json())
			}
		})

	}
	//以下三个方法都是提交相同的参数，分别为新增，修改，保存客户信息
	//新增拜访报告的保存
	saveNewReport(data:SendData):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.visitReportAdd,
			query:data
		}).toPromise().then(res=>{
			let data=res.json()
			if (data.status==200) {
				return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
		})
	}
	//修改拜访报告的保存
	saveEditReport(data:SendData):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.visitReportEdit,
			query:data
		}).toPromise().then(res=>{
			let data=res.json();
			if (data.status==200) {
				return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
		})
	}
	//保存客户信息
	saveCustomerInfo(data:SendData):Promise<any>{
		return this.myHttp.post({
			api:this.myHttp.api.visitReportSaveCustomer,
			query:data
		}).toPromise().then(res=>{
			let response=res.json();
			console.log(response)
			if (response.status==200) {
				return Promise.resolve(response)
			}else{
				return Promise.reject(response)
			}
		})
	}

	test(){
		this.pop.error({
			title:'fuck',
			text:'ddd'
		})
	}


}