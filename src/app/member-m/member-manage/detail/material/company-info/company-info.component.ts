import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router'
import { PopService } from 'dolphinng'
import { BankCardSubmitData,Part1Data,Part2Data,Part3Data,Part4Data,CompanyInfoService } from './company-info.service'
import { Uploader } from '../../../../../../utils/uploader/Uploader'
import { API } from '../../../../../../services/config/app.config'
import { GalleryComponent} from 'dolphinng';
import { AuthRoleService } from '../../../../../../services/authRole/authRole.service'

import { PreviewerComponent } from '../../../../../../utils/previewer/previewer.component'
import {img,file } from "../../../../../../utils/previewer/filetype"

declare let $:any
@Component({
	moduleId: module.id,
	selector: 'compony-info',
	templateUrl: './company-info.component.html',
	styleUrls:['./company-info.component.less'],
	providers:[CompanyInfoService]
})
export class CompanyInfoComponent implements OnInit {

	originalArray:number[]=[]


	//控制各个区域编辑和查看状态的切换
	part1:boolean=false;
	part1S:boolean=true;
	part2:boolean=false;
	part2S:boolean=true;

	part2List:any[]=[
			{name:'uploader2_1',type:'0102'},
			{name:'uploader2_2',type:'0103'},
			{name:'uploader2_3',type:'0113'},
			{name:'uploader2_4',type:'0201'},
			{name:'uploader2_5',type:'0101'},
			]
	part3:boolean=false;
	part3S:boolean=true;

	part4:boolean=false;
	part4S:boolean=true;

	part4_1:boolean=false
	part4_2:boolean=false

	//
	uploader1_1:Uploader=new Uploader()
	uploader1_2:Uploader=new Uploader()
	uploader1_3:Uploader=new Uploader()
	uploader1_4:Uploader=new Uploader()
	uploader1_5:Uploader=new Uploader()
	uploader1_6:Uploader=new Uploader()
	uploader1_7:Uploader=new Uploader()
	uploader1_8:Uploader=new Uploader()
	uploader2_1:Uploader=new Uploader()
	uploader2_2:Uploader=new Uploader()
	uploader2_3:Uploader=new Uploader()
	uploader2_4:Uploader=new Uploader()
	uploader2_5:Uploader=new Uploader()
	uploader3_1:Uploader=new Uploader()
	uploader3_2:Uploader=new Uploader()
	uploader3_3:Uploader=new Uploader()
	uploader3_4:Uploader=new Uploader()



	//这个为婚姻状况的值
	borrwerMarry:string
	marryList
	//公司类型列表
	companyTypeList:any[]

	//账户类型列表
	accTypeList=[]

	attachment={}
	memberId:number

	//这几个属性为选择城市地区所设置
	province
	provinceList
	city
	cityList
	detailAddress

