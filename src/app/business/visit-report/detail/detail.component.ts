import { Component,OnInit } from '@angular/core';
import { DetailService } from './detail.service'

@Component({
	selector:'detail',
	templateUrl:'./detail.component.html',
	styleUrls:['./detail.component.less'],
	providers:[DetailService]
})
export class DetailComponent implements OnInit{
	guestName:string;
	visitDate:string;
	visitWhatDic:string;
	serviceMan:string;
	linkName:string;
	linkMobile:string;
	visitCity:string;
	companyAddress:string;
	visitVehicleDic:string;
	remark:string;
	constructor(
		private detailService:DetailService
	){}

	ngOnInit(){
		this.detailService.getData().then(res=>{
			let data=JSON.parse(res._body);
			this.handleFun(data);
		})
	}

	handleFun(data){
		console.log(data);
		if (data.status==200) {
			this.guestName=data.body.guestName;
			this.visitDate=data.body.visitDate;
			this.visitWhatDic=data.body.visitWhatDic;
			this.serviceMan=data.body.serviceMan;
			this.linkName=data.body.linkName;
			this.linkMobile=data.body.linkMobile;
			this.companyAddress=data.body.companyAddress;
			this.visitCity=data.body.visitCity;
			this.visitVehicleDic=data.body.visitVehicleDic;
			this.remark=data.body.remark;

		}
	}

	back(){
		window.history.back()
	}

}