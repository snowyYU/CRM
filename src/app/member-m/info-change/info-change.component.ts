import { Component,OnInit } from '@angular/core';

import { Router,ActivatedRoute,ParamMap } from '@angular/router'
import { InfoChangeService } from './info-change.service'
import { SendData } from './sendData'
import { PopService } from 'dolphinng'
import { AuthRoleService } from '../../../services/authRole/authRole.service'

@Component({
	selector:'info-change',
	templateUrl:'./info-change.component.html',
	styleUrls:['./info-change.component.less'],
	providers:[InfoChangeService]
})
export class InfoChangeComponent implements OnInit{
	//参数在此
	status:number=0;
	dataList:any;
	page:number=0;
	count:number;
	rows:number=10;

	loading:boolean

	thisPageRoute:string='memberM/infoChange'
	constructor(
		private infoChangeService:InfoChangeService,
		private router:Router,
		private route:ActivatedRoute,
		private pop:PopService,
		private auth:AuthRoleService,
	){}

	ngOnInit(){
		this.subscribeRouteParams()
		// this.btnClick(0);
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
				paramMap['params']['status']?this.status=parseInt(paramMap['params']['status']):null

				// paramMap['params']['rows']?this.rows=paramMap['params']['rows']:null
				// paramMap['params']['rows']?this.rows=paramMap['params']['rows']:null
			

			this.queryData()
		})
	}

	navigate(){
		let routeParam:{
			page,
			rows,
			status?
		}={
			page:this.page,
			rows:this.rows,
		}

		if (this.status) {
			routeParam.status=this.status
		}

		console.log("router",this.router)
		console.log("activerouter",this.route)

		this.router.navigate([this.thisPageRoute,routeParam])


	}

	// btnClick(param:number){
	// 	this.status=param;
	// 	this.queryData()

	// }

	queryData(){
		this.loading=true
		this.infoChangeService
			.getListData({
				status:this.status,
				page:this.page+1,
				rows:this.rows
			})
			.then(res=>{
				this.handleData(res)
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
	handleData(res){
		this.dataList=res.body.records;
		this.count=res.body.paginator.totalCount;
		this.sourceFrom(this.dataList)
	}
	sourceFrom(res:any){
		for(let i in res){
			if(res[i].source==1){
				res[i].sourceDic=res[i].serviceMan
			}
		}
	}
	//审批
	check(row){
		this.router.navigate(['memberM/infoChange/detail',row.updateApplyId],{queryParams: {isCheck:true}})
	}

	//详情
	detail(row){
		this.router.navigate(['memberM/infoChange/detail',row.updateApplyId])
	}

}