	companyborrowerVo:{

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
	//借款人信息：
		//姓名：		companyborrowerVo.borrwerPerson				身份证号码 	companyborrowerVo.borrwerIdcard
		//最高学历: 	companyborrowerVo.borrwerDegree   			联系手机	companyborrowerVo.borrwerMobile
		// 婚姻状况：	companyborrowerVo.borrwerMarry

	companyAttachVos:any[]
		// 相关证照：	companyAttachVos[].attachId
		// 			companyAttachVos[].fileLoadId
		// 			查看接口(文件服务器接口-待定)
		// 			申请人身份证（正面）0104
		// 			申请人身份证（反面）0105
		// 			户口本				0110
		// 			申请人与经营场所合照	0112
		// 			结婚证（正面）		0108
		// 			结婚证（反面）		0109
		// 			配偶身份证（正面）	0106
		// 			配偶身份证（反面）	0107
	companyVo:{

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
	memberVo:{
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
		token?
		updateBy?
		updateTime?
	}={}
	// 公司信息：companyVo
	// 	公司名称：	memberVo.companyName				公司类型 companyVo.companyTypeName
	// 	注册资金	companyVo.registerCapital			注册时间 companyVo.foundTime
 	// 	联系人		companyVo.linkName					联系手机 companyVo.linkMobile
	// 	营业执照号	companyVo.licenceNum				企业地址 companyVo.companyAddress
	// 	相关证件照：
	// 				查看接口(文件服务器接口-待定)
	// 				公司章程0102
	// 				验资报告0103
	// 				公司门面照0113
	// 				职业资格证书(财务)0201
	// 				四证合一0101
	companyLegalVo:{

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
	// 法人基本情况:companyLegalVo
	// 	法人姓名 companyLegalVo.legalPerson	 			法人身份证：	companyLegalVo.legalIdcard
	// 	最高学历 companyLegalVo.legalDegree					婚姻状况	companyLegalVo.legalMarry
	// 	联系手机 companyLegalVo.legalMobile
	//这个为原始数据
	companyBankCardVos:any[]
	//这个用来存放处理后的数据
	companyBankCardDatas:BankCardInfo[]=[]
	// 银行信息：companyBankCardVos[]
	// 	账户类型 companyBankCardVos[].typeDic		银行账号	companyBankCardVos[].cardNo
	// 	银行名称 companyBankCardVos[].bankName		支行名称	companyBankCardVos[].subbankName
	// 	认证状态 companyBankCardVos[].authStatusDic		默认		companyBankCardVos[].isDefaultDic


	// 	相关证件照：
	// 		companyAttachVos[].attachId
	// 		companyAttachVos[].fileLoadId
	// 		查看接口(文件服务器接口-待定)
	// 		开户证明	0501
	// 		银行卡		0502
	// 		对私网银流水	0504
	// 		对公网银流水	0504

	//用来触发提交时的遮罩
	submitting:boolean=false

	@ViewChild(GalleryComponent) gallery:GalleryComponent;
	@ViewChild(PreviewerComponent) previewer:PreviewerComponent;


	constructor(
		private route:ActivatedRoute,
		private router:Router,
		private pop:PopService,
		private companyInfo:CompanyInfoService,
		public authRole:AuthRoleService




		) {}

	ngOnInit() {

		// window.location.hash=this.route.queryParams['value']['hash']

		//给原数组originalArray赋值 
		for (let i=0;i<300;i++){ 
		this.originalArray[i]=i+1; 
		} 

		this.memberId=this.route.params['value']['id']
		console.log(this.route.queryParams['value']['hash'])
		this.getDetailData()

		//获取婚姻状况字典值
		this.getMarryData()

		this.getCompanyList()

		//选择省的列表
		this.provinceSelect()

		//获取账户类型列表
		this.getAccTypeList()


	    this.uploaderFun('0104','uploader1_1')//申请人身份证（正面）0104
	    this.uploaderFun('0105','uploader1_2')//申请人身份证（反面）0105
	    this.uploaderFun('0110','uploader1_3')//户口本				0110
	    this.uploaderFun('0112','uploader1_4')//申请人与经营场所合照	0112
	    this.uploaderFun('0108','uploader1_5')//结婚证（正面）		0108
	    this.uploaderFun('0109','uploader1_6')//结婚证（反面）		0109
	    this.uploaderFun('0106','uploader1_7')//配偶身份证（正面）	0106
	    this.uploaderFun('0107','uploader1_8')//配偶身份证（反面）	0107
	    this.uploaderFun('0102','uploader2_1')	//公司章程0102
	    this.uploaderFun('0103','uploader2_2')	//验资报告0103
	    this.uploaderFun('0113','uploader2_3')	//公司门面照0113
	    this.uploaderFun('0201','uploader2_4')	//职业资格证书(财务)0201
	    this.uploaderFun('0101','uploader2_5')	//四证合一0101
	    this.uploaderFun('0501','uploader3_1')//开户证明	0501
	    this.uploaderFun('0502','uploader3_2')//银行卡		0502
	    this.uploaderFun('0504','uploader3_3')//网银流水	0504





	}

	ngAfterViewInit(){
		if (this.route.queryParams['value']['hash']) {
			document.querySelector('#' + this.route.queryParams['value']['hash']).scrollIntoView();
			
		}

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
			     }else{
			     	this.pop.info({
			     		title:"提示信息",
			     		text:data.message
			     	})
			     	//清空上传队列
			     	uploader.queue=[]
			     	delete this.attachment[type]
			     	console.log(this.attachment)
			     }


	    	}

	    });
	}

	getMarryData(){
		this.companyInfo.getMarrySelect()
			.then(res=>{

				this.marryList=res.body.records
				console.log(this.marryList)
			})
			.catch(res=>{
				this.pop.error({
					title:'错误提示',
					text:res.message
				})
			})
	}

	getCompanyList(){
		this.companyInfo.getCompanyType()
			.then(res=>{

				this.companyTypeList=res.body.records
			})
			.catch(res=>{
				this.pop.error({
					title:'错误提示',
					text:res.message
				})
			})
	}

	//获取地址下拉列表
	//省
	provinceSelect(){
		this.companyInfo.getAddress({
			parentCode:0,
			level:1
		})
		.then(res=>{
			this.provinceList=res.body.records
		})
		.catch(res=>{
			this.pop.error({
				title:'错误提示',
				text:res.message
			})
		})
	}

	getCityList(v){
		console.log(v);
		//获取省code
		this.companyInfo.getAddress({
			parentCode:0,
			level:1,
			name:v
		}).then(res=>{
			return Promise.resolve(res.body.records[0].code)
		}).then(res=>{
			this.companyInfo.getAddress({
				parentCode:res,
				level:2
			}).then(res=>{
				console.log(res);
				this.cityList=res.body.records
			}).catch(res=>{
				this.pop.error({
					title:'错误提示',
					text:res.message
				})
			})
		})
	}

	getAccTypeList(){
		this.companyInfo.getAccTypeList()
			.then(res=>{

				this.accTypeList=res.body.records
			})
			.catch(res=>{
				this.pop.error({
					title:'错误提示',
					text:res.message
				})
			})
	}

	getDetailData(){
		this.companyInfo.getDetailData(this.memberId)
			.then(res=>{
				this.renderData(res)
			})
			.catch(res=>{
				this.pop.error({
					title:'错误提示',
					text:res.message
				})
			})
	}

	renderData(data){
		console.log(data)
		this.companyborrowerVo=data.body.companyborrowerVo
		this.companyAttachVos=data.body.companyAttachVos
		this.companyVo=data.body.companyVo
		this.memberVo=data.body.memberVo
		this.companyLegalVo=data.body.companyLegalVo
		this.companyBankCardVos=data.body.companyBankCardVos

		this.borrwerMarry=data.body.companyborrowerVo.borrwerMarry+''
		console.log('borrwerMarry',this.borrwerMarry)
		this.companyLegalVo.legalMarry=data.body.companyLegalVo.legalMarry+''

		this.companyVo.registerCapital=data.body.companyVo.registerCapital/10000
		//处理公司地址
		this.companyVo.foundTime=this.companyVo.foundTime?this.companyVo.foundTime.substr(0,10):''

			if (this.companyVo.companyAddress) {
				let array=this.companyVo.companyAddress.split('-')
				switch (array.length) {
					case 1:
						this.province=array[0];
						break;
					case 2:
						this.province=array[0];
						this.city=array[1];
						this.getCityList(this.province);
						break;
					case 3:
						this.province=array[0];
						this.city=array[1];
						this.detailAddress=array[2];
						this.getCityList(this.province);
						break;
					default:
						for(let i=0;i<array.length;i++){
							if(i==0){
								this.province=array[i];
								this.getCityList(this.province);
							}else if(i==1){
								this.city=array[i];
							}else if(i==2){
								this.detailAddress=array[i];
							}else{
								this.detailAddress+='-'+array[i];
							}
						}
						break;
				}
			}
		//把附件的数据封装成key-value
		this.companyAttachVos.forEach(e=>{
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
		console.log(this.attachment)

		// 放在这里处理银行卡数组数据，重新封装
	    if (this.companyBankCardVos[0]) {
	    	this.companyBankCardDatas=[]
	    	this.companyBankCardVos.forEach(e=>{
	    		this.companyBankCardDatas.push(new BankCardInfo(this.companyInfo,this.createUniqueId(),e))
	    	})
	    }



	}

	runSituation(){
		this.router.navigate(['memberM/memberManage/detail',this.memberId,'runSituation'])
	}
	riskM(){
		this.router.navigate(['memberM/memberManage/detail',this.memberId,'riskM'])

	}


	//2017.11.13
	//附件部分大改
	//show方法，获取文件信息方法，下载方法--start
	show(e,type){
		console.log(type)
		console.log(this.attachment[type])
		console.log(!this.attachment[type])
		if (!!this.attachment[type]) {
			let url:any=this.companyInfo.getFileUrl(this.attachment[type].fileLoadId)
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
			let url=this.companyInfo.downLoadFile(this.attachment[type].fileLoadId)
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




	/**
	 * 查看附件，
	 * @param {[type]} data [description]
	 */
	// show(type,e){
	// 	console.log(type)
	// 	console.log(this.attachment[type])
	// 	console.log(!this.attachment[type])
	// 	if (!!this.attachment[type]) {
	// 		let url:any=this.companyInfo.getFileUrl(this.attachment[type].fileLoadId)
	// 		this.gallery.open(e,url);

	// 	}
	// }

	deleteFile(id,up){
		this.companyInfo.deleteFile(this.memberId,this.attachment[id].attachId,this.attachment[id].fileLoadId)
			.then(res=>{
				console.log(res)
				delete this.attachment[id]
				this[up].queue=[]
			})
			.catch(res=>{
				this.pop.error({
					title:"错误信息",
					text:res.message
				})
			})
	}


	edit(part){
		this[part]=!this[part]
	}
	cancel(part){
		this[part]=!this[part]
		//从编辑返回详情时刷新页面
		this.companyBankCardDatas=[]
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


	save1(){
		this.submitting=true

		let listJson=this.handleAttachData()

		let data:Part1Data={
			memberId:this.memberId,//会员ID：
			borrwerPerson:this.companyborrowerVo.borrwerPerson,//姓名：
			borrwerIdcard:this.companyborrowerVo.borrwerIdcard,//身份证号码
			borrwerDegree:this.companyborrowerVo.borrwerDegree,//最高学历:
			borrwerMobile:this.companyborrowerVo.borrwerMobile,//联系手机
			borrwerMarry:this.borrwerMarry=='null'?'':this.borrwerMarry,//婚姻状况(字典：marryType)：
			attachList:listJson
		}

		this.companyInfo.saveCompanyBorrower(data)
			.then(res=>{
				console.log(res)
				this.pop.info({
					title:'提示',
					text:'保存成功'
				})
				this.submitting=false
				
				this.cancel('part1')
			})
			.catch(res=>{
				this.pop.error({
					title:'错误提示',
					text:res.message
				})
				this.submitting=false

			})

	}
	save2(){
		this.submitting=true

		let data:Part2Data={
			memberId:this.memberId,//会员ID：
			companyName:this.memberVo.companyName,//公司名称：
			companyType:this.companyVo.companyType,//公司类型（字典:guest_company_type）
			registerCapital:this.companyVo.registerCapital*10000,//注册资金
			foundTime:this.companyVo.foundTime+' '+'00:00:00',//注册时间
		 	linkName:this.companyVo.linkName,//联系人
		 	linkMobile:this.companyVo.linkMobile,//联系手机
			licenceNum:this.companyVo.licenceNum,//营业执照号
			companyAddress:this.province+'-'+this.city+'-'+this.detailAddress,//企业地址
			attachList:this.handleAttachData()
		}
		this.companyInfo.saveCompanyInfo(data)
			.then(res=>{
				this.pop.info({
					title:'提示',
					text:'保存成功'
				})
				this.submitting=false

				this.cancel('part2')

			})
			.catch(res=>{
				this.pop.error({
					title:'错误提示',
					text:res.message
				})
				this.submitting=false

			})
	}
	save3(){
		this.submitting=true

		let data:Part3Data={
			memberId:this.memberId,//会员ID：
			legalPerson:this.companyLegalVo.legalPerson,//法人姓名
			legalIdcard:this.companyLegalVo.legalIdcard,//法人身份证：
			legalDegree:this.companyLegalVo.legalDegree,//最高学历
			legalMarry:this.companyLegalVo.legalMarry,//婚姻状况（字典：marryType）
			legalMobile:this.companyLegalVo.legalMobile//联系手机
		}
		this.companyInfo.saveCompanyLegal(data)
			.then(res=>{
				this.pop.info({
					title:'提示',
					text:'保存成功'
				})
				this.submitting=false

				this.cancel('part3')

			})
			.catch(res=>{
				this.pop.error({
					title:'错误提示',
					text:res.message
				})
				this.submitting=false

			})
	}
	save4(){
		this.submitting=true

		let data:Part4Data={
			memberId:this.memberId,//会员ID：
			attachList:this.handleAttachData()
		}

		this.companyInfo.saveCompanyBankCard(data)
			.then(res=>{
				this.pop.info({
					title:'提示',
					text:'保存成功'
				})
				this.submitting=false

				this.cancel('part4_2')

			})
			.catch(res=>{
				this.pop.error({
					title:'错误提示',
					text:res.message
				})
				this.submitting=false

			})


	}

	save5(){
		this.submitting=true

		let data=[]
		if (this.companyBankCardDatas.length>0) {
			this.companyBankCardDatas.forEach(e=>{
				e.companyBankInfo.type=e.accType
				e.companyBankInfo.bankName=e.bankName
				e.companyBankInfo.subbankName=e.subBankName
				if (!e.companyBankInfo.memberId) {
					e.companyBankInfo.memberId=this.memberId
				}
				// if (!e.companyBankInfo.cardName) {
				// 	e.companyBankInfo.cardName="卧槽"
				// }

				data.push(e.companyBankInfo)
			})
		}else{
			return
		}
		console.log(this.companyBankCardDatas)
		this.companyInfo.updateApply(this.memberId,data)
			.then(res=>{
				this.pop.info({
					title:'提示',
					text:'提交成功'
				})
				this.submitting=false

				this.cancel('part4_1')
			})
			.catch(res=>{
				this.pop.error({
					title:'错误提示',
					text:res.message
				})
				this.submitting=false

			})
	}


	back(){
		this.router.navigate(["memberM/memberManage/detail",this.memberId])
	}



	addBankCardInfo(){
		// 	账户类型 companyBankCardVos[].typeDic		银行账号	companyBankCardVos[].cardNo
	// 	银行名称 companyBankCardVos[].bankName		支行名称	companyBankCardVos[].subbankName
	// 	认证状态 companyBankCardVos[].authStatusDic		默认		companyBankCardVos[].isDefaultDic
		let o= new BankCardInfo(this.companyInfo,this.createUniqueId());

		this.companyBankCardDatas.push(o)

		console.log(this.companyBankCardDatas)

	}

	// deleteBankCard(index){

	// 	this.companyBankCardDatas.splice(index,1)
	// 	console.log(this.companyBankCardDatas)
	// }

	//生成一个不重复的随机数1~300
	createUniqueId():number{
		let index=Math.floor(Math.random()*this.originalArray.length);
		this.originalArray.splice(index,1)
		return index+1
	}


	//2017.10.26修改银行卡编辑部分的交互
	//相关的变量

	bankCardModal:boolean=false

	bankCardModalEditOrAdd:string

	bankCardModalData:BankCardSubmitData={
		memberId:'',
		operation:'',
		type:''
		}
	// bankName
	// subBankName
	bankKey
	subBankKey
	bankList=[]
	subBankList=[]

	httpRequestKiller

	bankCardEdit(item){
		console.log(item)
		this.bankCardModalEditOrAdd="edit"
		this.initBankCardModalData()

		if (item) {
			this.bankCardModalData=item
		}
		
		this.bankCardModal=true
	}

	bankCardAdd(){
		if (this.companyBankCardVos.length>2) {
			this.pop.info({
				title:'提示信息',
				text:'会员最多有三个银行卡!'
			})
			return
		}
		this.bankCardModalEditOrAdd="add"

		this.initBankCardModalData()
		this.bankCardModalData.memberId=this.memberId		
		this.bankCardModal=true
	}

	clearBanks(){
		this.bankList=[]

	}

	

	clearSubBanks(){
		this.subBankList=[]
	}

	queryBanks(key){

		clearTimeout(this.httpRequestKiller)
		this.httpRequestKiller=setTimeout(()=>{
			this.bankKey=key
			this.companyInfo.getBanks(key)
				.then(res=>{
					this.bankList=res.body.records
				})
				.catch(res=>{
				this.pop.error({
					title:'错误提示',
					text:res.message
				})
			})
		},200)
		
		
	}

	querySubBanks(key){
		clearTimeout(this.httpRequestKiller)
		this.httpRequestKiller=setTimeout(()=>{
			this.companyInfo.getSubbankList(this.bankCardModalData.bankName,key)
			.then(res=>{
				this.subBankList=res.body.records
			})
			.catch(res=>{
				this.pop.error({
					title:'错误提示',
					text:res.message
				})
			})
		},200)
		
	}


	bankCardSubmit(operation){
		this.bankCardModalData.operation=operation
		this.companyInfo.upBankCardApply(this.bankCardModalData)
			.then(res=>{
				this.pop.info({
					title:'提示',
					text:'提交成功'
				})
				this.getDetailData()
				this.closeModal()

			})
			.catch(res=>{
				this.pop.error({
					title:'错误提示',
					text:res.message
				})
				this.getDetailData()

			})
	}

	closeModal(){
		this.bankCardModal=false
	}

	initBankCardModalData(){
		this.bankCardModalData={
			memberId:'',
			operation:'',
			type:''
		}
		// bankName
		// subBankName
		this.bankKey=""
		this.subBankKey=""
		this.bankList=[]
		this.subBankList=[]
	}
}


class BankCardInfo{

	constructor(companyInfo:CompanyInfoService,uniqueId,companyBankInfo?) {

		if (companyBankInfo) {
			this.companyBankInfo=companyBankInfo
			this.bankName=companyBankInfo.bankName
			this.subBankName=companyBankInfo.subbankName
			this.accType=companyBankInfo.type+''
			console.log(this.accType)
		}
		
		this.uniqueId=uniqueId
		console.log(this.uniqueId)


		this.companyInfo=companyInfo

	}
	//账户类型
	accType
	//存放账户类型列表
	// accTypeList

	uniqueId

	//从外面导进来的银行卡信息
	companyBankInfo:{
		memberId?
		type?
		bankName?
		subbankName?
		lineNo?
		cardName?
	}={}

	//父级组件的服务，从这里获取银行和支行列表
	companyInfo

	bankName
	subBankName
	bankKey
	subBankKey
	bankList=[]
	subBankList=[]


	clearBanks(){
		this.bankList=[]

	}

	clearSubBanks(){
		this.subBankList=[]
	}

	queryBanks(key){
		console.log(key)
		console.log(this.bankKey)
		this.bankKey=key
		this.companyInfo.getBanks(key)
			.then(res=>{
				this.bankList=res.body.records
			})
	}

	querySubBanks(key){
		this.companyInfo.getSubbankList(this.bankName,key)
			.then(res=>{
				this.subBankList=res.body.records
			})
	}

	customTrackBy(index: number, obj: any): any {
	  return index;
	}
}
