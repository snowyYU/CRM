import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { PopService } from 'dolphinng'
import { SignatureService } from './signature.service'

@Component({
	moduleId: module.id,
	selector: 'signature',
	templateUrl: 'signature.component.html',
	styleUrls:['./signature.component.less'],
	providers:[SignatureService]
})
export class SignatureComponent implements OnInit {

	memberNameQ
	memberNameQKey:string=""

	type:string
	openVisiable:boolean=false
	secondShow:boolean=false

	memberId							//会员id 
	companyName							//会员名称
	signatureUserStatus					//状态，0：已开通；1：未开通
	signatureUserStatusDit				//状态，中文 

	//搜索框下拉列表
	memberList:any[]=[]

	//两个复选框
	eleA:boolean=false
	person:boolean=false
	companyborrower:{

		addAttachList?
		attachList?
		borrwerDegree?
		borrwerIdcard?
		borrwerMarry?
		borrwerMarryDic?
		borrwerMobile?
		borrwerPerson?
		createBy?
		createTime?
		deleteAttachList?
		isDelete?
		isNewRecord?
		memberId?
		remarks?
		token?
		updateBy?
		updateTime?
	}={}

	companyLegal:{

		addAttachList?
		attachList?
		createBy?
		createTime?
		deleteAttachList?
		isDelete?
		isNewRecord?
		legalDegree?
		legalIdcard?
		legalMarry?
		legalMarryDic?
		legalMobile?
		legalPerson?
		memberId?
		remarks?
		token?
		updateBy?
		updateTime?
	}={}

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
	}={}
	company:{

		addAttachList?
		attachList?
		companyAddress?
		companyName?
		companyType?
		companyTypeName?
		createBy?
		createTime?
		deleteAttachList?
		foundTime?
		isDelete?
		isNewRecord?
		licenceNum?
		linkMobile?
		linkName?
		memberId?
		registerCapital?
		remarks?
		token?
		updateBy?
		updateTime?
	}={}
	eaccount:{
		accountId?
		createBy?
		createTime?
		isDelete?
		isNewRecord?
		memberId?
		remarks?
		signatureid1?
		signatureid2?
		token?
		updateBy?
		updateTime?
		}={}
	//prmResourceRegister.resourceId		//渠道ID（等同于appId）
	//prmResourceRegister.resourceName	//渠道名称（等同于appName）
	//company.companyType					//公司类型
	//company.companyTypeName				//公司类型，中文
	//company.licenceNum					//营业执照号
	//companyLegal.legalPerson			//法人姓名
	//companyborrower.borrwerPerson		//借款人姓名
	//companyborrower.borrwerIdcard		//借款人身份证号
	//companyborrower.borrwerMobile		//借款人手机号
	userSeal1Base64						//公司签章（base64位编码图片）
	userSeal2Base64						//个人签章（base64位编码图片）
	//eaccount.signatureid1				//公司签章UUID
	//eaccount.signatureid2				//个人签章UUID

	constructor(
		private router:Router,
		private pop:PopService,
		private sig:SignatureService
		) {}

	ngOnInit() {
		
	}

	getDetailData(){
		this.eleA=false
		this.person=false
		this.secondShow=true
		this.sig.getDetailData(this.memberNameQ)
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
		this.signatureUserStatusDit=res.body.signatureUserStatusDit
		this.prmResourceRegister=res.body.prmResourceRegister?res.body.prmResourceRegister:{}
		this.eaccount=res.body.eaccount?res.body.eaccount:{}
		this.company=res.body.company?res.body.company:{}
		this.companyborrower=res.body.companyborrower?res.body.companyborrower:{}
		this.companyLegal=res.body.companyLegal?res.body.companyLegal:{}
		this.memberId=res.body.memberId							//会员id 
		this.companyName=res.body.companyName							//会员名称
		this.userSeal1Base64=res.body.userSeal1Base64
		this.userSeal2Base64=res.body.userSeal2Base64
	}

	eleAcc(){
		this.router.navigate(['account/electricAcc/openAcc'])
	}

	openSig(){
		console.log("per",this.person)
		console.log("ele",this.eleA)
		let type
		if (this.person) {
			if (this.eleA) {
				type="3"
			}else{
				type="2"
			}
		}else{
			if (this.eleA) {
				type="1"
			}else{
				this.pop.error({
					title:'错误信息',
					text:'请选择开通的签章类型'
				})
				return
			}
		}
		this.openFun(type)
		
	}

	openFun(type){
		this.type=type
		this.sig.openSignature(this.memberId,type)
			.then(res=>{
				console.log(res)
				this.openVisiable=true
				if (res.body.userSeal1Base64) {
					this.userSeal1Base64=res.body.userSeal1Base64
					this.eaccount.signatureid1=res.body.signatureid1
				}
				if (res.body.userSeal2Base64) {
					this.userSeal2Base64=res.body.userSeal2Base64
					this.eaccount.signatureid2=res.body.signatureid2
				}
				this.getDetailData()
			})
			.catch(res=>{
				this.pop.error({
					title:'错误信息',
					text:res.message
				})
			})
	}

	destroy(type){
		let userId
		if (type=="1") {
			userId=this.eaccount.signatureid1
		}else{
			userId=this.eaccount.signatureid2

		}

		this.pop.confirm({
			title:'操作确认',
			text:'确定要注销签章吗?'
		}).onConfirm(()=>{
			this.sig.destroyAcc(this.memberId,userId,type)
			.then(res=>{
				console.log(res)
				this.pop.info({
					title:'提示信息',
					text:'注销成功!'
				})

				this.getDetailData()

			})
			.catch(res=>{
				this.pop.error({
					title:'错误信息',
					text:res.message
				})
			})
		})
		
	}

	closeModal(){
		this.openVisiable=false

	}

	// 搜索框的模糊下拉查询相关方法
	clearMemberList(){
		this.memberList=[]
	}
	queryMemberList(key){
		console.log(key)
		this.sig.getByMemberName(key)
			.then(res=>{
				this.memberList=res.body.records	
			})
			.catch(res=>{
				if (res.status==107) {
					this.memberList=[]
				}else{
					this.pop.error({
						title:'错误信息',
						text:res.message
					})
				}
			})
	}
	

}