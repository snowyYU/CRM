import { Component,OnInit } from '@angular/core';

import { ActivatedRoute,Params,Router } from '@angular/router';
import { CustomerAddEditService } from './customer-add-edit.service';
import { PopService } from 'dolphinng';
import { SendData } from './sendData'
import { AuthRoleService } from '../../../../services/authRole/authRole.service';
import { DateService } from "../../../../services/date/date.service"

@Component({
	selector:'customer-add-edit',
	templateUrl:'./customer-add-edit.component.html',
	styleUrls:['./customer-add-edit.component.less'],
	providers:[CustomerAddEditService,PopService,AuthRoleService,DateService]
})

export class CustomerAddEditComponent implements OnInit{
	role
	guest_status:Array<any>;
	guest_from:Array<any>;
	app_list:Array<any>;
	app_list_temp:Array<any>;
	guest_company_type:Array<any>;
	ifEdit:boolean;
	guestId;	//	客户临时分配的ID
	serviceMan;	//服务经理名字
	guestName;	//客户名称
	appId;	//	渠道ID
	appName;  //归属渠道, 中文
	appMemberId;	//渠道用户编号
	guestFrom;	//获取途径（0：自有关系；1：渠道推荐；2：服务转交）
	guestFromDic;	//获取途径，中文
	companyAddress;	//企业地址
	companyType;	//公司类型（1：个体；2：独资；3：有限公司）
	companyTypeDic;	//公司类型，中文
	linkName;	//	联系人-真实姓名
	linkMobile;	//	联系人-手机
	linkJob;	//		联系人职位
	foundTime;	//成立时间
	registerCapital:number;	//注册资金
	licenceNum;	//	营业执照号
	status;	//		状态（0：正常；1：认证申请；-1：不需要跟踪）
	statusDic;	//	状态，中文
	remark

	province:string;
	provinceList;
	city:string;
	cityList;
	detailAddress:string

	todayDate

	submitting:boolean=false

	constructor(
		private router:Router,
		private route:ActivatedRoute,
		private popService:PopService,
		private addEditService:CustomerAddEditService,
		private authRoleService:AuthRoleService,
		private dateService:DateService

		){
		//状态下拉
		this.inputSelect("guest_status")
			.then(res=>{
				this.guest_status=res.body.records
				let index1
				let index2
				this.guest_status=this.guest_status.filter(item=>{
					if ((item.value!=="1")&&(item.value!=="2")) {
						return true
					}
				})
				console.log(this.guest_status)
				// this.guest_status.forEach((e,i)=>{
				// 	if (e.value=="1") {
				// 		index1=i
				// 	}
				// 	if (e.value=="2") {
				// 		index2=i
				// 	}
				// })
				// this.guest_status.splice(index1,1)
				// this.guest_status.splice(index2,1)
				// console.log(this.guest_status)
				// console.log(index1+index2)

			})
			.catch(res=>{
				this.popService.error({
					title:'错误信息',
					text:res.message
				})
			})
		//获客途径下拉
		this.inputSelect("guest_from")
			.then(res=>{
				this.guest_from=res.body.records
			})
			.catch(res=>{
				this.popService.error({
					title:'错误信息',
					text:res.message
				})
			})
		//归属渠道下拉
		this.addEditService
			.getBelongAppData()
			.then(res=>{
				console.log(res);
				this.app_list=res.body.records
				this.app_list_temp=res.body.records
			})
			.catch(res=>{
				this.popService.error({
					title:'错误信息',
					text:res.message
				})
			})
		//公司类型下拉
		this.inputSelect("guest_company_type")
			.then(res=>{
				this.guest_company_type=res.body.records
			})
			.catch(res=>{
				this.popService.error({
					title:'错误信息',
					text:res.message
				})
			})

		//选择省的列表
		this.provinceSelect()

	}

	ngOnInit(){
		this.todayDate=this.dateService.format({
			date:this.dateService.todayDate(),
			formatType:'yyyy-MM-dd'
		});

		this.serviceMan=this.authRoleService.userName;
		this.role=this.authRoleService.role
		if (this.route.params['value']['id']) {
			this.ifEdit=true;
			this.addEditService
				.getEditData(this.route.params['value']['id'])
				.then(res=>{
					this.editRender(res);
				})
				.catch(res=>{
				this.popService.error({
					title:'错误信息',
					text:res.message
				})
			})

		}else{
			this.ifEdit=false;
			this.status="0"
		}
	}

	//下拉
	inputSelect(type:string):Promise<any>{
		return this.addEditService
			.getDictListData(type)

	}

	//获取地址下拉列表
	//省
	provinceSelect(){
		this.addEditService.getAddress({
			parentCode:0,
			level:1
		}).then(res=>{
			this.provinceList=res.body.records
		})
		.catch(res=>{
				this.popService.error({
					title:'错误信息',
					text:res.message
				})
			})
	}

