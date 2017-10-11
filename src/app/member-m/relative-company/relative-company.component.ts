import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { PopService } from 'dolphinng'
import { RelativeCompanyService } from './relative-company.service' 

@Component({
	moduleId: module.id,
	selector: 'relative-company',
	templateUrl: 'relative-company.component.html',
	styleUrls:['relative-company.component.less'],
	providers:[RelativeCompanyService]
})
export class RelativeCompanyComponent implements OnInit {
	loading:boolean
	dataList:any[]

	page:number=0
	rows:number=10
	count:number
	constructor(
		private router:Router,
		private pop:PopService,
		private relativeCompany:RelativeCompanyService
		) {}

	ngOnInit() {
		this.queryData()
	}

	queryData(){
		this.relativeCompany.getDataList(this.page+1,this.rows)
			.then(res=>{
				this.handleData(res)
			})
			.catch(res=>{
				this.pop.error({
					title:'错误信息',
					text:res.message
				})
			})
	}

	handleData(res){
		console.log(res)
		this.dataList=res.body.records
		this.count=res.body.paginator.totalCount

	}

	detail(row){
		this.router.navigate(['memberM/relativeCompany/detail',row.companyId])
	}

}