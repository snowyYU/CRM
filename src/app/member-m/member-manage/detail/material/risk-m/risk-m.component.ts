import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router'
import { RiskMService,Part1Data,Part2Data,Part3Data } from './risk-m.service'
import { PopService } from 'dolphinng'
import { Uploader } from '../../../../../../utils/uploader/Uploader'
import { API } from '../../../../../../services/config/app.config'
import { GalleryComponent} from 'dolphinng';
import { AuthRoleService } from '../../../../../../services/authRole/authRole.service';

@Component({
	moduleId: module.id,
	selector: 'risk-m',
	templateUrl: './risk-m.component.html',
	styleUrls:['./risk-m.component.less'],
	providers:[RiskMService]
})
export class RiskMComponent implements OnInit {
	userName:string
	attachment:object={}
	memberId:number
	part1:boolean=false
	part1S:boolean=true
	part2:boolean=false
	part2S:boolean=true
	part3:boolean=false
	part3S:boolean=true

	companyAsset:{
		addAttachList?
		attachList?
		buyCarYear?
		carNum?
		carValue?
		createBy?
		createTime?
		debtReceivableLimit?
		debtReceivableValue?
		deleteAttachList?
		houseNum?
		houseValue?
		isDelete?
		isNewRecord?
		memberId?
		nativeRenting?
		remarks?
		token?
		updateBy?
		updateTime?
	}={}
	companyDebt:{
		accountspayable?
		createBy?
		createTime?
		creditDebtSituation?
		houseMortgageLoanamt?
		isDelete?
		isNewRecord?
		memberId?
		mortgageLoanamtRate?
		remarks?
		repayLoanamtPermonth?
		token?
		updateBy?
		updateTime?
	}={}
	companyCredit:{
		addAttachList?
		attachList?
		createBy?
		createTime?
		deleteAttachList?
		housemortgageloanOverdueNum?
		inquiriesnumWithinthreemonth?
		inquiriesnumWithintwoyear?
		isDelete?
		isNewRecord?
		maxamtofoverdueCreditcard?
		maxamtofoverdueLoan?
		memberId?
		memberRatingGrate?
		overdueDay?
		overdueNum?
		remarks?
		token?
		updateBy?
		updateTime?
	}={}
	member:{
		appId?
		appMemberId?
		appMemberName?
		company?
		companyBankCard?
		companyLegal?
		companyName?
		companyborrower?
		createBy?
		createTime?
		creditFacility?
		eaccount?
		eaccountDic?
		employeeId?
		isDelete?
		isManager?
		isNewRecord?
		memberId?
		memberPwd?
		memberRating?
		memberRatingGrate?
		memberStatus?
		memberStatusDic?
		memberType?
		memberTypeDic?
		prmResourceRegister?
		remarks?
		reportsVo?
		searchkey?
		serverTime?
		serviceMan?
		signatureUserStatus?
		signatureUserStatusDit?
		token?
		updateBy?
		updateTime?
		userSeal1Base64?
		userSeal2Base64?
	}={}

	nativeRentingList:any[]

	uploader1:Uploader=new Uploader()
	uploader2:Uploader=new Uploader()


	@ViewChild(GalleryComponent) gallery:GalleryComponent;


	constructor(
			private router:Router,
			private route:ActivatedRoute,
			private riskM:RiskMService,
			private pop:PopService,
			private auth:AuthRoleService
		) {}

	ngOnInit() {
		this.memberId=this.route.params['value']['id']
		console.log(this.route.queryParams['value']['hash'])
		
		this.userName=this.auth.userName
		this.getDetailData()
		this.getNativeRenting()

		this.uploaderFun('0301','uploader1')//房产证明	 0301
	    this.uploaderFun('0111','uploader2')//人行版征信报告		 0111
		
	}



	//两个跳转
	runSituation(){
		this.router.navigate(['memberM/memberManage/detail',this.memberId,'runSituation'])
	}
	
	companyInfo(){
		this.router.navigate(['memberM/memberManage/detail',this.memberId,'companyInfo'])
	}

	//获取详情数据
	getDetailData(){
		this.riskM.getDetailData(this.memberId)
			.then(res=>{
				this.renderData(res)
			})
			.catch(res=>{
				this.pop.error({
					title:'错误信息',
					text:res.message
				})
			})
	}

