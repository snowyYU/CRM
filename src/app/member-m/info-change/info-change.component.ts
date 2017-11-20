import { Component,OnInit } from '@angular/core';

import { Router } from '@angular/router'
import { InfoChangeService } from './info-change.service'
import { SendData } from './sendData'
import { PopService } from 'dolphinng'
import { AuthRoleService } from '../../../services/authRole/authRole.service'

import { SessionStorageService } from '../../../services/session-storage/session-storage.service'

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
	constructor(
		private infoChangeService:InfoChangeService,
		private router:Router,
		private pop:PopService,
		private auth:AuthRoleService,
		private sessionStorage:SessionStorageService
	){}

	ngOnInit(){
		this.btnClick(0);
	}
	btnClick(param:number){
		this.status=param;
		this.queryData()

	}
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
	sessionDispose(){
		let uri='memberM/infoChange'
		this.sessionStorage.memberDetailDomain=uri
	}
	//审批
	check(row){
		this.sessionDispose()
		this.router.navigate(['memberM/infoChange/detail',row.updateApplyId],{queryParams: {isCheck:true}})
	}

	//详情
	detail(row){
		this.router.navigate(['memberM/infoChange/detail',row.updateApplyId])
	}

}