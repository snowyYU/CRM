import { Component,OnInit } from '@angular/core'
import { DetailService } from './detail.service'
import { ActivatedRoute } from '@angular/router'
import { PopService } from 'dolphinng'


@Component({
	selector:'detail',
	templateUrl:'./detail.component.html',
	styleUrls:['./detail.component.less'],
	providers:[DetailService]
})
export class DetailComponent implements OnInit{
	guestName
	status
	guestFrom
	createTime
	appId
	appName
	serviceMan
	companyType
	foundTime
	registerCapital
	licenceNum
	companyAddress
	linkName
	linkMobile
	linkJob
	remark
	constructor(
			private detailService:DetailService,
			private route:ActivatedRoute,
			private pop:PopService
		){}

	ngOnInit(){
		this.detailService
			.getData(this.route.params['value']['id'])
			.then(res=>{
				console.log(res);
				this.handleData(res);
			})
			.catch(res=>{
				this.pop.error({
					title:'错误信息',
					text:res.message
				})
			})
	}

	handleData(res){
		this.guestName=res.body.guestName;
		this.status=res.body.statusDic;
		this.guestFrom=res.body.guestFromDic;
		this.createTime=res.body.createTime;
		this.appId=res.body.appId;
		this.appName=res.body.appName;
		this.serviceMan=res.body.serviceMan;
		this.companyType=res.body.companyTypeDic;
		this.foundTime=res.body.foundTime;
		this.registerCapital=res.body.registerCapital;
		this.licenceNum=res.body.licenceNum;
		this.companyAddress=res.body.companyAddress;
		this.linkName=res.body.linkName;
		this.linkMobile=res.body.linkMobile;
		this.linkJob=res.body.linkJob;
		this.remark=res.body.remark
		// this.remark=res.body.remark?res.body.remark:"暂无备注"

	}

	cancel(){
		window.history.back()
	}

}