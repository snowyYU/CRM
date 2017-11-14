import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router'
import { PopService } from 'dolphinng'
import { MemberDetailService } from './member-detail.service'

@Component({
	moduleId: module.id,
	selector: 'member-detail',
	templateUrl: './member-detail.component.html',
	styleUrls:['./member-detail.component.less'],
	providers:[MemberDetailService]
})
export class MemberDetailComponent implements OnInit {
	companyName    	//客户名称	
	memberId
	createTime	//创建日期 
	prmResourceRegister:{
		createBy?
		createTime?
		ipServer?
		isDelete?
		isNewRecord?
		keySecret?
		remarks?
		resourceId?
		resourceMaster?
		resourceName?
		resourceType?
		token?
		updateBy?
		updateTime?
	}={}//prmResourceRegister.resourceName归属渠道
	memberTypeDic//类别
	memberStatusDic//状态
	serviceMan//服务经理
	
	//企业基本信息(接口)	（公司信息 法人信息 借款人信息 银行信息）				电子附件查看（接口）
	//风控补充(接口)		（资产信息 负债信息 履约信息）
	//运营状况(接口)		 (运营信息)
	
	
	//尽调报告查看(接口)								
	reportsVo:{
		createBy?
		createTime?
		fileLoadId?
		fileNumber?
		fileType?
		fileTypeDic?
		isDelete?
		isNewRecord?
		memberId?
		remarks?
		token?
		updateBy?
		updateTime?
	}={} //reportsVo.updateTime更新时间 
	memberRating //信用等级
	memberRatingGrate //信用评分法				评估日期(暂无)

	constructor(
			private router:Router,
			private route:ActivatedRoute,
			private pop:PopService,
			private memDetail:MemberDetailService
		) {}

	ngOnInit() {
		this.getDetailData()
	}

	getDetailData(){
		this.memberId=this.route.params['value']['id']
		this.memDetail.getMainDetail(this.memberId)
			.then(res=>{
				this.renderData(res)
			})
	}
	renderData(data){
		console.log(data)
		this.companyName=data.body.companyName    	//客户名称	
		// this.memberId=data.body.memberId
		this.createTime=data.body.createTime	//创建日期 
		this.prmResourceRegister=data.body.prmResourceRegister?data.body.prmResourceRegister:{}//prmResourceRegister.resourceName归属渠道
		this.memberTypeDic=data.body.memberTypeDic//类别
		this.memberStatusDic=data.body.memberStatusDic//状态
		this.serviceMan=data.body.serviceMan//服务经理
		this.reportsVo=data.body.reportsVo //reportsVo.updateTime更新时间 
		this.memberRating=data.body.memberRating //信用等级
		this.memberRatingGrate=data.body.memberRatingGrate //信用评分法				评估日期(暂无)

	}

	eleAttachment(){
		this.router.navigate(['memberM/memberManage/detail',this.memberId,'eleAttachment'])
	}

	companyInfo(hash:string){
		this.router.navigate(['memberM/memberManage/detail',this.memberId,'companyInfo'],{queryParams: { hash: hash }})
	}

	riskM(hash:string){
		this.router.navigate(['memberM/memberManage/detail',this.memberId,'riskM'],{queryParams: { hash: hash }})
	}

	runSituation(){
		this.router.navigate(['memberM/memberManage/detail',this.memberId,'runSituation'])

	}

	back(){
		// window.history.back()
		this.router.navigate(['memberM/memberManage'])
	}
}