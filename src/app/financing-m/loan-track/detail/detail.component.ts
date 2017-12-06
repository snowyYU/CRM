import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router'
import { PopService } from 'dolphinng'
import { DetailService } from './detail.service';

@Component({
	moduleId: module.id,
	selector:'detail',
	templateUrl:'./detail.component.html',
	styleUrls:['detail.component.less'],
	providers:[DetailService]
})

export class DetailComponent implements OnInit {

	borrowApplyId  //借款单ID
	
	repaymentPlanModal:boolean  //还款计划模态框
	modalSize:string='lg'  //模态框大小
	modalListLoading:boolean  //等待模态框价值

	dataList:{
		applyAmount? 
		approveAmount?
		auditOneBy?
		auditOneTime?
		borrowApplyId?
		companyName?
		createTime?
		isNewRecord?
		limitTime?
		memberId?
		overRate?
		paymentWay?
		paymentWayDic?
		productId?
		productName?
		rate?
		rateType?
		rateTypeDic?
		ratedCycle?
		remarks?
		repaymentWay?
		resourceId?
		stage?
		status?
		statusName?
		statusName2?
		updateTime?
	}={}	
	repaymentPlanList:{
		borrowApplyId?
		currentPeriod?
		errorAmount?
		isNewRecord?
		isRollover?
		overTime?
		overdueInterest?
		repaymentAmount?
		repaymentCapital?
		repaymentDate?
		repaymentInterest?
		repaymentRelDate?
		rolloverDeposit?
		rolloverInterest?
		status?
		statusName?
		statusName2?
		totalPeriod?
		totalRelAmount?
	}[]=[]
	constructor(
		private router:Router,
		private route:ActivatedRoute,
		private pop:PopService,
		private detail:DetailService
		) {}

	ngOnInit() {
		this.getLoanDetails()
	}

	getLoanDetails(){
		this.detail.getLoanDetails(this.route.params['value']['data'])
		.then(res=>{
			console.log(res)
			this.dataList=res.body.records[0]
		})
		.catch(res=>{
			this.pop.error({
				title:'错误信息',
				text:res.message
			})
		})
	}

	getRepaymentPlan(){
		this.detail.getRepaymentPlan(this.route.params['value']['data'])
		.then(res=>{
			this.repaymentPlanModal=true
			console.log(res)
			this.repaymentPlanList=res.body.records
		})
		.catch(res=>{
			this.pop.error({
				title:'错误信息',
				text:res.message
			})
		})
	}

	back(){
		window.history.back()
	}

	closeModal(){
		this.repaymentPlanModal=false
	}
}