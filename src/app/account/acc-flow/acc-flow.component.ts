import { Component, OnInit } from '@angular/core';
import { PopService } from 'dolphinng'
import { AccFlowService,SendData } from './acc-flow.service'
@Component({
	moduleId: module.id,
	selector: 'acc-flow',
	templateUrl: 'acc-flow.component.html',
	styleUrls:['./acc-flow.component.less'],
	providers:[AccFlowService]
})
export class AccFlowComponent implements OnInit {
	dataList:any[]
	rows:number=10
	page:number=0
	count:number=0
	tradeType
	tradeTypeList:any[]
	memberName
	startTime
	endTime
	loading:boolean=false

	constructor(
		private pop:PopService,
		private accF:AccFlowService
		) {}

	ngOnInit() {
		this.getTradeTypeList()
		// this.getDataList()
	}

	getTradeTypeList(){
		this.accF
			.getTradeType()
			.then(res=>{
				console.log(res)
				this.tradeTypeList=res.body.records
        if(this.tradeTypeList.length>0){
          this.tradeType=this.tradeTypeList[0].value;
        }
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
			startTime:this.startTime,
			endTime:this.endTime,
			tradeType:this.tradeType,
			memberName:this.memberName

		}
		this.accF.getDataList(data)
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



}

