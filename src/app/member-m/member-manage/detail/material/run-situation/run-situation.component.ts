import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router'
import { RunSituationService,SendData } from './run-situation.service'
import { PopService } from 'dolphinng'
import { Uploader } from '../../../../../../utils/uploader/Uploader'
import { API } from '../../../../../../services/config/app.config'
import { GalleryComponent} from 'dolphinng';
import { AuthRoleService } from '../../../../../../services/authRole/authRole.service';

import { PreviewerComponent } from '../../../../../../utils/previewer/previewer.component'
import {img,file } from "../../../../../../utils/previewer/filetype"
@Component({
	moduleId: module.id,
	selector: 'run-situation',
	templateUrl: './run-situation.component.html',
	styleUrls:['./run-situation.component.less'],
	providers:[RunSituationService]
})
export class RunSituationComponent implements OnInit {
	userName:string
	memberId:number
	part:boolean=false

	patternList:any[]
	mainTradingList:any[]  //主要交易方式
	payStatusList:any[]
	insuranceList:any[]    //购买保险情况
	infoLevelList:any[]			//信息化程度

	uploader1:Uploader=new Uploader()
	uploader2:Uploader=new Uploader()
	uploader3:Uploader=new Uploader()
	uploader4:Uploader=new Uploader()
	uploader5:Uploader=new Uploader()
	uploader6:Uploader=new Uploader()
	uploader7:Uploader=new Uploader()
	uploader8:Uploader=new Uploader()

	operateAreaPart

	operatePattern
	operatePatternDic//	经营模式：			
	employeeNum//企业员工数量
	turnover//年营业额						
	operatingArea//营业面积
	mcacctmonthlyWate//	主要结算账户月均流水			
	mainacctdailyFlow//主要留存账户日均流水
	upcooperClosing//与上游主要的结算周期					
	upcoopertime//与上游合作最长时间
	mainTrading
	mainTradingDic//	主要交易方式				
	operateArea//业务区域
	operateArea2
	salaryPayStatus
	salaryPayStatusDic//工资支出情况	
	insurance		    
	insuranceDic//购买保险情况
	infoLevel//信息化程度
	infoLevelDic//信息化程度
	serviceMan//服务经理

	attachment:object={}

	//用来触发提交时的遮罩
	submitting:boolean=false

	@ViewChild(GalleryComponent) gallery:GalleryComponent;
	@ViewChild(PreviewerComponent) previewer:PreviewerComponent;


	constructor(
			private router:Router,
			private route:ActivatedRoute,
			private runS:RunSituationService,
			private pop:PopService,
			private auth:AuthRoleService
		) {}

	ngOnInit() {
		this.memberId=this.route.params['value']['id']
		console.log(this.route.queryParams['value']['hash'])

		this.userName=this.auth.userName
		//获取详情数据
		this.getDetailData()

		this.getPatternList()

		this.getMainTradingList()//主要交易方式

		this.getPayStatusList()//工资支出情况

		this.getInsuranceList()//购买保险情况

		this.getInfoLevelList()//信息化程度



		this.uploaderFun('0202','uploader1')//道路运输许可证	 0202
	    this.uploaderFun('0203','uploader2')//运输合作合同		 0203
	    this.uploaderFun('0302','uploader3')//租赁合同			 0302
	    this.uploaderFun('0205','uploader4')//行驶证			 0205
	    this.uploaderFun('0206','uploader5')//营运车辆挂靠协议	 0206
	    this.uploaderFun('0404','uploader6')//货物保险			 0404
	    this.uploaderFun('0405','uploader7')//自有车辆保险		 0405
	    this.uploaderFun('0204','uploader8')//营运车辆激动车登记证 0204
	}


	//两个跳转
	riskM(){
		this.router.navigate(['memberM/memberManage/detail',this.memberId,'riskM'])
	}
	companyInfo(){
		this.router.navigate(['memberM/memberManage/detail',this.memberId,'companyInfo'])
	}

