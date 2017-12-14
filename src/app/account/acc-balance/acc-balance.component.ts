import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,ParamMap } from '@angular/router'
import { PopService } from 'dolphinng'
import { AccBalanceService,SendData } from './acc-balance.service'
import { AuthRoleService } from '../../../services/authRole/authRole.service'

@Component({
	moduleId: module.id,
	selector: 'acc-balance',
	templateUrl: 'acc-balance.component.html',
	styleUrls:['./acc-balance.component.less'],
	providers:[AccBalanceService]
})
export class AccBalanceComponent implements OnInit {
	dataList:any[]
	rows:number=10
	page:number=0
	count:number=0
	appId=''
	appIdList:any[]
	memberName


	notOpenAccModal:boolean=false
	notAccountMemberList:any[]

	isOpenAccount		//开户数量：
    isOpenAccountRate		//配置率：
    memberTotal		//会员总数：
    notOpenAccount		//没有开户数：

	loading:boolean=false
	first:boolean=true
	thisPageRoute:string='account/memberAccBalance'
	constructor(
		public authRole:AuthRoleService,
		private router:Router,
		private route:ActivatedRoute,
		private pop:PopService,
		private accB:AccBalanceService
		) {}

	ngOnInit() {
		this.getAppIdList()
		this.getCountData()
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
			
			paramMap['params']['rows']?this.rows=parseInt(paramMap['params']['rows']):null
			paramMap['params']['page']?this.page=parseInt(paramMap['params']['page']):null
			paramMap['params']['appId']?this.appId=paramMap['params']['appId']:null
			paramMap['params']['keyword']?this.memberName=paramMap['params']['keyword']:null

			this.getDataList()
		})
	}

	navigate(){
		let routeParam:{
			page,
			rows,
			appId?,
			keyword?
		}={
			page:this.page,
			rows:this.rows,
		}

		if (this.appId) {
			routeParam.appId=this.appId
		}

		if (this.memberName) {
			routeParam.keyword=this.memberName
		}

		console.log("router",this.router)
		console.log("activerouter",this.route)

		this.router.navigate([this.thisPageRoute,routeParam])
	}

	//获取归属渠道下拉列表数据
	getAppIdList(){
		this.accB
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

	getDataList(){
		this.loading=true
		let data:SendData={
			rows:this.rows,
			page:this.page+1,
			appId:this.appId,
			companyName:this.memberName
		}
		this.accB.getDataList(data)
			.then(res=>{
				if(this.first){
					this.first=false
					this.loading=false
				}else{
					this.dataList=res.body.records
					this.count=res.body.paginator.totalCount
					this.loading=false
				}
			})
			.catch(res=>{
				this.loading=false
				this.pop.error({
					title:'错误信息',
					text:res.message
				})
			})
	}

	getCountData(){
		this.accB.getCountInfo()
			.then(res=>{
				console.log(res)
				this.isOpenAccount=res.body.isOpenAccount
				this.isOpenAccountRate=res.body.isOpenAccountRate
				this.memberTotal=res.body.memberTotal
				this.notOpenAccount=res.body.notOpenAccount
			})
			.catch(res=>{
				this.pop.error({
					title:'错误信息',
					text:res.message
				})
			})
	}

	getNotAccountMember(){
		this.accB.getNotAccountMember()
			.then(res=>{
				console.log(res)
				this.notAccountMemberList=res.body.records
			})
			.catch(res=>{
				this.pop.error({
					title:'错误信息',
					text:res.message
				})
			})
	}
	showModal(){
		this.notOpenAccModal=true
		this.getNotAccountMember()
	}

	closeModal(){
		this.notOpenAccModal=false
	}

	goToOpen(key){
		this.router.navigate(['account/electricAcc/openAcc'],{queryParams: { hash: key }})
	}
}

