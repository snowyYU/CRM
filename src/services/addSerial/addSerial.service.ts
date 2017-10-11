import { Injectable } from '@angular/core'

@Injectable()
export class AddSerialService {
	addSerial(array:Array<any>){
		array.forEach((e,i)=>{
			e.index=i+1
		})
	}
}