	//获取详情数据
	getDetailData(){
		this.runS.getDetailData(this.memberId)
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
	//渲染页面
	renderData(res){
		console.log(res)
		this.operatePattern=res.body.operatePattern//	经营模式：			
		this.operatePatternDic=res.body.operatePatternDic//	经营模式：			
		this.employeeNum=res.body.employeeNum//企业员工数量
		this.turnover=res.body.turnover/10000//年营业额						
		this.operatingArea=res.body.operatingArea//营业面积
		this.mcacctmonthlyWate=res.body.mcacctmonthlyWate/10000//	主要结算账户月均流水			
		this.mainacctdailyFlow=res.body.mainacctdailyFlow/10000//主要留存账户日均流水
		this.upcooperClosing=res.body.upcooperClosing//与上游主要的结算周期					
		this.upcoopertime=res.body.upcoopertime//与上游合作最长时间
		this.mainTrading=res.body.mainTrading+''
		this.mainTradingDic=res.body.mainTradingDic//	主要交易方式				
		this.operateArea=res.body.operateArea//业务区域
		this.operateArea2=res.body.operateArea2//业务区域
		this.salaryPayStatus=res.body.salaryPayStatus+''
		this.salaryPayStatusDic=res.body.salaryPayStatusDic//工资支出情况			    
		this.insurance=res.body.insurance+''//购买保险情况
		this.insuranceDic=res.body.insuranceDic//购买保险情况
		this.infoLevel=res.body.infoLevel+''//信息化程度
		this.infoLevelDic=res.body.infoLevelDic//信息化程度
		this.serviceMan=res.body.serviceMan

		if (this.operateArea2=="全国") {
			this.operateArea=null
		}
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

		
		
		console.log(this.attachment)
			// 道路运输许可证		0202
			// 运输合作合同		0203
			// 租赁合同			0302
			// 行驶证				0205
			// 营运车辆挂靠协议	0206
			// 货物保险			0404
			// 自有车辆保险		0405
			// 营运车辆激动车登记证0204

	}

	uploaderFun(type,upName){
		//uploader1_7
		this[upName].url=API.fileServer+'upload';
	    this[upName].isCompress=true;
	    this[upName].onSelect((files)=>{//文件选择完毕
	      console.log(files);
	    });
	    this[upName].onQueue((uploadFile)=>{//文件加入队列
	    	this[upName].queue=[uploadFile];
	    	if (this.attachment[type]) {
	      		uploadFile.addSubmitData('fileId',this.attachment[type].fileLoadId);  //发送此字段删除该指定ID的文件
	    	}
	    	if (uploadFile.file.name.length>45) {
	    		this.pop.info({
	    			title:"提示信息",
	    			text:"文件名过长"
	    		})
	    		this[upName].queue=[]
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
	      			setTimeout(()=>{
	      				this[upName].queue[0].setSuccess()
				      	this.attachment[type]={
				      		attachId:null,
				      		attachName:uploader.queue[0].fileName,
				      		fileType:type,
				      		fileLoadId:data.body.fileId,
			      			extension:uploader.queue[0].fileExtension

				      	}
				      	console.log(this.attachment)
	      			},1000)

			      	
			      	
			     }
	    	}
	    	
	    });
	}

	//编辑情况下所需要的各个字典值列表

	getPatternList(){
		this.runS.getDictionaryData('ms_operate_pattern')
			.then(res=>{
				console.log(res)
				this.patternList=res.body.records
			})
			.catch(res=>{
				this.pop.error({
					title:'错误信息',
					text:res.message
				})
			})
	}
	
	getMainTradingList(){//主要交易方式
		this.runS.getDictionaryData('ms_main_trading')
			.then(res=>{
				console.log(res)
				this.mainTradingList=res.body.records
			})
			.catch(res=>{
				this.pop.error({
					title:'错误信息',
					text:res.message
				})
			})
	}  

