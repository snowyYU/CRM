import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'filterNull'
})
export class FilterNullPipe implements PipeTransform {
	transform(value: any, args: any[]): any {
		if(value) {
			return value
		} else {
			return '--';
		}
	}
}