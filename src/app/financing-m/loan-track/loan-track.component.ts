import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,ParamMap } from '@angular/router'
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

	repaymentPlanModal:boolean  //还款计划模态框
	modalSize:string='lg'  		//模态框大小
	modalListLoading:boolean    //等待模态框价值

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

	// resourceId=''             //渠道编号
	// resourceList:any[]        //渠道列表

	productId=''              //产品编号
	productList:any[]         //产品列表
	status:string='8,9'       //状态
	tab:string='0'            //tab选项
	isOver:string             //是否查询逾期,逾期传1 不逾期不传
	limitDay:string           //距离到期天数
	// serviceMan:string         //服务经理

	repaymentPlanList:any[]   //还款计划列表

	thisPageRoute:string='financingM/loanTrack'

	constructor(
		public authRole:AuthRoleService,
		private router:Router,
		private route:ActivatedRoute,
		private pop:PopService,
		private loanTrack:LoanTrackService,
		private dateService:DateService
		) {}

	ngOnInit() {
		this.subscribeRouteParams()
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

			paramMap['params']['tab']?this.tab=paramMap['params']['tab']:null
			paramMap['params']['rows']?this.rows=parseInt(paramMap['params']['rows']):null
			paramMap['params']['page']?this.page=parseInt(paramMap['params']['page']):null
			paramMap['params']['borrowApplyId']?this.borrowApplyId=paramMap['params']['borrowApplyId']:null
			paramMap['params']['keyword']?this.companyName=paramMap['params']['keyword']:null

			this.getLoanList()
		})
	}

	navigate(){
		let routeParam:{
			tab,
			page,
			rows,
			borrowApplyId?,
			keyword?
		}={
			tab:this.tab,
			page:this.page,
			rows:this.rows
		}

		if (this.borrowApplyId) {
			routeParam.borrowApplyId=this.borrowApplyId
		}

		if (this.companyName) {
			routeParam.keyword=this.companyName
		}

		console.log("router",this.router)
		console.log("activerouter",this.route)

		this.router.navigate([this.thisPageRoute,routeParam])
	}

	//获取在贷跟踪列表数据
	getLoanList(){
		this.loading=true
		let sendData:SendData={
			page:this.page+1,
			rows:this.rows,
			status:this.status,
			serviceMan:this.authRole.userName,
			borrowApplyId:this.borrowApplyId,
			companyName:this.companyName,
			isOver:this.isOver?this.isOver:null,
			limitDay:this.limitDay?this.limitDay:null
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
		console.log(row)
		this.loanTrack.getRepaymentPlanList(row.borrowApplyId)
		.then(res=>{
			this.repaymentPlanModal=true
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
		this.dataList=res.body.records
		this.count=res.body.paginator.totalCount
		this.loading=false

	}

	detail(row){
		this.router.navigate(['/financingM/loanTrack/detail',row.borrowApplyId])
	}

	closeModal(){
		this.repaymentPlanModal=false
	}
}

class Product{
	productId:string
	productName:string
}