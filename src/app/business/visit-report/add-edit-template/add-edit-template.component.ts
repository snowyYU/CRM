import { Component,OnInit } from '@angular/core'
import { Router,ActivatedRoute } from '@angular/router'
import { SendData,AddEditTemplateService } from './add-edit-template.service'
import { AuthRoleService } from '../../../../services/authRole/authRole.service'

import { PopService } from 'dolphinng';


@Component({
	selector:'add-edit-template',
	templateUrl:'./add-edit-template.component.html',
	styleUrls:['./add-edit-template.component.less'],
	providers:[AddEditTemplateService,AuthRoleService]
})
export class AddEditComponent implements OnInit{
	guestName:string;//客户名称
	visitDate:string;//拜访日期
	visitWhat:any//拜访目的值
	visitWhatDic:string;//拜访目的字典
	serviceMan:string;//服务经理
	linkName:string;//联系人
	linkMobile:string;//联系手机
	visitCity:string;//城市
	visitVehicle:any//交通值
	visitVehicleDic:string;//交通字典值
	companyAddress:string;//地址
	remark:string;//备忘录

	isEdit:boolean=false;
	province:string
	city:string
	visitWhatList:any//拜访目的
	visitVehicleList:any//交通下拉列表
	provinceList:any//省份下拉列表
	cityList:any//市下拉列表

	//模态框相关
	customerListShow:boolean;
	modalSize:string='md'
	dataList:any
	selectedCustomer

	loading:boolean
	//
	showCustomerSave:boolean

	isMember:string='2'

	customerDisabled:boolean=false

	constructor(
		private route:ActivatedRoute,
		private router:Router,
		private addEdit:AddEditTemplateService,
		private authRole:AuthRoleService,
		private pop:PopService
		){}
	ngOnInit(){
		this.provinceSelect();
		this.serviceMan=this.authRole.userName;
		//获取两个下拉列表的内容
		this.addEdit.getSelectList('timetable_visit_what')
					.then(res=>{
						this.visitWhatList=res.body.records;
					})
		this.addEdit.getSelectList('timetable_visit_vehicle')
					.then(res=>{
						this.visitVehicleList=res.body.records
					})


		this.getEditData()


	}


	//如果是修改页面，获取详情
	getEditData(){
		if (this.route.params['value']['id']) {
			this.isEdit=true;
			this.addEdit.getEditData(this.route.params['value']['id'])
						.then(res=>{
							this.renderData(res);
						})
		}
	}
	//详情的渲染函数
	renderData(res){
		console.log(res);
		this.guestName=res.body.guestName;//客户名称
		this.visitDate=res.body.visitDate;//拜访日期
		this.visitWhat=res.body.visitWhat;//拜访目的
		this.serviceMan=res.body.serviceMan;//服务经理
		this.linkName=res.body.linkName;//联系人
		this.linkMobile=res.body.linkMobile;//联系手机
		this.visitCity=res.body.visitCity;//城市
		this.visitVehicle=res.body.visitVehicle;//交通
		this.companyAddress=res.body.companyAddress;//地址
		this.remark=res.body.remark;//备忘录
		if (res.body.visitCity) {

				let array=res.body.visitCity.split('-')
				console.log(array)
				switch (array.length) {
					case 1:
						this.province=array[0];
						console.log(this.province)
						break;
					case 2:
						this.province=array[0];
						this.city=array[1];
						this.getCityList(this.province);
						console.log(this.province,this.city)
						break;

					default:

						break;
				}
			}
	}


	//获取地址下拉列表
	//省
	provinceSelect(){
		this.addEdit.getAddress({
			parentCode:0,
			level:1
		}).then(res=>{
			this.provinceList=res.body.records
		})
	}
	//市
	getCityList(v){
		console.log(v);
		//获取省code
		this.addEdit.getAddress({
			parentCode:0,
			level:1,
			name:v
		}).then(res=>{
			return Promise.resolve(res.body.records[0].code)
		}).then(res=>{
			this.addEdit.getAddress({
				parentCode:res,
				level:2
			}).then(res=>{
				console.log(res);
				this.cityList=res.body.records
			})
		})
	}

	choose(){
		this.customerListShow=true
		this.loading=true
		this.isMember='2'
		console.log(this.isMember)
		this.getCustomerList('2')


	}

	getCustomerList(type){
		this.addEdit.getCustomer(type)
					.then(res=>{
						this.dataList=res.body.records
						this.loading=false
					})
					.catch(res=>{
						this.loading=false
					})
	}

