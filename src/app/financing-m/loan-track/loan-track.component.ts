import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { PopService } from 'dolphinng'
import { LoanTrackService,SendData } from './loan-track.service'
import { DateService } from '../../../services/date/date.service'
import { AuthRoleService } from '../../../services/authRole/authRole.service'

@Component({
	moduleId: module.id,
	selector:'loan-track',
	templateUrl:'./loan-track.component.html',
	styleUrls:['loan-track.component.less'],
	providers:[LoanTrackService,DateService]
})

export class LoanTrackComponent implements OnInit {
	dataList:any[]            //在贷跟踪数据列表

	rows:number=10            //显示条数
	page:number=0             //页数
	count:number=0            //数据总数

	borrowApplyId:string      //借款申请ID
	companyName:string        //企业名称
	approveAmount:number      //借款金额
	productName:string        //贷款产品
	repaymentWay:number       //还款方式
	remarks:string            //状态备注

	startTime                 //开始时间
	endTime                   //结束时间
	loading:boolean=false     //是否获取到数据

	todayDate                 //当前日期

	resourceId=''             //渠道编号
	resourceList:any[]        //渠道列表

	productId=''              //产品编号
	productList:any[]         //产品列表
	status=0                  //状态

	repaymentPlanList:any[]   //还款计划列表
	constructor(
		public authRole:AuthRoleService,
		private router:Router,
		private pop:PopService,
		private loanTrack:LoanTrackService,
		private dateService:DateService
		) {}

	ngOnInit() {
		this.getLoanList()
		this.getAllApp()
		this.getProductsList('0')
		//格式化并获取当前日期
		this.todayDate=this.dateService.format({
			date:this.dateService.todayDate(),
			formatType:"yyyy-MM-dd"
		})
	}

	//获取归属渠道下拉列表数据
	getAllApp(){
		this.loanTrack.getAllApp()
			.then(res=>{
				console.log(res)
				this.resourceList=res.body.records
				this.resourceList.unshift({resourceId:'0',resourceName:'全部'})
				this.resourceId=this.resourceList[0].resourceId
				// this.getProductsList(this.appId)
			})
			.catch(res=>{
				this.pop.error({
					title:'错误提示',
					text:res.message
				})
			})

	}

	//获取贷款产品下拉列表数据
	getProductsList(appId){
		if(appId=='0'){
			let product:Product={
				productId:'0',
				productName:'全部'
			}
			let productList:Product[]=[product]
			this.productList=productList
			this.productId=this.productList[0].productId
			return
		}
		this.loanTrack.getProductsList(appId)
			.then(res=>{
				console.log(res)
				this.productList=res.body.records
				this.productList.unshift({productId:'0',productName:'全部'})
				this.productId=res.body.records[0].productId
			})
			.catch(res=>{
				this.pop.error({
					title:'错误提示',
					text:res.message
				})
			})
	}

	//获取在贷跟踪列表数据
	getLoanList(){
		this.loading=true
		let sendData:SendData={
			page:this.page+1,
			rows:this.rows,
			borrowApplyId:this.borrowApplyId,
			companyName:this.companyName,
			approveAmount:this.approveAmount,
			productName:this.productName,
			repaymentWay:this.repaymentWay,
			remarks:this.remarks
		}

		this.loanTrack.getLoanList(sendData)
			.then(res=>{
				this.handleData(res)
			})
			.catch(res=>{
				this.loading=false
				this.pop.error({
					title:'错误提示',
					text:res.message
				})
			})
	}

	getRepaymentPlanList(row){
		this.loanTrack.getRepaymentPlanList(row.borrowApplyId)
		.then(res=>{
			console.log(res)
			this.repaymentPlanList=res.body.records
		})
		.catch(res=>{
			this.loading=false
			this.pop.error({
				title:'错误提示',
				text:res.message
			})
		})
	}
	handleData(res){
		console.log(res)
		this.dataList=res.body.records
		this.count=res.body.paginator.totalCount
		this.loading=false

	}

	detail(row){
		let queryList={
			memberId:row.memberId,
			borrowApplyId:row.borrowApplyId,
			paymentWay:row.repaymentWay
		}
		this.router.navigate(['/financingM/loanTrack/detail',JSON.stringify(queryList)])
	}
}

class Product{
	productId:string
	productName:string
}