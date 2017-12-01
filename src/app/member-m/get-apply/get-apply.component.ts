import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute,ParamMap } from '@angular/router'
import { PopService } from 'dolphinng'
import { GetApplyService,SendData } from './get-apply.service'
import { DateService } from '../../../services/date/date.service'
import { stringify } from 'querystring';
import { SessionStorageService } from '../../../services/session-storage/session-storage.service'

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

	thisPageRoute:string='memberM/getApply'
	
	constructor(
		private pop:PopService,
		private router:Router,
		private route:ActivatedRoute,
		private getApply:GetApplyService,
		private dateService:DateService,
		private sessionStorage:SessionStorageService
		){}
	ngOnInit(){
		this.subscribeRouteParams()

		this.todayDate=this.dateService.format({
			date:this.dateService.todayDate(),
			formatType:"yyyy-MM-dd"

		})

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
				paramMap['params']['startDate']?this.startDate=paramMap['params']['startDate']:null
				paramMap['params']['endDate']?this.endDate=paramMap['params']['endDate']:null
				paramMap['params']['qryStatus']?this.qryStatus=paramMap['params']['qryStatus']:null

				// paramMap['params']['rows']?this.rows=paramMap['params']['rows']:null
				// paramMap['params']['rows']?this.rows=paramMap['params']['rows']:null
			this.getDataList()
		})
	}

	navigate(){
		let routeParam:{
			page,
			rows,
			startDate?,
			endDate?,
			qryStatus?
		}={
			page:this.page,
			rows:this.rows,
		}

		if (this.startDate) {
			routeParam.startDate=this.startDate
		}

		if (this.endDate) {
			routeParam.endDate=this.endDate
		}

		if (this.qryStatus) {
			routeParam.qryStatus=this.qryStatus
		}

		console.log("router",this.router)
		console.log("activerouter",this.route)

		this.router.navigate([this.thisPageRoute,routeParam])
	}

	getDataList(){
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