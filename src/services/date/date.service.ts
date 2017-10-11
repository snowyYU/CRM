import { Injectable } from '@angular/core';

interface Param{
	date:Date;
	formatType:string;//"yyyy-MM-dd","yyyy-MM-dd HH:mm:ss"
}

interface NMonth{
	date:Date;
	num:number
}

@Injectable()
export class DateService{
	/**
	 * [format description]
	 * @param  {Param}  param [description]
	 * @return {string}       [description]
	 */
	  
	format(param:Param):string{
		let o = {
        "M+": param.date.getMonth() + 1, //月份 
        "d+": param.date.getDate(), //日 
        "h+": param.date.getHours(), //小时 
        "m+": param.date.getMinutes(), //分 
        "s+": param.date.getSeconds(), //秒 
        "q+": Math.floor((param.date.getMonth() + 3) / 3), //季度 
        "S": param.date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(param.formatType)) param.formatType = param.formatType.replace(RegExp.$1, (param.date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
    if (new RegExp("(" + k + ")").test(param.formatType)) param.formatType = param.formatType.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return param.formatType;
	}

	/**
	 * [lastMountMonth description]
	 * @param  {NMonth} nMonth [description]
	 * @return {Date}          [description]
	 */
	lastMountMonth(nMonth:NMonth):Date{
		if (nMonth.num) {
			// code...
			return new Date(nMonth.date.setMonth(nMonth.date.getMonth()-nMonth.num));
		}
		
	}

	todayDate():Date{
		return new Date()
	}

}