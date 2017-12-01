import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { PopService } from 'dolphinng'
import { RelativeCompanyService,SendData } from './relative-company.service' 

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
		// this.queryData()
		this.getDataList()
	}

/*	queryData(){
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
	}*/

	getDataList(){
		let sendData:SendData={
			rows:this.rows,
			page:this.page+1
		}
		this.relativeCompany.getDataList(sendData)
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
		let companyList={
			companyId:row.companyId,                             //企业编号
			companyName:row.companyName,                         //企业名称
			natureofBusinessDic:row.natureofBusinessDic,         //企业性质
			registeredCapital:row.registeredCapital,             //注册资本
			companyAddress:row.companyProvince+row.companyCity,  //总部所在地	
			realoperator:row.realoperator,                       //实际控制人
			realoperatorInsto:row.realoperatorInsto,             //持股比例
			shareholderNum:row.shareholderNum,                   //股东数
			yeartotalValue:row.yeartotalValue,                   //年总产值
			yeartotalGoods:row.yeartotalGoods,                   //年发货总量
			num1:row.num1,                                       //财务纠纷
			num2:row.num2,                                       //动产抵押
			companyRating:row.companyRating,                     //企业评级 单大写字母
			companyRatingGrate:row.companyRatingGrate            //企业评级分数
		}
		// this.router.navigate(['memberM/relativeCompany/detail',row.companyId])
		this.router.navigate(['memberM/relativeCompany/detail',JSON.stringify(companyList)])
	}

}