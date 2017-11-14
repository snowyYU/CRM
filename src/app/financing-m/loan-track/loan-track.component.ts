import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { PopService } from 'dolphinng'
import { LoanTrackService,SendData } from './loan-track.service'
import { DateService } from '../../../services/date/date.service'

@Component({
	moduleId: module.id,
	selector:'loan-track',
	templateUrl:'./loan-track.component.html',
	styleUrls:['loan-track.component.less'],
	providers:[LoanTrackService,DateService]
})

export class LoanTrackComponent implements OnInit {
	dataList:any[]

	rows:number=10
	page:number=0
	count:number=0

	borrowApplyId:string      //借款申请ID
	companyName:string        //企业名称
	approveAmount:number      //借款金额
	productName:string        //贷款产品
	repaymentWay:number       //还款方式
	remarks:string            //状态备注

	constructor(
		private router:Router,
		private pop:PopService,
		private loanTrack:LoanTrackService,
		private dateService:DateService
		) {}

	ngOnInit() {
		this.getLoanList()
	}

	getLoanList(){
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

	}
}