	renderData(res){
		this.companyAsset=res.body.companyAsset
		this.companyDebt=res.body.companyDebt
		this.companyCredit=res.body.companyCredit
		this.member=res.body.member

		this.companyAsset.carValue=res.body.companyAsset.carValue/10000
		this.companyAsset.houseValue=res.body.companyAsset.houseValue/10000
		this.companyAsset.debtReceivableValue=res.body.companyAsset.debtReceivableValue/10000
		this.companyAsset.debtReceivableLimit=res.body.companyAsset.debtReceivableLimit/10000
		this.companyDebt.creditDebtSituation=res.body.companyDebt.creditDebtSituation/10000
		this.companyDebt.houseMortgageLoanamt=res.body.companyDebt.houseMortgageLoanamt/10000
		this.companyDebt.repayLoanamtPermonth=res.body.companyDebt.repayLoanamtPermonth/10000
		this.companyDebt.accountspayable=res.body.companyDebt.accountspayable/10000
		this.companyCredit.maxamtofoverdueCreditcard=res.body.companyCredit.maxamtofoverdueCreditcard/10000
		this.companyCredit.maxamtofoverdueLoan=res.body.companyCredit.maxamtofoverdueLoan/10000
		//资产信息（P_ms_company_asset）
		//companyAsset.buyCarYear	//	家用轿车购买年份			
		//companyAsset.carValue  //轿车价值
		//companyAsset.carNum	//自有运营车辆数量					
		//companyAsset.nativeRenting  //本地租房状况
		//companyAsset.houseNum	//自有房产套数				
		//companyAsset.houseValue  //住房价值
		//companyAsset.debtReceivableValue	//应收账款价值	
		//companyAsset.debtReceivableLimit  //应付账款额度
		 
			
	
	//负债信息（P_ms_company_debt）
		//companyDebt.creditDebtSituation  //征信负债状况			
		//companyDebt.houseMortgageLoanamt  //住房按揭贷款金额
		//companyDebt.mortgageLoanamtRate  //低压贷占总贷款比例			
		//companyDebt.repayLoanamtPermonth  //申请人每月偿还的贷款额
		//companyDebt.accountspayable  //应付账款			
	
	//履约信息（P_ms_company_credit）
		//companyCredit.maxamtofoverdueCreditcard  //信用卡最大逾期金额	
		//companyCredit.maxamtofoverdueLoan			贷款最大逾期金额			
		//companyCredit.overdueNum  //信用卡|贷款逾期次数	
		//companyCredit.overdueDay	信用卡|贷款最大逾期天数
		//companyCredit.inquiriesnumWithintwoyear   两年内征信被查询次数 									
		//companyCredit.housemortgageloanOverdueNum  //租房按揭贷款逾期次数 		 			
		//companyCredit.inquiriesnumWithinthreemonth  //3个月内征信被查询次数
		//member.memberRatingGrate  征信评级
	
		//把附件的数据封装成key-value
		if (res.body.companyAttachVos) {
			res.body.companyAttachVos.forEach(e=>{
				this.attachment[e.fileType]={
					attachId:e.attachId,
					attachName:e.attachName,
					createBy:e.createBy,
					createTime:e.createTime,
					fileLoadId:e.fileLoadId,
					fileType:e.fileType,
					fileTypeDic:e.fileTypeDic,
					isDelete:e.isDelete,
					isNewRecord:e.isNewRecord,
					memberId:e.memberId,
					remarks:e.remarks,
					token:e.token,
					updateBy:e.updateBy,
					updateTime:e.updateTime,
				}
			})
		}


	}


	uploaderFun(type,upName){
		//uploader1_7
		this[upName].url=API.fileServer+'/fileserver/file/upload';
	    this[upName].isCompress=true;
	    this[upName].onSelect((files)=>{//文件选择完毕
	      console.log(files);
	    });
	    this[upName].onQueue((uploadFile)=>{//文件加入队列
	    	this[upName].queue=[uploadFile];
	    	if (this.attachment[type]) {
	      		uploadFile.addSubmitData('fileId',this.attachment[type].fileLoadId);  //发送此字段删除该指定ID的文件
	    	}
	      uploadFile.addSubmitData('businessType',type);
	      uploadFile.addSubmitData('fileName',uploadFile.fileName);
	      uploadFile.addSubmitData('fileType',uploadFile.fileExtension);
	      uploadFile.addSubmitData('fileSize',uploadFile.fileSize);
	      uploadFile.addSubmitData('fileContent',uploadFile.getFile());
	    });
	    this[upName].onQueueAll((uploadFiles)=>{//文件全部加入队列
	      this[upName].upload()

	    });
	    this[upName].onSuccess((uploadFile,uploader,index)=>{//上传请求成功

	    });
	    this[upName].onComplete((uploader:Uploader)=>{//完成上传
	    	if (!uploader.queue[0].error) {
	    		let data=JSON.parse(uploader.queue[0].response)
	    		this[upName].customData.data=data
	      		if (data.status==200) {
			      	this[upName].queue[0].setSuccess()
			      	this.attachment[type]={
			      		attachId:'',
			      		attachName:uploader.queue[0].fileName,
			      		fileType:type,
			      		fileLoadId:data.body.fileId
			      	}
			      	console.log(this.attachment)
			      	
			     }
	    	}
	    	
	    });
	}

