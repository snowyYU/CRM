import { Component, OnInit } from '@angular/core';

import { Router,ActivatedRoute,ParamMap } from '@angular/router'
import { PopService } from 'dolphinng'
import { AccFlowService,SendData } from './acc-flow.service'
import { DateService } from '../../../services/date/date.service'
@Component({
	moduleId: module.id,
	selector: 'acc-flow',
	templateUrl: 'acc-flow.component.html',
	styleUrls:['./acc-flow.component.less'],
	providers:[AccFlowService,DateService]
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

	todayDate

	appId=''
	appIdList:any[]

	thisPageRoute:string='account/memberAccFlow'
	constructor(
		private router:Router,
		private route:ActivatedRoute,
		private pop:PopService,
		private accF:AccFlowService,
		private dateService:DateService
		) {}

	ngOnInit() {
		this.getTradeTypeList()
		this.getAppIdList()
		// this.subscribeRouteParams()

		this.todayDate=this.dateService.format({
			date:this.dateService.todayDate(),
			formatType:"yyyy-MM-dd"

		})
		// this.getDataList()
	}

	//11.14,新增两个方法，
	//路由中的参数和获取列表的请求参数是否要一样呢
	//有些时候是一样的，有时候又不是，不过目前系统中是一样的
	//规范化，1.从组件的service中导入查询条件的interface。2.组件内部定义路由的参数结构，两者不一定相同
	//必传参数在声明时必须初始化
	subscribeRouteParams(){
		this.route.paramMap.subscribe((paramMap:ParamMap)=>{
			console.log(paramMap)
			console.log(paramMap['params']['rows'])
			console.log(!!paramMap['params'])
			
				// if (paramMap['params']['rows']) {
				// 	this.rows=paramMap['params']['rows']
				// }
				paramMap['params']['rows']?this.rows=parseInt(paramMap['params']['rows']):null
				paramMap['params']['page']?this.page=parseInt(paramMap['params']['page']):null
				paramMap['params']['appId']?this.appId=paramMap['params']['appId']:null
				paramMap['params']['tradeType']?this.tradeType=paramMap['params']['tradeType']:null
				paramMap['params']['startTime']?this.startTime=paramMap['params']['startTime']:null
				paramMap['params']['endTime']?this.endTime=paramMap['params']['endTime']:null
				paramMap['params']['memberName']?this.memberName=paramMap['params']['memberName']:null

				// paramMap['params']['rows']?this.rows=paramMap['params']['rows']:null
				// paramMap['params']['rows']?this.rows=paramMap['params']['rows']:null
			

			this.getDataList()
		})
	}

	navigate(){
		let routeParam:{
			page,
			rows,
			appId?,
			tradeType?,
			startTime?,
			endTime?,
			memberName?
		}={
			page:this.page,
			rows:this.rows,
		}

			if (this.appId) {
				routeParam.appId=this.appId
			}

			if (this.tradeType) {
				routeParam.tradeType=this.tradeType
			}

			if (this.startTime) {
				routeParam.startTime=this.startTime
			}

			if (this.endTime) {
				routeParam.endTime=this.endTime
			}

			if (this.memberName) {
				routeParam.memberName=this.memberName
			}

		console.log("router",this.router)
		console.log("activerouter",this.route)

		this.router.navigate([this.thisPageRoute,routeParam])
	}

	//获取归属渠道下拉列表数据
	getAppIdList(){
		this.accF
			.getAllApp()
			.then(res=>{
				console.log(res)
				this.appIdList=res.body.records
				this.appId=res.body.records[0].resourceId
			})
			.catch(res=>{
				this.pop.error({
					title:'错误提示',
					text:res.message
				})
			})
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
			memberName:this.memberName,
			appId:this.appId

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

