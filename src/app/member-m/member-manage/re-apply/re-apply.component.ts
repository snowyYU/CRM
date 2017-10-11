import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router'
import { PopService } from 'dolphinng'
import { ReApplyService,SendData } from './re-apply.service'
import { EffDateFormatPipe } from '../../../../pipe/eff-date-format/eff-date-format.pipe'

@Component({
	moduleId: module.id,
	selector: 're-apply',
	templateUrl: 're-apply.component.html',
	styleUrls:['./re-apply.component.less'],
	providers:[ReApplyService,EffDateFormatPipe]
})
export class ReApplyComponent implements OnInit {
	companyName:string
	memberId:number

	newData:object={}
	productList:Array<any>
	productTypeName:string
	productName:string
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
		private reApply:ReApplyService,
		private datePipe:EffDateFormatPipe
		) {}

	ngOnInit() {
		this.renderPage()
	}

	renderPage(){
		let data=JSON.parse(this.route.params['value']['data'])
		console.log(data)
		this.companyName=data.companyName
		this.productId=data.productId,
		this.productName=data.productName
		this.productTypeName=data.productTypeName
		this.memberId=data.memberId
		this.appId=data.appId
		this.oldCreditValue=data.creditValue
		this.expiryDateBegin=data.expiryDateBegin
		this.expiryDateEnd=data.expiryDateEnd
	}

	

	submit(){
		let data:SendData={
			memberId:this.memberId,
			productId:this.productId,			//产品ID
			oldCreditValue:this.oldCreditValue,		//原授信额
			operateType:1,			//操作类型，0：新增授信；1：重新授信型；
			addCreditValue:this.addCreditValue,		//新增授信额
			expiryDateBegin:this.datePipe.transform(this.expiryDateBegin,[]),
			expiryDateEnd:this.datePipe.transform(this.expiryDateEnd,[]),
			appId:this.appId,				//渠道ID
			authRemark:this.authRemark			//申请理由
		}
		this.reApply.submitData(data)
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