import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router'
import { PopService } from 'dolphinng'
import { ElectricAccService,SendData } from './electric-acc.service'

@Component({
	moduleId: module.id,
	selector: 'electric-acc',
	templateUrl: 'electric-acc.component.html',
	styleUrls:['./electric-acc.component.less'],
	providers:[ElectricAccService]
})
export class ElectricAccComponent implements OnInit {

	secondShow:boolean=false

	agree:boolean=false
	result:boolean=false

	memberNameQ
	memberName   //会员名称	 
	memberId   //id				
	isOpenAcctDic:string   //开户状态
	appName   //归属渠道
	appId
	bankName   //开户行

	accountType   //账户类型
	accountTypeDic
	accountTypeList:any[]

	accountName   //账户名称
	//配置账户（显示）
	accountId	//二级账户
	bankAccount

	checkList:object={}
	slaveAccounts	//三级账户[]

	
	
	memberType
	
	inGoldType

	inGoldTypeV:boolean=false

	inGoldTypeList:any[]=[]

	inGoldTypeSubmitting:boolean=false

	//开户modal框
	bankAccountM
	accountNameM
	accountTypeDicM
	slaveAccountsM:any[]=[]


	destroySubmitting:boolean=false
	openAccSubmitting:boolean=false

	constructor(	
		private router:Router,
		private route:ActivatedRoute,
		private pop:PopService,
		private eleAcc:ElectricAccService
		) {}

	ngOnInit() {
		if (this.route.queryParams['value']['hash']) {
			this.memberNameQ=this.route.queryParams['value']['hash']
			this.getDetailData()
		}
		this.getAccTypeList()
		

	}

	getDetailData(){
		this.agree=false
		this.secondShow=true
		this.getAccTypeList()
		this.inGoldTypeList=[]

		this.eleAcc.getDetailData(this.memberNameQ)
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
		this.isOpenAcctDic=res.body.isOpenAcctDic
		this.memberName=res.body.memberName   //会员名称	 
		this.memberId=res.body.memberId   //id	
		this.appName=res.body.appConfig.appName   //归属渠道
		this.appId=res.body.appConfig.appId
		this.bankName=res.body.appConfig.bankName   //开户行
		if (this.isOpenAcctDic=="已开户") {
			this.accountTypeDic=res.body.accountTypeDic
			this.accountTypeList=res.body.accountData.accountTypeList
			this.accountName=res.body.accountData.accountName   //账户名称
			this.accountId=res.body.accountData.accountId	//二级账户
			this.bankAccount=res.body.accountData.bankAccount
			this.slaveAccounts=res.body.accountData.slaveAccounts	//三级账户[]
		}else{
			this.accountName=this.memberName


			if (res.body.appConfig.ordinaryAcctTypeDicList) {
				res.body.appConfig.ordinaryAcctTypeDicList.forEach(e=>{
					let o:{label?:string,value?:string}={}
					for(let i in e){
						this.checkList[i]=e[i]
						o.label=e[i]
						o.value=i
					}
					this.inGoldTypeList.push(o)
				})
			}
			
			
			console.log(this.checkList)
			console.log(this.inGoldTypeList)
		}
		
		

	}

	eleSignature(){
		this.router.navigate(['account/electricAcc/signature'])
	}

	getAccTypeList(){
		this.eleAcc.getAccountType()
			.then(res=>{
				console.log(res)
				this.accountTypeList=res.body.records
			})
			.catch(res=>{
				this.pop.error({
					title:'错误信息',
					text:res.message
				})
			})
	}

	openInGold(){
		this.inGoldTypeV=true
	}

	openAcc(){
		// this.inGoldTypeSubmitting=true
		this.openAccSubmitting=true
		let data={
				appId:this.appId,			//渠道id 	
				memberId:this.memberId,				
				memberName:this.memberName,			//会员名称 				
				 					
				memberType:this.memberType,			//会员类别（1：企业；2个人）  
							
				accountName:this.accountName,			//账户名称				
				inGoldType:this.inGoldType,			//入金账户类型选择		
		}

		this.eleAcc.openMemberAccount(data)
			.then(res=>{
				console.log(res)
				// this.inGoldTypeSubmitting=false
				this.openAccSubmitting=false


				this.inGoldTypeV=false
				// this.result=true
				this.bankAccountM=res.body.bankAccount
				this.accountNameM=res.body.accountName
				this.accountTypeDicM=res.body.accountTypeDic
				this.slaveAccountsM=res.body.slaveAccounts
				this.getDetailData()
				// this.pop.info({
				// 	title:'提示信息',
				// 	text:'提交成功！'
				// })
			})
			.catch(res=>{
				// this.inGoldTypeSubmitting=false
				this.openAccSubmitting=false

				
				this.pop.error({
					title:'错误信息',
					text:res.message
				})
			})

	}

	closeModal(){
		this.result=false
		this.inGoldTypeV=false
	}

	destroy(){
		this.pop.confirm({
					title:'操作确认',
					text:'确认注销账户吗?'
				}).onConfirm(()=>{
					this.destroySubmitting=true
					this.eleAcc.destroyAcc(this.accountId,this.appId,this.memberId)
						.then(res=>{
							console.log(res)
							this.destroySubmitting=false
							this.pop.info({
								title:'提示信息',
								text:'操作成功！'
							})
							this.getDetailData()
						})
						.catch(res=>{
							this.destroySubmitting=false
							
							this.pop.error({
								title:'错误信息',
								text:res.message
							})
						})
				})
		
	}


}