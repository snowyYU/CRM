import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router'
import { InfoChangeDetailService,SendData } from './info-change-detail.service'
import { PopService } from 'dolphinng'

import { AuthRoleService } from '../../../../services/authRole/authRole.service'

@Component({
	selector:'info-change-detail',
	templateUrl:'./info-change-detail.component.html',
	styleUrls:['./info-change-detail.component.less'],
	providers:[InfoChangeDetailService]
})

export class InfoChangeDetailComponent implements OnInit {
	//判断是审核还是详情
	isCheck:boolean

	//定位模板字段：
	changeTypeDic //变更手机号|变更银行卡|添加银行卡|删除银行卡
	changeType    //1:变更手机号|2：变更银行卡|3：添加银行卡|4：删除银行卡
	updateApplyId   //变更申请单ID
	createTime      //申请时间
	memberName      //客户名称 						
	statusDic        //状态        
	appName         //归属渠道		
	serviceMan      //服务经理
	//新资料   												
	newPhone		//新手机号										
	newCardNo		//新银行卡号									 	 
	newCardName		//开户名										
	newBankName		//开户行										
	newSubbankName		//支行名称									
	newTypeDic		//银行卡类型										
	//原有资料
	oldPhome//原手机号
	companyBankCard
	//companyBankCard.cardNo       原银行卡号
	//companyBankCard.cardName       开户名
	//companyBankCard.bankName       开户行
	//companyBankCard.subbankName       支行名称
	//companyBankCard.typeDic       银行卡类型

	//审核意见
	applyMessage	
	constructor(
		private route:ActivatedRoute,
		private router:Router,
		private infoChangeDetailService:InfoChangeDetailService,
		private pop:PopService,
		private auth:AuthRoleService
		) {}

	ngOnInit() {
		this.getDetailData()
		if (this.route.queryParams['value']['isCheck']) {
    			this.isCheck=this.route.queryParams['value']['isCheck']
    		}else{
    			this.isCheck=false
    		}
	}

	getDetailData(){
		let id:number=this.route.params['value']['id']
		this.infoChangeDetailService.getDetailData(id)
			.then(res=>{
				console.log(res)
				this.handleData(res)
			})
			.catch(res=>{
				this.pop.error({
					title:'错误提示',
					text:res.message
				})
			})
	}

	handleData(res){
		this.changeTypeDic=res.body.changeTypeDic //变更手机号|变更银行卡|添加银行卡|删除银行卡
		this.changeType=res.body.changeType    //1:变更手机号|2：变更银行卡|3：添加银行卡|4：删除银行卡
		this.updateApplyId=res.body.updateApplyId   //变更申请单ID
		this.createTime=res.body.createTime      //申请时间
		this.memberName=res.body.memberName      //客户名称 						
		this.statusDic=res.body.statusDic        //状态        
		this.appName=res.body.appName         //归属渠道		
		this.serviceMan=res.body.serviceMan      //服务经理
		//新资料   												
		this.newPhone=res.body.newPhone		//新手机号										
		this.newCardNo=res.body.newCardNo		//新银行卡号									 	 
		this.newCardName=res.body.newCardName		//开户名										
		this.newBankName=res.body.newBankName		//开户行										
		this.newSubbankName=res.body.newSubbankName		//支行名称									
		this.newTypeDic=res.body.newTypeDic		//银行卡类型										
		//原有资料
		this.oldPhome=res.body.oldPhome//原手机号
		this.companyBankCard=res.body.companyBankCard

		this.applyMessage=res.body.applyMessage
	}

	back(){
		window.history.back()
	}

	submit(param:number){
		let id:number=this.route.params['value']['id']
		let sendData:SendData={
			updateApplyId:id,
			status:param,
			applyMessage:this.applyMessage
		}
		this.infoChangeDetailService.submitData(sendData)
			.then(res=>{
				console.log(res)
				this.pop.confirm({
					title:'提示框',
					text:'提交成功！是否跳转至资料变更列表页面'
				}).onConfirm(res=>{
					this.router.navigate(['memberM/infoChange'])
				})
			})
			.catch(res=>{
				this.pop.error({
					title:'错误提示',
					text:res.message
				})
			})
	}

}