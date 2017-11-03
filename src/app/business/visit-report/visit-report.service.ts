import { Injectable } from '@angular/core';
import { MyHttp } from '../../../services/myHttp/myhttp.service';
import { MyHttpClient } from '../../../services/myHttp/myhttpClient.service'
import { API } from '../../../services/config/app.config'
import { DateService } from '../../../services/date/date.service';
import { SendData } from './sendDate';

class Item{
	serial:number;
	timetableId:number;
	guestName:string;
	visitDate:string;
	visitWhatDic:string;
	serviceMan:string;
	remark:string;
}

@Injectable()
export class VistReportService{
constructor(private myHttp:MyHttpClient){}
	getList(sendDate:SendData):Promise<{
		timetableId
		visitWhatDic
		serial
		guestName
		visitDate
		serviceMan
		remark
		records}[]
		>{
		return this.myHttp.post({
			api:this.myHttp.api.visitReportList,
			query:sendDate
		}).toPromise()
		  .then(res=>{
		  	let response=res;
		  	let data={
		  		records:[],
		  		count:0
		  	};
		  	if (response.status==200) {
		  		data.count=response.body.paginator.totalCount
		  		response.body.records.forEach((e,index)=>{
		  			let item=new Item();
		  			item.timetableId=e.timetableId;
		  			item.visitWhatDic=e.visitWhatDic;
		  			item.serial=index+1;
		  			item.guestName=e.guestName;
		  			item.visitDate=e.visitDate;
		  			item.serviceMan=e.serviceMan;
		  			item.remark=e.remark;
		  			data.records.push(item);
		  		})
		  	}
		  	return Promise.resolve(data);
		  })

	}

	getListInit(){

	}

	getManageL():Promise<any>{
		return this.myHttp.post({
			url:API.loginHost+API.getByDepart.url,
			body:{
				departCode:'003'
			}
		})
		.toPromise()
		.then(res=>{
			let data=res;
			if (data.status==200) {
				return Promise.resolve(data)
			}else{
				return Promise.reject(data)
			}
		})
	}
	
}