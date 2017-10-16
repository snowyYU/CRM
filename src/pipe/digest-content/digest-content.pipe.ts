import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name:"digestContent"
})

export class DigestContentPipe implements  PipeTransform{
	
	transform(value: string, length:number): any {
		if(value) {
			if (typeof value == 'string') {
				return value.slice(0,length)+'...'
			}else{
				return '-'
			}
		} else {
			return '-';
		}
	}
}