import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router'
import { PopService } from 'dolphinng'
import { DetailService } from './detail.service';
import { GalleryComponent} from 'dolphinng';
import { PreviewerComponent } from '../../../../utils/previewer/previewer.component'
import {img,file } from "../../../../utils/previewer/filetype"

@Component({
	moduleId: module.id,
	selector:'detail',
	templateUrl:'./detail.component.html',
	styleUrls:['detail.component.less'],
	providers:[DetailService]
})

export class DetailComponent implements OnInit {
	attachment:object={}
	
	loading1:boolean     //是否获取到数据1
	loading2:boolean    //是否获取到数据2
	loading3:boolean    //是否获取到数据3
	repaymentPlanModal:boolean  //还款计划模态框
	modalSize:string='lg'  //模态框大小

	contractModal:boolean  //合同模态框


	applyAmount
	applyVos
	beginTime
	cardNo
	contracts
	createBy
	deadlineDate
	endTime
	extendCycle
	extendRate
	financeProveDataVos
	fromBillId
	fromServerIp
	isContract
	isDelete
	isNewRecord
	isOver
	limitDay
	limitTime
	overRate
	penaltyRate
	remarks
	repaymentWay
	resourceId
	rolloverDeposit
	stage
	toWhereDic
	updateBy
	updateTime
	waybills

	approveAmount//审批金额（实际放款金额）
	createTime//申请时间
	borrowApplyId//借款单编号
	companyName//公司名称
	loanTime//放款时间
	memberId//会员编码
	paymentWay//还款方式
	paymentWayDic//还款方式，中文
	productId//产品编号
	productName//产品名称
	rate//利率
	rateType//计息方式
	rateTypeDic//计息方式，中文
	ratedCycle//贷款周期
	status//状态
	statusName//状态名称
	statusName2//状态名称2
	toWhere//放款去向（放款类型：1：线下，2：线上）	

	auditOneBy//一审人员
	auditOneTime//一审时间
	auditOneRemarks//一审意见
	auditTwoBy//二审人员
	auditTwoTime//二审时间
	auditTwoRemarks//二审意见

	fileLoadId//文件读取码

	contractList:any[]//合同列表
	contractData:{//合同对象
		borrowApplyId?
		companyName?
		contractId?
		contractNum?
		contractTitle?
		contractType?
		createTime?
		eSignatureId?
		eSignatureStatus?
		eSignatureStatusDic?
		eSignatureTime?
		fileLoadId?
		fileName?
		isNewRecord?
		memberId?
		resourceId?
		resourceName?
		isSign?
	}={}

	borrowFlowList:any[]//借款列表

	repaymentPlanList:any[]//还款计划列表

	signList:any[]//签章列表

	@ViewChild(GalleryComponent) gallery:GalleryComponent;
	@ViewChild(PreviewerComponent) previewer:PreviewerComponent;
	constructor(
		private router:Router,
		private route:ActivatedRoute,
		private pop:PopService,
		private detail:DetailService
		) {}

	ngOnInit() {
		this.applyDetail()
		this.proveDataList()
		this.getContractList()
		this.getBorrowFlowList()
		this.logList()
	}

	applyDetail(){
		this.detail.applyDetail(this.route.params['value']['data'])
		.then(res=>{
			console.log(res)
			this.handleData(res)
		})
		.catch(res=>{
			this.pop.error({
				title:'错误信息',
				text:res.message
			})
		})
	}

