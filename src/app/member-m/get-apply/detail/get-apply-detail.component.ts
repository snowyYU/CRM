import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { PopService } from 'dolphinng';
import { GetApplyDetailService } from './get-apply-detail.service'
import { SessionStorageService } from '../../../../services/session-storage/session-storage.service';

@Component({
	selector:'get-apply-detail',
	templateUrl:'./get-apply-detail.component.html',
	styleUrls:['./get-apply-detail.component.less'],
	providers:[GetApplyDetailService]
})
export class GetApplyDetailComponent implements OnInit{
	creditAuthId:number; 			//申请ID
	createTime:string;		//申请时间	
	memberId
	memberName:string;		//客户名称
	statusDic:string;		//状态
	status
	productName:string;	//申请产品
	productTypeName:string;	//产品类型
	serviceMan:string;		//服务经理
    addCreditValue		//申请额度			
	oldCreditValue		//原授信额度
	expiryDateBegin		//有效期开始
	expiryDateEnd		//有效期结束
	authRemark		//申请原因
	auditBy:string;			//审批人
    auditDate:string;		//审批时间
	auditRemark:string;		//审批意见

	totalCreditValue:number=0;        //总授信额
	
	modalDataList:any
	modalListLoading:boolean
	productList:any[]
	
	//用于记录提交申请前的页面
	memberDetailDomain

	constructor(
		private router:Router,
		private route:ActivatedRoute,
		private pop:PopService,
		private getApplyDetail:GetApplyDetailService,
		private sessionStorage:SessionStorageService
		){}
	ngOnInit(){
		this.getData();
		this.getProductsList();
		// this.getCreditData();
	}

	getData(){
		this.getApplyDetail.getData(JSON.parse(this.route.params['value']['data']).creditAuthId)
						.then(res=>{
							console.log(res)
							this.handle(res)
						})
						.catch(res=>{
							this.pop.error({
								title:'错误信息',
								text:res.message
							})
						})
	}

	getProductsList(){
		this.getApplyDetail.getProductsList(JSON.parse(this.route.params['value']['data']).memberId)
		.then(res=>{
			console.log(res)
			this.productList=res.body.records
			if(this.productList&&this.productList.length>0){
				for(let i=0;i<this.productList.length;i++){
					if (this.productList[i].creditFacility) {
						this.totalCreditValue+=this.productList[i].creditFacility.creditValue
						
					}
				}
			}
		})
		.catch(res=>{
			this.pop.error({
				title:'错误信息',
				text:res.message
			})
		})
	}

	getCreditData(){
		this.getApplyDetail.getCreditData(JSON.parse(this.route.params['value']['data']).memberId)
			.then(res=>{
				console.log(res)
				this.modalDataList=res.body.records
			})
			.catch(res=>{
				this.pop.error({
					title:'错误提示',
					text:res.message
				})
			})
	}

	handle(res){
		console.log(res)
		this.creditAuthId=res.body.creditAuthId; 			//申请ID
		this.createTime=res.body.createTime;		//申请时间	
		this.memberId=res.body.memberId
		this.memberName=res.body.memberName;		//客户名称
		this.statusDic=res.body.statusDic;		//状态
		this.status=res.body.status;		//状态
		this.productName=res.body.productName;	//申请产品
		this.productTypeName=res.body.productTypeName;	//会员类别
		this.serviceMan=res.body.serviceMan;		//服务经理
	    this.addCreditValue=res.body.addCreditValue	//申请额度
		this.oldCreditValue=res.body.oldCreditValue	//原授信额度
		this.expiryDateBegin=res.body.expiryDateBegin	//有效期开始
		this.expiryDateEnd=res.body.expiryDateEnd	//有效期结束
		this.authRemark=res.body.authRemark	//申请原因
		this.auditBy=res.body.auditBy;			//审批人
	    this.auditDate=res.body.auditDate;		//审批时间
	    this.auditRemark=res.body.auditRemark;		//审批意见
	}

	back(){
		console.log(this.sessionStorage.memberDetailDomain)
		if(!!this.sessionStorage.memberDetailDomain){
			this.memberDetailDomain=this.sessionStorage.memberDetailDomain
			this.sessionStorage.deleteItem('memberDetailDomain')
			this.router.navigate([this.memberDetailDomain])
		}else{
			window.history.back()
		}
	}

}