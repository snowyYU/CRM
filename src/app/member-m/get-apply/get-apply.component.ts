import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router'
import { PopService } from 'dolphinng'
import { GetApplyService,SendData } from './get-apply.service'
import { DateService } from '../../../services/date/date.service'
import { stringify } from 'querystring';

@Component({
	selector:'get-apply',
	templateUrl:'./get-apply.component.html',
	styleUrls:['./get-apply.component.less'],
	providers:[GetApplyService,DateService]
})
export class GetApplyComponent implements OnInit{
	loading:boolean
	//发送的参数部分
	qryStatus:string="0"
	startDate:string
	endDate:string
	//获取的列表的字段
	creditAuthId//申请ID				
	memberName//会员名称			
	productName//产品				
	addCreditValue//申请额度(万元)		
	oldCreditValue//原授信额度(万元)	
	statusDic//状态		
	serviceMan//服务经理		
	createTime//申请日期	
	//分页参数
	rows:number=10
	page:number=0
	count:number

	dataList:any

	todayDate

	constructor(
		private pop:PopService,
		private router:Router,
		private route:ActivatedRoute,
		private getApply:GetApplyService,
		private dateService:DateService
		){}
	ngOnInit(){
		if (this.route.queryParams['value']['qry']) {
			this.qryStatus=this.route.queryParams['value']['qry']
		}
		this.getDataList(this.qryStatus)

		this.todayDate=this.dateService.format({
			date:this.dateService.todayDate(),
			formatType:"yyyy-MM-dd"

		})

	}

	getDataList(s?:string){
		
		this.qryStatus=s
		
		this.loading=true
		let sendData:SendData={
			rows:this.rows,
			page:this.page+1,
			startDate:this.startDate?this.startDate+' 00:00:00':this.startDate,
			endDate:this.endDate?this.endDate+' 23:59:59':this.endDate ,
			qryStatus:this.qryStatus
		}
		this.getApply.getDataList(sendData)
			.then(res=>{
				this.loading=false
				console.log(res)
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
		this.dataList=res.body.records
		this.count=res.body.paginator.totalCount
	}
	//查看详情
	detail(row){
		let queryData={
			creditAuthId:row.creditAuthId,
			memberId:row.memberId
		}
		this.router.navigate(['memberM/getApply/detail',JSON.stringify(queryData)])
	}

	qryStatusChange(){
		this.startDate=""
		this.endDate=""
	}



}