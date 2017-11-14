import { Component,OnInit } from '@angular/core';

import { Router,ActivatedRoute,ParamMap } from '@angular/router'
import { CustomerListService } from './customer-list.service';
import { PopService } from 'dolphinng';
import { AddSerialService } from '../../../services/addSerial/addSerial.service';
import { AuthRoleService } from '../../../services/authRole/authRole.service'

import { SendData } from './sendData'

@Component({
	selector:'customer-list',
	templateUrl:'./customer-list.component.html',
	styleUrls:['./customer-list.component.less'],
	providers:[CustomerListService,PopService,AddSerialService]
})
export class CustomerListComponent implements OnInit{
	serviceMan:string=''
	serviceManL:any[]
	customerName
	page:number=0;
	rows:number=10;
	count:number;
	dataList:any;
	role:string

	changeManageModal:boolean=false
	modalCompanyName
	modalServiceManL:any[]=[]
	modalServiceMan
	modalServiceManO

	loading:boolean=true

	thisPageRoute:string='business/customerList'
	//认证申请回复数
	// authApplyReplyNum:number
	constructor(
		private router:Router,
		private route:ActivatedRoute,
		private customerListService:CustomerListService,
		private popService:PopService,
		public authRole:AuthRoleService
		){}
	ngOnInit(){
		console.log(this.authRole.roleIn(['008']))
		if (this.authRole.roleIn(['008'])) {
			this.getManages()
		}
		// this.getCount()
		// this.queryData()
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
			
				// if (paramMap['params']['rows']) {
				// 	this.rows=paramMap['params']['rows']
				// }
				paramMap['params']['rows']?this.rows=parseInt(paramMap['params']['rows']):null
				paramMap['params']['page']?this.page=parseInt(paramMap['params']['page']):null
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
			serviceMan?,
			keyword?
		}={
			page:this.page,
			rows:this.rows,
		}

		if (this.serviceMan) {
			routeParam.serviceMan=this.serviceMan
		}

		if (this.customerName) {
			routeParam.keyword=this.customerName
		}

		console.log("router",this.router)
		console.log("activerouter",this.route)

		this.router.navigate([this.thisPageRoute,routeParam])


	}


	//获取服务经理列表
	getManages(){
		this.customerListService.getManageL()
			.then(res=>{
				console.log(res)

				res.body.records.forEach(e=>{
					this.modalServiceManL.push
				})
				res.body.records.unshift({employeeName:''})

				this.serviceManL=res.body.records
			})
			.catch(res=>{
				this.popService.error({
					title:'错误信息',
					text:res.message
				})
			})
	}

	//获取认证申请回复的数目
	// getCount(){
	// 	this.customerListService.getAuthCount()
	// 							.then(res=>{
	// 								this.authApplyReplyNum=res.body.authApplyReplyNum;
	// 							})
	// }

	goToList(){
		this.router.navigate(['business/customerList/authList',1])
	}

	queryData(){
		this.loading=true

		let data:SendData={
			page:this.page+1,
			rows:this.rows,
			serviceMan:this.serviceMan?this.serviceMan:'',
			keyword:this.customerName
		}
		this.customerListService
			.getListData(data)
			.then(res=>{
				this.loading=false

				this.handleData(res)
			})
			.catch(res=>{
				this.popService.error({
					title:'错误信息',
					text:res.message
				})
				this.loading=false

			})

	}

	handleData(res){
		
		
		if (res.status==200) {
			// code...
			this.count=res.body.paginator.totalCount;
			this.dataList=res.body.records;
		}
	}

	delete(data){
		this.popService.confirm({
			titile:'操作确认',
			text:'确定删除该客户所有记录吗？'
		}).onConfirm(()=>{
			this.customerListService
				.deleteData(data.guestId)
				.then(res=>{
					this.queryData()
				})
				.catch(res=>{
				this.popService.error({
					title:'错误信息',
					text:res.message
				})
			})
		})
	}

	detail(data){
		this.router.navigate(['business/customerList/detail',data.guestId])
	}

	edit(data){
		this.router.navigate(['business/customerList/edit',data.guestId])
	}
	applyAuth(data){
		this.router.navigate(['business/customerList/applyAuth',data.guestId])

	}

	changeManage(row){
		console.log(row)
		this.modalServiceManL=[]
		this.changeManageModal=true
		this.modalCompanyName=row.guestName
		this.modalServiceManO=row.serviceMan
		
		this.customerListService.getManageL()
			.then(res=>{
				console.log(res)

				res.body.records.forEach(e=>{
					if (row.serviceMan!=e.employeeName) {
						this.modalServiceManL.push(e)
					}
					
				})
				console.log(this.modalServiceManL)

			})
			.catch(res=>{
				this.popService.error({
					title:'错误信息',
					text:res.message
				})
			})

	}

	submit(){
		this.customerListService.updateServiceMan(this.modalCompanyName,this.modalServiceMan)
			.then(res=>{
				this.popService.info({
					title:'提示信息',
					text:'更改成功！'
				})
				this.changeManageModal=false
				this.queryData()
			})
			.catch(res=>{
				this.popService.error({
					title:'错误信息',
					text:res.message
				})
			})
	}

	closeModal(){
		this.changeManageModal=false
	}

}