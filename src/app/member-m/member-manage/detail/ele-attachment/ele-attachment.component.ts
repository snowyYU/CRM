import { Component, OnInit ,ViewChild} from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router'
import { PopService } from 'dolphinng'
import { EleAttachmentService } from './ele-attachment.service'
import { GalleryComponent} from 'dolphinng';

@Component({
	moduleId: module.id,
	selector: 'ele-attachment',
	templateUrl: 'ele-attachment.component.html',
	styleUrls: ['ele-attachment.component.less'],
	providers:[EleAttachmentService]
})
export class EleAttachmentComponent implements OnInit {
	attachment:object={}
	memberId:number

	@ViewChild(GalleryComponent) gallery:GalleryComponent;


	constructor(
		private router:Router,
		private route:ActivatedRoute,
		private eleAttach:EleAttachmentService,
		private pop:PopService
		) {}

	ngOnInit() {
		this.memberId=this.route.params['value']['id']
		console.log(this.route.params['value']['id'])

		this.getDetailData()



	}

	//获取详情数据
	getDetailData(){
		this.eleAttach.getDetailData(this.memberId)
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

		console.log(res)

		//把附件的数据封装成key-value
		if (res.body.records) {
			res.body.records.forEach(e=>{
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


	show(e,type){
		console.log(type)
		console.log(this.attachment[type])
		console.log(!this.attachment[type])
		if (!!this.attachment[type]) {
			let url:any=this.eleAttach.getFileUrl(this.attachment[type].fileLoadId)
			this.gallery.open(e,url);
			
		}/*else{
			this.pop.error({
				title:'错误提示',
				text:'无此文件！'
			})
		}*/
	}

	back(){
		this.router.navigate(["memberM/memberManage/detail",this.memberId])
	}

	
	// ********基础资质类01***********************************************/
	// Basic1("0101","四证合一（营业执照、地国税务登记证、组织代码证）"),
	// Basic2("0102","公司章程"),
	// Basic3("0103","验资报告"),
	// Basic4("0104","申请人身份证（正面）"),
	// Basic5("0105","申请人身份证（反面）"),
	// Basic6("0106","配偶身份证（正面）"),
	// Basic7("0107","配偶身份证（反面）"),
	// Basic8("0108","结婚证（正面）"),
	// Basic9("0109","结婚证（反面）"),
	// Basic0("0110","户口本"),
	// Basic11("0111","人行版征信报告"),
	// Basic12("0112","申请人与经营场所合照"),
	// Basic13("0113","公司门面照"),
	// Basic14("0114","运金所尽调报告"),
	
	// /*******业务资质类02************************************************/
	// Business1("0201","职业资格证书"),
	// Business2("0202","道路运输可证"),
	// Business3("0203","运输合作合同"),
	// Business4("0204","营运车辆机动车登记证"),
	// Business5("0205","行驶证"),
	// Business6("0206","营运车辆挂靠协议"),
	
	// /*******资产类03***************************************************/
	// Asset1("0301","房产证明"),
	// Asset2("0302","租赁（房）合同"),
	
	// /*****业务运营类04**************************************************/
	// BusinessOperation1("0401","业务运单"),
	// BusinessOperation2("0402","回单"),
	// BusinessOperation3("0403","发票"),
	// BusinessOperation4("0404","货物保险"),
	// BusinessOperation5("0405","自有车辆保险"),
	// BusinessOperation6("0406","融资合同"),
	// BusinessOperation7("0407","展期合同"),
	
	// /*****银行类05**************************************************/
	// Bank1("0501","开户证明"),
	// Bank2("0502","银行卡"),
	// Bank3("0503","展期申请支付流水"),
	// Bank4("0504","网银流水"),
	
	// /*****其他类06**************************************************/
	// Other1("0601","其他（催收）");
	

}