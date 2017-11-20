import { Injectable } from '@angular/core';

@Injectable()
export class SessionStorageService {
	
	constructor() {}

	set memberDetailDomain(value){
		window.sessionStorage.setItem('memberDetailDomain',value)
	}
	get memberDetailDomain(){
		return window.sessionStorage.getItem('memberDetailDomain')
	}

	//删除指定value的session
	deleteItem(key){
		window.sessionStorage.removeItem(key)
	}

	//清空sessionStorage
	deleteAll(){
		window.sessionStorage.clear()
	}


}