	yesModal(){
		console.log(this.selectedCustomer)
		this.guestName=this.selectedCustomer.guestName;
		this.customerListShow=false;
		this.linkName=this.selectedCustomer.linkName;//联系人
		this.linkMobile=this.selectedCustomer.linkMobile;//联系手机
		if (this.selectedCustomer.guestName) {
			this.showCustomerSave=false

		}
		if (this.selectedCustomer.companyAddress) {

				let array=this.selectedCustomer.companyAddress.split('-')
				console.log(array)
				switch (array.length) {
					case 1:
						this.province=array[0];
						console.log(this.province)
						break;
					case 2:
						this.province=array[0];
						this.city=array[1];
						this.getCityList(this.province);
						console.log(this.province,this.city)
						break;
					case 3:
						this.province=array[0];
						this.city=array[1];
						this.getCityList(this.province);
						console.log(this.province,this.city)
						this.companyAddress=array[2];

						break;

					default:

						break;
				}
			}

		this.customerDisabled=true


	}

	closeModal(){
		this.customerListShow=false

	}

	focusFun(){
		console.log(1111)
		this.guestName=''
		this.showCustomerSave=true
	}

	enable(){
		this.customerDisabled=false

	}

	//以下三个方法都是提交相同的参数，分别为新增，修改，保存客户信息
	//保存新增报告
	saveNewReport(){
		let sendData:SendData={
			serviceMan:this.serviceMan,// :服务经理
			guestName:this.guestName,//   客户名称
			linkName:this.linkName,//	联系人
			linkMobile:this.linkMobile,//	联系人手机
			visitCity:this.province+'-'+this.city,//	城市
			companyAddress:this.companyAddress,//  地址
			visitWhat:this.visitWhat,//   拜访目的
			visitVehicle:this.visitVehicle,//  交通
			remark:this.remark,//  备忘录
			visitDate:this.visitDate// 拜访日期
		}
		this.addEdit.saveNewReport(sendData)
					.then(res=>{
						this.pop.info({
						// this.pop.confirm({
							title:'提示',
							text:'保存成功'
							// text:'提交成功！是否跳转至列表页面'
						}).onConfirm(res=>{
							this.router.navigate(['business/visitReport'])
						})
					})
					.catch(res=>{
						this.pop.error({
							title:'提示',
							text:res.message
						})
					})
	}
	//保存编辑报告
	saveEditReport(){
		let sendData:SendData={
			serviceMan:this.serviceMan,// :服务经理
			guestName:this.guestName,//   客户名称
			linkName:this.linkName,//	联系人
			linkMobile:this.linkMobile,//	联系人手机
			visitCity:this.province+'-'+this.city,//	城市
			companyAddress:this.companyAddress,//  地址
			visitWhat:this.visitWhat,//   拜访目的
			visitVehicle:this.visitVehicle,//  交通
			remark:this.remark,//  备忘录
			visitDate:this.visitDate,// 拜访日期
			timetableId:this.route.params['value']['id']
		}
		this.addEdit.saveEditReport(sendData)
					.then(res=>{
						this.pop.info({
						// this.pop.confirm({
							title:'提示',
							text:'保存成功'
							// text:'提交成功！是否跳转至列表页面'
						}).onConfirm(res=>{
							this.router.navigate(['business/visitReport'])
						})
					})
					.catch(res=>{
						this.pop.error({
							title:'提示',
							text:res.message
						})
					})
	}
	//保存客户信息
	saveCustomerInfo(){
		// this.addEdit.test()
		let sendData:SendData={
			serviceMan:this.serviceMan,// :服务经理
			guestName:this.guestName,//   客户名称
			linkName:this.linkName,//	联系人
			linkMobile:this.linkMobile,//	联系人手机
			visitCity:this.province+'-'+this.city,//	城市
			companyAddress:this.companyAddress,//  地址
			visitWhat:this.visitWhat,//   拜访目的
			visitVehicle:this.visitVehicle,//  交通
			remark:this.remark,//  备忘录
			visitDate:this.visitDate// 拜访日期
			// visitDate:this.visitDate.length>12?this.visitDate:this.visitDate+' 00:00:00' 拜访日期
		}
		this.addEdit.saveCustomerInfo(sendData)
					.then(res=>{
						console.log(res);
						this.pop.info({
						// this.pop.confirm({
							title:'提示',
							text:'保存成功'
							// text:'提交成功！是否跳转至列表页面'
						}).onConfirm(res=>{
							this.router.navigate(['business/visitReport'])
						})
					})
					.catch(res=>{

						this.pop.error({
							title:'提示',
							text:res.message
						})
					})
	}

	//点击提交按钮
	submit(){
		if (this.isEdit) {
			this.saveEditReport()
		}else{
			this.saveNewReport()
		}
	}

	cancel(){
		window.history.back()
	}


	// test(data){
	// 	console.log(data)
	// }


}
