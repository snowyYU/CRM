import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router'
import { PopService } from 'dolphinng'
import { RelativeDetailService } from './relative-detail.service'

@Component({
  selector: 'app-relative-detail',
  templateUrl: './relative-detail.component.html',
  styleUrls: ['./relative-detail.component.less'],
  providers:[RelativeDetailService]
})
export class RelativeDetailComponent implements OnInit {
	companyId
  companyList
	memberList:{
		companyId? //企业ID
		carryingGoodsRate?		//运输比例
		companyRatingGrate?		//企业评级分数
		companyType?		//类别\r\n相对于会员来说：1 上游，2 下游'
		complianceDegree?		//企业配合程度
		contractItem?		//合同强制条款
		goodsProperty?		//货物性质：1易损物品，2易变型物品，3不易损坏
		honorRate?		//承兑比例
		loadProperty?		//装卸类型：1难装卸，2好装卸，3普通装卸，4好配整车货\
		memberId?		//会员ID
		payCycle?		//付款周期
		relaNum?		//物流企业数
		reputation?		//外围口碑1 很好2 良好3 一般4 较差
		transitArea?		//运输区域1 华南2 华中3 西北4 华北5 华东
		yeartotalGoods?		//年物流发货总量
		member?		//会员
    show?
	}[]=[]

	

  constructor(
    private router:Router,
  	private route:ActivatedRoute,
  	private pop:PopService,
  	private relativeD:RelativeDetailService
  	) { }

  ngOnInit() {
    this.getCompanyData()
  	// this.companyId=this.route.params['value']['id']
  	this.getDetailData()
  }

  getCompanyData(){
    let data=JSON.parse(this.route.params['value']['data'])
    console.log(data)
    this.companyId=data.companyId
    this.companyList=data
  }

  getDetailData(){
  	this.relativeD.getDetailData(this.companyId)
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
    this.memberList=res.body.records

  }

  back(){
    window.history.back()
  }
}
