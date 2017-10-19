import { Component,OnInit } from '@angular/core';

import { Router } from '@angular/router'
import { CustomerListService } from './customer-list.service';
import { PopService } from 'dolphinng';
import { AddSerialService } from '../../../services/addSerial/addSerial.service';
import { AuthRoleService } from '../../../services/authRole/authRole.service'

import { SendData } from './sendData'

@Component({
	selector:'customer-list',
	templateUrl:'./customer-list.component.html',
	styleUrls:['./customer-list.component.less'],
	providers:[CustomerListService,PopService,AddSerialService]
})
export class CustomerListComponent implements OnInit{
	serviceMan:string=''
	serviceManL:any[]
	page:number=0;
	rows:number=10;
	count:number;
	dataList:any;
	role:string

	changeManageModal:boolean=false
	modalCompanyName
	modalServiceManL:any[]=[]
	modalServiceMan
	modalServiceManO

	loading:boolean=true

	//认证申请回复数
	// authApplyReplyNum:number
	constructor(
		private router:Router,
		private customerListService:CustomerListService,
		private popService:PopService,
		public authRole:AuthRoleService
		){}
	ngOnInit(){
		console.log(this.authRole.roleIn(['008']))
		if (this.authRole.roleIn(['008'])) {
			this.getManages()
		}
		// this.getCount()
		this.queryData()
	}

	//获取服务经理列表
	getManages(){
		this.customerListService.getManageL()
			.then(res=>{
				console.log(res)

				res.body.records.forEach(e=>{
					this.modalServiceManL.push
				})
				res.body.records.unshift({employeeName:''})

				this.serviceManL=res.body.records
			})
			.catch(res=>{
				this.popService.error({
					title:'错误信息',
					text:res.message
				})
			})
	}

	//获取认证申请回复的数目
	// getCount(){
	// 	this.customerListService.getAuthCount()
	// 							.then(res=>{
	// 								this.authApplyReplyNum=res.body.authApplyReplyNum;
	// 							})
	// }

	goToList(){
		this.router.navigate(['business/customerList/authList',1])
	}

	queryData(){
		this.loading=true

		let data:SendData={
			page:this.page+1,
			rows:this.rows,
			serviceMan:this.serviceMan?this.serviceMan:''
		}
		this.customerListService
			.getListData(data)
			.then(res=>{
				this.loading=false

				this.handleData(res)
			})
			.catch(res=>{
				this.popService.error({
					title:'错误信息',
					text:res.message
				})
				this.loading=false

			})

	}

	handleData(res){
		
		
		if (res.status==200) {
			// code...
			this.count=res.body.paginator.totalCount;
			this.dataList=res.body.records;
		}
	}

	delete(data){
		this.popService.confirm({
			titile:'操作确认',
			text:'确定要删除吗？'
		}).onConfirm(()=>{
			this.customerListService
				.deleteData(data.guestId)
				.then(res=>{
					this.queryData()
				})
				.catch(res=>{
				this.popService.error({
					title:'错误信息',
					text:res.message
				})
			})
		})
	}

	detail(data){
		this.router.navigate(['business/customerList/detail',data.guestId])
	}

	edit(data){
		this.router.navigate(['business/customerList/edit',data.guestId])
	}
	applyAuth(data){
		this.router.navigate(['business/customerList/applyAuth',data.guestId])

	}

	changeManage(row){
		console.log(row)
		this.modalServiceManL=[]
		this.changeManageModal=true
		this.modalCompanyName=row.guestName
		this.modalServiceManO=row.serviceMan
		
		this.customerListService.getManageL()
			.then(res=>{
				console.log(res)

				res.body.records.forEach(e=>{
					if (row.serviceMan!=e.employeeName) {
						this.modalServiceManL.push(e)
					}
					
				})
				console.log(this.modalServiceManL)

			})
			.catch(res=>{
				this.popService.error({
					title:'错误信息',
					text:res.message
				})
			})

	}

	submit(){
		this.customerListService.updateServiceMan(this.modalCompanyName,this.modalServiceMan)
			.then(res=>{
				this.popService.info({
					title:'提示信息',
					text:'更改成功！'
				})
				this.changeManageModal=false
				this.queryData()
			})
			.catch(res=>{
				this.popService.error({
					title:'错误信息',
					text:res.message
				})
			})
	}

	closeModal(){
		this.changeManageModal=false
	}

}