	getPayStatusList(){//工资支出情况
		this.runS.getDictionaryData('ms_salary_pay_status')
			.then(res=>{
				console.log(res)
				this.payStatusList=res.body.records
			})
			.catch(res=>{
				this.pop.error({
					title:'错误信息',
					text:res.message
				})
			})
	}

	getInsuranceList(){//购买保险情况
		this.runS.getDictionaryData('ms_insurance')
			.then(res=>{
				console.log(res)
				this.insuranceList=res.body.records
			})
			.catch(res=>{
				this.pop.error({
					title:'错误信息',
					text:res.message
				})
			})
	}    
	getInfoLevelList(){//信息化程度
		this.runS.getDictionaryData('ms_info_level')
			.then(res=>{
				console.log(res)
				this.infoLevelList=res.body.records
			})
			.catch(res=>{
				this.pop.error({
					title:'错误信息',
					text:res.message
				})
			})
	}			


	//2017.11.13
	//附件部分大改
	//show方法，获取文件信息方法，下载方法--start
	show(e,type){
		console.log(type)
		console.log(this.attachment[type])
		console.log(!this.attachment[type])
		if (!!this.attachment[type]) {
			let url:any=this.runS.getFileUrl(this.attachment[type].fileLoadId)
			let extension=this.attachment[type].extension
			let event=e

			// this.gallery.open(e,url);
			//这里判断上传文件的类型
			//分为可以预览的和不可以预览的，不可以预览的需要下载
			console.log("show 方法中的文件后缀",extension)

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
		}/*else{
			this.pop.error({
				title:'错误提示',
				text:'无此文件！'
			})
		}*/
	}

	tranferFileType(fileType,type){
		this.attachment[type].extension=fileType
		console.log(fileType)
	}

	download(type){
		if (!!this.attachment[type]) {
			let url=this.runS.downLoadFile(this.attachment[type].fileLoadId)
			// window.open(url)
			window.location.href =url
			
		}else{
			this.pop.info({
				title:"提示信息",
				text:"下载失败"
			})
		}
	}

	//--end

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

	save(){
		this.submitting=true

		if (this.operateArea2=="全国") {
			this.operateArea=null
		}
		let data:SendData={
			memberId:this.memberId,
			operatePattern:this.operatePattern,//	经营模式：// operatePatternDic			
			employeeNum:this.employeeNum,//企业员工数量
			turnover:this.turnover*10000,//年营业额						
			operatingArea:this.operatingArea,//营业面积
			mcacctmonthlyWate:this.mcacctmonthlyWate*10000,//	主要结算账户月均流水			
			mainacctdailyFlow:this.mainacctdailyFlow*10000,//主要留存账户日均流水
			upcooperClosing:this.upcooperClosing,//与上游主要的结算周期					
			upcoopertime:this.upcoopertime,//与上游合作最长时间
			mainTrading:this.mainTrading=='null'?'':this.mainTrading,//	主要交易方式// mainTradingDic
			operateArea:this.operateArea,//业务区域
			operateArea2:this.operateArea2,
			salaryPayStatus:this.salaryPayStatus=='null'?'':this.salaryPayStatus,//工资支出情况// salaryPayStatusDic	
			insurance:this.insurance=='null'?'':this.insurance,//购买保险情况// insuranceDic
			infoLevel:this.infoLevel=='null'?'':this.infoLevel,//信息化程度// infoLevelDic
			attachList:this.handleAttachData(),
		}

		this.runS.saveData(data)
			.then(res=>{
				console.log(res)
				this.pop.info({
					title:'提示信息',
					text:'保存成功'
				})
				this.submitting=false

				this.cancel('part')

			})
			.catch(res=>{
				this.pop.error({
					title:'错误信息',
					text:res.message
				})
				this.submitting=false
				
			})
	}

	deleteFile(id,up){
		this.runS.deleteFile(this.memberId,this.attachment[id].attachId,this.attachment[id].fileLoadId).then(res=>{
			console.log(res)
			delete this.attachment[id]
			this[up].queue=[]
		})
	}


	back(){
		this.router.navigate(["memberM/memberManage/detail",this.memberId])
	}

}