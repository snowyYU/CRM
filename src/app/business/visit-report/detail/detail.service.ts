import { Injectable } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';

import { MyHttp } from '../../../../services/myHttp/myhttp.service'

@Injectable()
export class DetailService{
	constructor(
		private myHttp:MyHttp,
		private route:ActivatedRoute
		){
		console.log
	}

	getData():Promise<any>{

		return this.myHttp.post({
			api:this.myHttp.api.visitReportDetail,
			query:{
				timetableId:this.route.params['value']['id']
			}
		}).toPromise()
	}
}