	getNativeRenting(){
		this.riskM.getDictionaryData("native_renting")
			.then(res=>{
				this.nativeRentingList=res.body.records
			})
			.catch(res=>{
				this.pop.error({
					title:'错误信息',
					text:res.message
				})
			})
	}


	show(e,type){
		console.log(type)
		console.log(this.attachment[type])
		console.log(!this.attachment[type])
		if (!!this.attachment[type]) {
			let url:any=this.riskM.getFileUrl(this.attachment[type].fileLoadId)
			this.gallery.open(e,url)
			
		}/*else{
			this.pop.error({
				title:'错误提示',
				text:'无此文件！'
			})
		}*/
	}

	edit(part){
		this[part]=!this[part]
	}

	cancel(part){
		this[part]=!this[part]
		//从编辑返回详情时刷新页面
		this.getDetailData()

	}

	handleAttachData(){
		let list=[]
		let listK=Object.keys(this.attachment)
		listK.forEach(e=>{
			list.push(this.attachment[e])
		})
		return JSON.stringify(list)
	}

	back(){
		this.router.navigate(["memberM/memberManage/detail",this.memberId])
	}



	

	save1(){
		let data:Part1Data={
			memberId:this.memberId,	//会员ID：
			buyCarYear:this.companyAsset.buyCarYear,    //家用轿车购买年份					
			carValue:this.companyAsset.carValue*10000,    //轿车价值
			carNum:this.companyAsset.carNum,    //自有运营车辆数量						
			nativeRenting:this.companyAsset.nativeRenting,    //本地租房状况(字典)	
			houseNum:this.companyAsset.houseNum,    //自有房产套数					
			houseValue:this.companyAsset.houseValue*10000,    //住房价值
			debtReceivableValue:this.companyAsset.debtReceivableValue*10000,    //应收账款价值		    
			debtReceivableLimit:this.companyAsset.debtReceivableLimit*10000,    //应付账款额度
			attachList:this.handleAttachData(),
		}
		this.riskM.save1(data)
			.then(res=>{
				console.log(res)
				this.pop.info({
					title:'提示信息',
					text:'保存成功'
				})
				this.cancel('part1')
			})
			.catch(res=>{
				this.pop.error({
					title:'错误信息',
					text:res.message
				})
			})
	}

	save2(){
		let data:Part2Data={
			memberId:this.memberId,		//会员ID：
			creditDebtSituation:this.companyDebt.creditDebtSituation*10000,		//征信负债状况			
			houseMortgageLoanamt:this.companyDebt.houseMortgageLoanamt*10000,		//住房按揭贷款金额
			mortgageLoanamtRate:this.companyDebt.mortgageLoanamtRate,		//低压贷占总贷款比例			
			repayLoanamtPermonth:this.companyDebt.repayLoanamtPermonth*10000,		//申请人每月偿还的贷款额
			accountspayable:this.companyDebt.accountspayable*10000,		//应付账款	
		}

		this.riskM.save2(data)
			.then(res=>{
				console.log(res)
				this.pop.info({
					title:'提示信息',
					text:'保存成功'
				})
				this.cancel('part2')
			})
			.catch(res=>{
				this.pop.error({
					title:'错误信息',
					text:res.message
				})
			})


	}

	save3(){
		let data:Part3Data={
			memberId:this.memberId,		//会员ID：
			maxamtofoverdueCreditcard:this.companyCredit.maxamtofoverdueCreditcard*10000,  //信用卡最大逾期金额			
			maxamtofoverdueLoan:this.companyCredit.maxamtofoverdueLoan*10000,  //贷款最大逾期金额
			overdueNum:this.companyCredit.overdueNum,  //信用卡、贷款逾期次数							
			overdueDay:this.companyCredit.overdueDay,  //信用卡、贷款最大逾期天数
			housemortgageloanOverdueNum:this.companyCredit.housemortgageloanOverdueNum,  //租房按揭贷款逾期次数 		
			inquiriesnumWithintwoyear:this.companyCredit.inquiriesnumWithintwoyear,  //两年内征信被查询次数
			inquiriesnumWithinthreemonth:this.companyCredit.inquiriesnumWithinthreemonth,  //3个月内征信被查询次数		
			memberRatingGrate:this.companyCredit.memberRatingGrate,  //征信评级：
			attachList:this.handleAttachData(),

		}

		this.riskM.save3(data)
			.then(res=>{
				console.log(res)
				this.pop.info({
					title:'提示信息',
					text:'保存成功'
				})
				this.cancel('part3')
			})
			.catch(res=>{
				this.pop.error({
					title:'错误信息',
					text:res.message
				})
			})


	}





}