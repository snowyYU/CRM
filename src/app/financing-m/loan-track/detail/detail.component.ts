import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router'
import { PopService } from 'dolphinng'
import { DetailService,SendData } from './detail.service'
import { config } from '../../../../../protractor.conf';

@Component({
	moduleId: module.id,
	selector:'detail',
	templateUrl:'./detail.component.html',
	styleUrls:['detail.component.less'],
	providers:[DetailService]
})

export class DetailComponent implements OnInit {

	queryData:SendData
	dataList:any[]
	constructor(
		private router:Router,
		private route:ActivatedRoute,
		private pop:PopService,
		private detail:DetailService
		) {}

	ngOnInit() {
		this.getLoanData()
        this.getLoanDetails()
	}

	getLoanData(){
		let data=JSON.parse(this.route.params['value']['data'])
		console.log(data)
		this.queryData={
			memberId:data.memberId,
			borrowApplyId:data.borrowApplyId,
			paymentWay:parseInt(data.paymentWay)
		}
		console.log(this.queryData)
	  }

	getLoanDetails(){
		this.detail.getLoanDetails(this.queryData)
		.then(res=>{
			console.log(res)
			this.dataList=res.body.records
		})
		.catch(res=>{
			this.pop.error({
				title:'错误信息',
				text:res.message

			})
		})
	}
}