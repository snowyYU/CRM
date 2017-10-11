import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { PopService } from 'dolphinng';
import { AuthDetailService } from './auth-detail.service'
import { ViewChild ,ElementRef} from '@angular/core';
import { GalleryComponent} from 'dolphinng';
@Component({
	selector:'auth-detail',
	templateUrl:'./auth-detail.component.html',
	styleUrls:['./auth-detail.component.less'],
	providers:[AuthDetailService]
})
export class AuthDetailComponent implements OnInit{
	authId:number; 			//申请ID
	appName:string;			//来源渠道
	memberTypeDic:string;	//会员类别
	serviceMan:string;		//服务经理
	statusDic:string;		//状态
	createTime:string;		//申请时间	
    companyTypeDic:string;	//公司类型
    foundTime:string;		//成立时间
	registerCapital:number; //注册资金
	licenceNum:string;		//营业执照号
	companyAddress:string;	//公司地址
	companyName:string;		//客户名称
	linkName:string;		//联系人
	linkMobile:string;		//联系手机
	linkJob:string;			//联系人职位
	isLegalDic:string;		//是否法人
	linkIdcard:string;		//身份证
	auditBy:string;			//审核人
    auditDate:string;		//审核时间
    auditRemark:string;		//审核意见

    attch1Loadid
	attch1Type
	attch1TypeDic
	attch2Loadid
	attch2Type
	attch2TypeDic
	attch3Loadid
	attch3Type
	attch3TypeDic
	attch4Loadid
	attch4Type
	attch4TypeDic
	attch5Loadid
	attch5Type
	attch5TypeDic
	

	@ViewChild(GalleryComponent) gallery:GalleryComponent;
	constructor(
		private router:Router,
		private route:ActivatedRoute,
		private pop:PopService,
		private authDetail:AuthDetailService
		){
		// setTimeout(()=>{
		// 	this.gallery.open();
		// },3000);
		
	} 
	ngOnInit(){
		this.getData();
	}

	getData(){
		this.authDetail.getData(this.route.params['value']['id'])
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

	handle(res){
		console.log(res)
		this.authId=res.body.authId; 			//申请ID
		this.createTime=res.body.createTime;		//申请时间	
		this.companyName=res.body.companyName;		//客户名称
		this.statusDic=res.body.statusDic;		//状态
		this.appName=res.body.appName;			//来源渠道
		this.memberTypeDic=res.body.memberTypeDic;	//会员类别
		this.serviceMan=res.body.serviceMan;		//服务经理
	    this.companyTypeDic=res.body.companyTypeDic;	//公司类型
	    this.foundTime=res.body.foundTime;		//成立时间
		this.registerCapital=res.body.registerCapital*0.0001; //注册资金
		this.licenceNum=res.body.licenceNum;		//营业执照号
		this.companyAddress=res.body.companyAddress;	//公司地址
		this.linkName=res.body.linkName;		//联系人
		this.linkMobile=res.body.linkMobile;		//联系手机
		this.linkJob=res.body.linkJob;			//联系人职位
		this.isLegalDic=res.body.isLegalDic;		//是否法人
		this.auditBy=res.body.auditBy;			//审核人
	    this.auditDate=res.body.auditDate;		//审核时间
	    this.auditRemark=res.body.auditRemark;		//审核意见
	    this.attch1Loadid=res.body.attch1Loadid?res.body.attch1Loadid:""
		this.attch1Type=res.body.attch1Type?res.body.attch1Type:""
		this.attch1TypeDic=res.body.attch1TypeDic?res.body.attch1TypeDic:""

		this.attch2Loadid=res.body.attch2Loadid?res.body.attch2Loadid:""
		this.attch2Type=res.body.attch2Type?res.body.attch2Type:""
		this.attch2TypeDic=res.body.attch2TypeDic?res.body.attch2TypeDic:""

		this.attch3Loadid=res.body.attch3Loadid?res.body.attch3Loadid:""
		this.attch3Type=res.body.attch3Type?res.body.attch3Type:""
		this.attch3TypeDic=res.body.attch3TypeDic?res.body.attch3TypeDic:""

		this.attch4Loadid=res.body.attch4Loadid?res.body.attch4Loadid:""
		this.attch4Type=res.body.attch4Type?res.body.attch4Type:""
		this.attch4TypeDic=res.body.attch4TypeDic?res.body.attch4TypeDic:""

		this.attch5Loadid=res.body.attch5Loadid?res.body.attch5Loadid:""
		this.attch5Type=res.body.attch5Type?res.body.attch5Type:""
		this.attch5TypeDic=res.body.attch5TypeDic?res.body.attch5TypeDic:""

	}


	checkAttach(e,id){
		let url=this.authDetail.getAttachUrl(id)
		this.gallery.open(e,url);
	}

	back(){
		window.history.back()
	}

}