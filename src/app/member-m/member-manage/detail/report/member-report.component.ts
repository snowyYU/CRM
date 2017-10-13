import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router'
import { PopService } from 'dolphinng'
import { MemberReportService } from './member-report.service'
@Component({
	moduleId: module.id,
	selector: 'member-report',
	templateUrl: 'member-report.component.html',
	styleUrls:['./member-report.component.less'],
	providers:[MemberReportService]
})
export class MemberReportComponent implements OnInit {
	attachment:object={}
	attachList:any[]
	memberId:number
	firstAttach
	firstAttachSrc
	constructor(
		private router:Router,
		private route:ActivatedRoute,
		private memRepart:MemberReportService,
		private pop:PopService
		) {}

	ngOnInit() {
		this.memberId=this.route.params['value']['id']
		console.log(this.route.params['value']['id'])

		this.getDetailData()
	}

	//获取详情数据
	getDetailData(){
		this.memRepart.getDetailData(this.memberId)
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
				this.attachment[e.fileNumber]={
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

		this.attachList=res.body.records
		this.firstAttach=this.attachList.shift()
		if (this.firstAttach) {
			this.firstAttachSrc=this.memRepart.getFileUrl(this.attachment[this.firstAttach.fileNumber].fileLoadId)
			
		}
		console.log('response',res.body.records)
		console.log('attachList',this.attachList)
		console.log(this.attachment)
		console.log(this.firstAttach)

	}

	show(type){
		console.log(type)
		console.log(this.attachment[type])
		console.log(!this.attachment[type])
		if (!!this.attachment[type]) {
			window.open(this.memRepart.getFileUrl(this.attachment[type].fileLoadId))
			
		}else{
			this.pop.error({
				title:'错误提示',
				text:'无此文件！'
			})
		}
	}

	back(){
		this.router.navigate(["memberM/memberManage/detail",this.memberId])
	}

}