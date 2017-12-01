import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';
import { AuthListService,SendData } from './auth-list.service';
import { PopService } from 'dolphinng'
import { AuthRoleService } from '../../../../services/authRole/authRole.service'



@Component({
	selector:'auth-list',
	templateUrl:'./auth-list.component.html',
	styleUrls:['./auth-list.component.less'],
	providers:[AuthListService]
})
export class AuthListComponent implements OnInit{
	dataList:any
	//分页参数
	loading:boolean
	page:number=0;
	count:number
	rows:number=10;
	authApplyReplyNum:number

	thisPageRoute:string='business/customerList/authList'
	constructor(
		private authList:AuthListService,
		private router:Router,
		private route:ActivatedRoute,
		private pop:PopService,
		private authRole:AuthRoleService

		){}

	ngOnInit(){
		this.authApplyReplyNum=this.route.params['value']['count'];
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

				// paramMap['params']['rows']?this.rows=paramMap['params']['rows']:null
				// paramMap['params']['rows']?this.rows=paramMap['params']['rows']:null
			this.getList(this.authApplyReplyNum)
		})
	}

	navigate(){
		let routeParam:{
			page,
			rows,
		}={
			page:this.page,
			rows:this.rows,
		}

		console.log("router",this.router)
		console.log("activerouter",this.route)

		this.router.navigate([this.thisPageRoute+'/'+this.authApplyReplyNum,routeParam])
	}
	
	getList(type){
		this.loading=true;

		this.authApplyReplyNum=type
		let sendData:SendData={
			page:this.page+1,
			rows:this.rows,
			
			// serviceMan:this.authRole.userName,
			qryStatus:type,
		}
		this.authList.getListData(sendData)
					.then(res=>{
						this.handleListData(res)
					})
					.catch(res=>{
						this.pop.error({
							title:'错误提示',
							text:res.message
						})
					this.loading=false;

					})
	}
	handleListData(res){
		console.log(res);
		this.loading=false;
		this.count=res.body.paginator.totalCount;
		this.dataList=res.body.records;
	}

	detail(data){
		this.router.navigate(['business/customerList/authDetail',data.authId],{queryParams: { status: this.authApplyReplyNum }})
	}

}