	logList(){
		this.detail.logList(this.route.params['value']['data'])
		.then(res=>{
			console.log(res)
			for(let i=0;i<res.body.records.length;i++){
				if(res.body.records[i].status==2){
					this.auditOneBy=res.body.records[i].createBy
					this.auditOneTime=res.body.records[i].createTime
					this.auditOneRemarks=res.body.records[i].remarks
				}else if(res.body.records[i].status==3){
					this.auditTwoBy=res.body.records[i].createBy
					this.auditTwoTime=res.body.records[i].createTime
					this.auditTwoRemarks=res.body.records[i].remarks
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

	proveDataList(){
		this.detail.proveDataList(this.route.params['value']['data'])
		.then(res=>{
			console.log(res)
			this.renderData(res)
		})
		.catch(res=>{
			this.pop.error({
				title:'错误信息',
				text:res.message
			})
		})
	}

	getContractList(){
		this.detail.contractList(this.route.params['value']['data'])
		.then(res=>{
			console.log(res)
			this.contractList=res.body.records
		})
		.catch(res=>{
			this.pop.error({
				title:'错误信息',
				text:res.message
			})
		})
	}

	getBorrowFlowList(){
		this.loading1=true
		this.detail.getBorrowFlowList(this.route.params['value']['data'])
		.then(res=>{
			console.log(res)
			this.borrowFlowList=res.body.records
			this.fileLoadId=res.body.records[0].fileLoadId?res.body.records[0].fileLoadId:null
			this.loading1=false
		})
		.catch(res=>{
			this.loading1=false
			this.pop.error({
				title:'错误信息',
				text:res.message
			})
		})
	}

	getRepaymentPlan(){
		this.loading2=true
		this.detail.getRepaymentPlan(this.route.params['value']['data'])
		.then(res=>{
			this.repaymentPlanModal=true
			this.loading2=false
			console.log(res)
			this.repaymentPlanList=res.body.records
		})
		.catch(res=>{
			this.loading2=false
			this.pop.error({
				title:'错误信息',
				text:res.message
			})
		})
	}

	getList(data:string){
		this.detail.getList()
		.then(res=>{
			console.log(res)
			for(let i=0;i<res.body.records.length;i++){
				if(res.body.records[i].resourceId==data){
					this.contractData.resourceName=res.body.records[i].resourceName
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

	getSignList(id:string){
		this.loading3=true
		this.detail.getSignList(id)
		.then(res=>{
			this.loading3=false
			console.log(res)
			this.signList=res.body.records
		})
		.catch(res=>{
			this.loading3=false
			this.pop.error({
				title:'错误信息',
				text:res.message
			})
		})
	}

	handleData(res:any){
		this.approveAmount=res.body.approveAmount
		this.createTime=res.body.createTime
		this.borrowApplyId=res.body.borrowApplyId
		this.companyName=res.body.companyName
		this.loanTime=res.body.loanTime
		this.memberId=res.body.memberId
		this.paymentWay=res.body.paymentWay
		this.paymentWayDic=res.body.paymentWayDic
		this.productId=res.body.productId
		this.productName=res.body.productName
		this.rate=res.body.rate
		this.rateType=res.body.rateType
		this.rateTypeDic=res.body.rateTypeDic
		this.ratedCycle=res.body.ratedCycle
		this.status=res.body.status
		this.statusName=res.body.statusName
		this.statusName2=res.body.statusName2
		this.toWhere=res.body.toWhere
	}

	renderData(res:any){
		if (res.body.records) {
			res.body.records.forEach(e=>{
				this.attachment[e.fileType]={
					borrowApplyId:e.borrowApplyId,
					createBy:e.createBy,
					createTime:e.createTime,
					fileLoadId:e.fileLoadId,
					fileType:e.fileType,
					fileTypeName:e.fileTypeName,
					isDelete:e.isDelete,
					isNewRecord:e.isNewRecord,
					isOutserver:e.isOutserver,
					remarks:e.remarks,
					serialId:e.serialId,
					updateBy:e.updateBy,
					updateTime:e.updateTime,
				}
			})
		}
	}

	openModal(data:any){
		this.contractModal=true
		this.contractData=data
		if(this.contractData.eSignatureStatus==2){
			this.contractData.isSign='否'
		}else{
			this.contractData.isSign='是'
		}
		this.getList(data.resourceId)
		this.getSignList(data.contractId)
	}

	back(){
		window.history.back()
	}

	closeModal(){
		this.repaymentPlanModal=false
		this.contractModal=false
	}
}