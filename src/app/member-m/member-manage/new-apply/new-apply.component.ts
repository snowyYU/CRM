import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router'
import { PopService } from 'dolphinng'
import { NewApplyService,SendData } from './new-apply.service'

@Component({
	moduleId: module.id,
	selector: 'new-apply',
	templateUrl: 'new-apply.component.html',
	styleUrls:['new-apply.component.less'],
	providers:[NewApplyService]
})
export class NewApplyComponent implements OnInit {
	companyName:string
	memberId:number

	newData:object={}
	productList:Array<any>
	productTypeName:string
	//需要提交的数据
	productId			//产品ID
	oldCreditValue		//原授信额
	operateType			//操作类型，0：新增授信；1：重新授信型；
	addCreditValue		//新增授信额
	appId				//渠道ID
	expiryDateBegin		//有效期(开始)：格式：yyyy-MM-dd
	expiryDateEnd		//有效期(结束)：格式：yyyy-MM-dd
	authRemark			//申请理由

	constructor(
		private route:ActivatedRoute,
		private router:Router,
		private pop:PopService,
		private newApply:NewApplyService
		) {}

	ngOnInit() {
		this.renderPage()
		this.getProductsList()
	}

	renderPage(){
		let data=JSON.parse(this.route.params['value']['data'])
		console.log(data)
		this.companyName=data.companyName
		this.memberId=data.memberId
		this.appId=data.appId
	}

	getProductsList(){
		this.newApply.getProductsList(this.appId)
			.then(res=>{
				console.log(res)
				//创建一个键值对对象
				
				res.body.records.forEach(e=>{
					this.newData[e.productId]=e
				})
				this.productList=res.body.records
			})
			.catch(res=>{
				this.pop.error({
					title:'错误提示',
					text:res.message
				})
			})
	}

	selectProduct(id){
		this.productTypeName=this.newData[id].productTypeName
		console.log(this.productTypeName)

		this.newApply.checkApplyExist(0,this.memberId,id)
			.then(res=>{
				console.log(res)
			})
			.catch(res=>{
				this.pop.error({
					title:'错误提示',
					text:res.message
				})
				this.productTypeName=""
				this.productId=""
			})

	}

	submit(){
		let data:SendData={
			memberId:this.memberId,
			productId:this.productId,			//产品ID
			oldCreditValue:0,		//原授信额
			operateType:0,			//操作类型，0：新增授信；1：重新授信型；
			addCreditValue:this.addCreditValue,		//新增授信额
			appId:this.appId,				//渠道ID
			authRemark:this.authRemark			//申请理由
		}
		this.newApply.submitData(data)
			.then(res=>{
				console.log(res)
				this.pop.info({
					title:'提示框',
					text:'已提交授信申请，请等待风控审核！'
				})
				this.router.navigate(['memberM/memberManage'])
			})
			.catch(res=>{
				this.pop.error({
						title:'错误提示',
						text:res.message
					})
			})

	}
	cancel(){
		window.history.back()
	}


}