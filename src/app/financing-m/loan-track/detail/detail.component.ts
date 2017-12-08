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
	
	loading:boolean=false     //是否获取到数据
	repaymentPlanModal:boolean  //还款计划模态框
	modalSize:string='lg'  //模态框大小
	modalListLoading:boolean  //等待模态框价值

	applyAmount
	applyVos
	beginTime
	cardNo
	contracts
	createBy
	createTime
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
	toWhere
	toWhereDic
	updateBy
	updateTime
	waybills

	approveAmount
	borrowApplyId
	companyName
	loanTime
	memberId
	paymentWay
	paymentWayDic
	productId
	productName
	rate
	rateType
	rateTypeDic
	ratedCycle
	status
	statusName
	statusName2

	auditOneBy
	auditOneTime
	auditOneRemarks
	auditTwoBy
	auditTwoTime
	auditTwoRemarks

	repaymentPlanList:{
		borrowApplyId?
		currentPeriod?
		errorAmount?
		isNewRecord?
		isRollover?
		overTime?
		overdueInterest?
		repaymentAmount?
		repaymentCapital?
		repaymentDate?
		repaymentInterest?
		repaymentRelDate?
		rolloverDeposit?
		rolloverInterest?
		status?
		statusName?
		statusName2?
		totalPeriod?
		totalRelAmount?
	}[]=[]

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
		this.contractList()
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

	contractList(){
		this.detail.contractList(this.route.params['value']['data'])
		.then(res=>{
			console.log(res)
			
		})
		.catch(res=>{
			this.pop.error({
				title:'错误信息',
				text:res.message
			})
		})
	}

	getBorrowFlowList(){
		this.detail.getBorrowFlowList(this.route.params['value']['data'])
		.then(res=>{
			console.log(res)
			// this.dataList=res.body.records[0]
		})
		.catch(res=>{
			this.pop.error({
				title:'错误信息',
				text:res.message
			})
		})
	}

	getRepaymentPlan(){
		this.detail.getRepaymentPlan(this.route.params['value']['data'])
		.then(res=>{
			this.repaymentPlanModal=true
			this.loading=true
			console.log(res)
			this.repaymentPlanList=res.body.records
		})
		.catch(res=>{
			this.loading=false
			this.pop.error({
				title:'错误信息',
				text:res.message
			})
		})
	}

	handleData(res:any){
		this.approveAmount=res.body.approveAmount
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

	tranferFileType(fileType,type){
		this.attachment[type].extension=fileType
		console.log(fileType)
	}


	show(e,type){
		console.log(type)
		console.log(this.attachment[type])
		console.log(!this.attachment[type])
		if (!!this.attachment[type]) {
			let url:any=this.detail.getFileUrl(this.attachment[type].fileLoadId)
			let extension=this.attachment[type].extension
			let event=e

			// this.gallery.open(e,url);
			//这里判断上传文件的类型
			//分为可以预览的和不可以预览的，不可以预览的需要下载
			console.log(extension)
			if(img.indexOf(extension)>=0||file.indexOf(extension)>=0){
				if (img.indexOf(extension)>=0) {
					this.previewer.open(event,url,"img")
					
				}else if (file.indexOf(extension)>=0) {
					this.previewer.open(event,url,"file")
					
				}
			}else{
				this.pop.confirm({
					title:"提示框",
					text:"此文件不支持预览，是否下载查看？"
				}).onConfirm(()=>{
					this.download(type)
				})
			}
		}
	}

	download(type){
		if (!!this.attachment[type]) {
			let url=this.detail.downLoadFile(this.attachment[type].fileLoadId)
			window.location.href=url
		}
	}

	back(){
		window.history.back()
	}

	closeModal(){
		this.repaymentPlanModal=false
	}
}