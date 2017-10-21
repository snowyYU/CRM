import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { PopService } from 'dolphinng'
import { AccBalanceService,SendData } from './acc-balance.service'
import { AuthRoleService } from '../../../services/authRole/authRole.service'

@Component({
	moduleId: module.id,
	selector: 'acc-balance',
	templateUrl: 'acc-balance.component.html',
	styleUrls:['./acc-balance.component.less'],
	providers:[AccBalanceService]
})
export class AccBalanceComponent implements OnInit {
	dataList:any[]
	rows:number=10
	page:number=0
	count:number=0
	appId=''
	appIdList:any[]
	memberName


	notOpenAccModal:boolean=false
	notAccountMemberList:any[]

	isOpenAccount		//开户数量：
    isOpenAccountRate		//配置率：
    memberTotal		//会员总数：
    notOpenAccount		//没有开户数：

	loading:boolean=false
	constructor(
		private authRole:AuthRoleService,
		private router:Router,
		private pop:PopService,
		private accB:AccBalanceService
		) {}

	ngOnInit() {
		this.getAppIdList()

		// this.getDataList()

		this.getCountData()

	}

	//获取归属渠道下拉列表数据
	getAppIdList(){
		this.accB
			.getAllApp()
			.then(res=>{
				console.log(res)
				this.appIdList=res.body.records
			})
			.catch(res=>{
				this.pop.error({
					title:'错误提示',
					text:res.message
				})
			})
	}

	getDataList(){
		this.loading=true
		let data:SendData={
			rows:this.rows,
			page:this.page+1,
			appId:this.appId,
			companyName:this.memberName
		}
		this.accB.getDataList(data)
			.then(res=>{
				this.dataList=res.body.records
				this.count=res.body.paginator.totalCount
				this.loading=false
			})
			.catch(res=>{
				this.loading=false
				this.pop.error({
					title:'错误信息',
					text:res.message
				})
			})
	}

	getCountData(){
		this.accB.getCountInfo()
			.then(res=>{
				console.log(res)
				this.isOpenAccount=res.body.isOpenAccount
				this.isOpenAccountRate=res.body.isOpenAccountRate*100
				this.memberTotal=res.body.memberTotal
				this.notOpenAccount=res.body.notOpenAccount
			})
			.catch(res=>{
				this.pop.error({
					title:'错误信息',
					text:res.message
				})
			})
	}

	getNotAccountMember(){
		this.accB.getNotAccountMember()
			.then(res=>{
				console.log(res)
				this.notAccountMemberList=res.body.records
			})
			.catch(res=>{
				this.pop.error({
					title:'错误信息',
					text:res.message
				})
			})
	}
	showModal(){
		this.notOpenAccModal=true
		this.getNotAccountMember()
	}

	closeModal(){
		this.notOpenAccModal=false

	}

	goToOpen(id){
		this.router.navigate(['account/electricAcc/openAcc'],{queryParams: { hash: id }})

	}



}