	getCityList(v){
		console.log(v);
		//获取省code
		this.addEditService.getAddress({
			parentCode:0,
			level:1,
			name:this.province
		}).then(res=>{
			return Promise.resolve(res.body.records[0].code)
		}).then(res=>{
			this.addEditService.getAddress({
				parentCode:res,
				level:2
			}).then(res=>{
				if (v=="1") {
					this.city=""
					console.log("fffffffffff")
				}

				this.cityList=res.body.records
			}).catch(res=>{
				this.popService.error({
					title:'错误信息',
					text:res.message
				})
			})

		})
	}


	//修改页面数据渲染
	editRender(res){
		console.log(res);
		if (res.status==200) {
			// code...
			this.guestName=res.body.guestName;	//客户名称
			this.status=res.body.status;	//状态
			this.guestFrom=res.body.guestFrom;	//获取途径
			this.appId=res.body.appId;	//	归属渠道
			this.serviceMan=res.body.serviceMan  //服务经理
			this.companyType=res.body.companyType;	//公司类型
			this.foundTime=res.body.foundTime;	//成立时间
			this.registerCapital=res.body.registerCapital*0.0001;	//注册资金
			this.licenceNum=res.body.licenceNum;	//	营业执照号
			this.linkName=res.body.linkName;	//	联系人
			this.linkMobile=res.body.linkMobile;	//	联系人-手机
			this.linkJob=res.body.linkJob;	//		联系人职位
			this.remark=res.body.remark
			//处理公司地址

			if (res.body.companyAddress) {
				let array=res.body.companyAddress.split('-')
				switch (array.length) {
					case 1:
						this.province=array[0];
						break;
					case 2:
						this.province=array[0];
						this.getCityList("2");
						this.city=array[1];
						break;
					case 3:
						this.province=array[0];
						this.detailAddress=array[2];
						this.getCityList("2");
						this.city=array[1];
						break;
					default:
						for(let i=0;i<array.length;i++){
							this.getCityList("2");
							if(i==0){
								this.province=array[i];
							}else if(i==1){
								this.city=array[i];
							}else if(i==2){
								this.detailAddress=array[i];
							}else{
								this.detailAddress+='-'+array[i];
							}
						}
						break;
				}
			}


		}
	}

	change(){
		if(this.guestFrom!=1){
			this.app_list=this.app_list_temp
			this.appId='C00001'
		}else{
			this.appId='undefined'
			this.app_list=this.arrayCopy(this.app_list)
		}
	}

	arrayCopy(str:Array<any>):Array<any>{
		let app_array:Array<Resource>=new Array(str.length-1)
		let add:boolean=false
		let resource:Resource
		 for(let i=0;i<app_array.length;i++){
		 	if(str[i].resourceId=='C00001'){
				add=true
			}
		 	if(add){
		 		resource=new Resource(str[i+1].resourceId,str[i+1].resourceName)
		 	}else{
		 		resource=new Resource(str[i].resourceId,str[i].resourceName)
		 	}
		 	app_array[i]=resource
		}
		return app_array
	}

	//提交数据
	onSubmit(){
		this.submitting=true
		let companyAddress:string;
		if(this.province&&this.city&&this.detailAddress){
			companyAddress=this.province+'-'+this.city+'-'+this.detailAddress;
		}else{
			companyAddress='';
		}
		// let companyAddress=this.province+'-'+this.city+'-'+this.detailAddress;
		let sendData:SendData={
			guestName:this.guestName,	//客户名称
			status:this.ifEdit?this.status:0,	//状态
			guestFrom:this.guestFrom,	//获取途径
			appId:this.guestFrom=='1'?this.appId:'C00001',	//	归属渠道
			serviceMan:this.serviceMan, //服务经理
			companyType:this.companyType,	//公司类型
			foundTime:this.foundTime,	//成立时间
			registerCapital:this.registerCapital?this.registerCapital*10000:null,	//注册资金
			licenceNum:this.licenceNum,	//	营业执照号
			linkName:this.linkName,	//	联系人
			linkMobile:this.linkMobile,	//	联系人-手机
			linkJob:this.linkJob,	//		联系人职位
			companyAddress:companyAddress,
			guestId:this.route.params['value']['id'],
			remark:this.remark
		}

		this.addEditService
			.submitData(sendData)
			.then(res=>{
				this.popService.info({
					title:"提示信息",
					text:"保存成功!"
				})
				this.submitting=false
				this.router.navigate(['/business/customerList'])
				// this.popService.confirm({
				// 	titile:'系统提示',
				// 	text:'操作成功！是否跳转至列表页面？'
				// }).onConfirm(()=>{
				// 	this.router.navigate(['/business/customerList'])
				// })
			})
			.catch(res=>{
				this.submitting=false
				this.popService.error({
					title:'错误信息',
					text:res.message
				})
			})
	}

	//取消
	cancel(){
		this.router.navigate(['/business/customerList']);
	}



}


class Resource {
	resourceId:number
	resourceName:string
	constructor(resourceId:number,resourceName:string) {
		this.resourceId=resourceId
		this.resourceName=resourceName
	}
}
