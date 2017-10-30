import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'filterNull'
})
export class FilterNullPipe implements PipeTransform {
	transform(value: any, money: boolean, args: any[]): any {
		if (value=='0') {
			value=parseInt(value)
		}
		if(value) {
			return value
		} else if((value==0)&&money){
			return 0
		}else{
			return '--';
		}
	}
}