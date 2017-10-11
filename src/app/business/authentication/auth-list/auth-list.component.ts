import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
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
	constructor(
		private authList:AuthListService,
		private router:Router,
		private route:ActivatedRoute,
		private pop:PopService,
		private authRole:AuthRoleService

		){}

	ngOnInit(){
		this.authApplyReplyNum=this.route.params['value']['count'];
		this.getList(1)

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
		this.router.navigate(['business/customerList/authDetail',data.authId])
	}

}