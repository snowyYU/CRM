import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute,ParamMap } from '@angular/router'
import { PopService } from 'dolphinng'
import { VistReportService } from './visit-report.service';
import { DateService } from '../../../services/date/date.service';
import { AuthRoleService } from '../../../services/authRole/authRole.service'
import { SendData } from './sendDate'

@Component({
	selector:'customer-list',
	templateUrl:'./visit-report.component.html',
	styleUrls:['./visit-report.component.less'],
	providers:[VistReportService,DateService]
})
export class VisitReportComponent implements OnInit{
	dateStart:string='';
	dateEnd:string='';
	dateToday
	pastMonthNum:number=1;
	monthSelectBtn:number=1;
	dateList:any;       

	serviceMan:string=''
	serviceManL:any[]
	customerName
	//是否正在加载
	loading:boolean;
	submitAfterClick:boolean=false;
	submitting:boolean=false;
	//总数
	count:number;
	page:number=0;
	rows:number=10;

	//分页参数

	thisPageRoute:string='business/visitReport'

	constructor(
				private router:Router,
				private route:ActivatedRoute,
				private pop:PopService,
				private vistReportService:VistReportService,
				private dateService:DateService,
				public authRole:AuthRoleService

		){
		
	}
	ngOnInit(){
		console.log(this.authRole.roleIn(['008']))
		if (this.authRole.roleIn(['008'])) {
			this.getManages()
		}
		// this.getManages()
		this.setVistDate(1);
		this.subscribeRouteParams()
		// this.loading=true;
		// this.queryData();
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
				paramMap['params']['startDate']?this.dateStart=paramMap['params']['startDate']:null
				paramMap['params']['endDate']?this.dateEnd=paramMap['params']['endDate']:null
				paramMap['params']['serviceMan']?this.serviceMan=paramMap['params']['serviceMan']:null
				paramMap['params']['keyword']?this.customerName=paramMap['params']['keyword']:null

				// paramMap['params']['rows']?this.rows=paramMap['params']['rows']:null
				// paramMap['params']['rows']?this.rows=paramMap['params']['rows']:null
			this.queryData()
		})
	}

	navigate(){
		let routeParam:{
			page,
			rows,
			startDate?,
			endDate?,
			serviceMan?,
			keyword?
		}={
			page:this.page,
			rows:this.rows,
		}

		console.log("router",this.router)
		console.log("activerouter",this.route)

		if (this.dateStart) {
			routeParam.startDate=this.dateStart
		}

		if (this.dateEnd) {
			routeParam.endDate=this.dateEnd
		}

		if (this.serviceMan) {
			routeParam.serviceMan=this.serviceMan
		}

		if (this.customerName) {
			routeParam.keyword=this.customerName
		}
		this.router.navigate([this.thisPageRoute,routeParam])
	}

	//获取服务经理列表
	getManages(){
		this.vistReportService.getManageL()
			.then(res=>{
				console.log(res)
				res.body.records.unshift({employeeName:''})

				this.serviceManL=res.body.records
			})
			.catch(res=>{
				this.pop.error({
					title:'错误信息',
					text:res.message
				})
			})
	}

	setVistDate(pastMonthNum:number){
		this.dateToday=this.dateService.format({
			date:this.dateService.todayDate(),
			formatType:'yyyy-MM-dd'
		});

		this.dateEnd=this.dateService.format({
			date:this.dateService.todayDate(),
			formatType:'yyyy-MM-dd'
		});
		let pastMonthDate=this.dateService.lastMountMonth({
			date:this.dateService.todayDate(),
			num:pastMonthNum
		});
		this.dateStart=this.dateService.format({
			date:pastMonthDate,
			formatType:'yyyy-MM-dd'
		})
	}

	monthSelect(num:number){
		this.submitAfterClick=false;
		this.monthSelectBtn=num;
		this.setVistDate(num);
	}

	queryData(){
		this.loading=true
		this.submitting=true;
		console.log(this.serviceMan)
		let data:SendData={
			startDate:this.dateStart,
			endDate:this.dateEnd,
			page :this.page+1,
			rows:this.rows,
			serviceMan:this.serviceMan,
			keyword:this.customerName
		}
		console.log(data)
		this.vistReportService.getList(data).then(res=>{
			this.submitting=false;
			this.handleData(res);
		})
	}

	handleData(res){
		
		console.log(res);
		
			
			// code...
			this.loading=false;
			this.count=res.count;
			this.dateList=res.records
		
	}

	serach(){
		this.page=0;
		
		this.submitAfterClick=true;
		this.queryData();
	}

	// dateStartChange(date){
	// 	console.log(this.dateStart);
	// }

	detail(info){
		console.log(info);
		this.router.navigate(['business/visitReport/detail',info.timetableId])
	}

	edit(info){
		this.router.navigate(['business/visitReport/edit',info.timetableId])
	}

	add(){
		this.router.navigate(['business/visitReport/add']);
	}

}