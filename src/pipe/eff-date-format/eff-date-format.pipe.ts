import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'effDateFormat'
})
export class EffDateFormatPipe implements PipeTransform {
	transform(value: string, args: any[]): any {
		if(value) {
			if (value.length>10) {
				return value.substring(0,10)
			}else{
				return value
			}
		} else {
			return '-';
		}
	}
}