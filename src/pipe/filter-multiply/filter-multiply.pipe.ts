import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'filterMultiply'
})
export class FilterMultiplyPipe implements PipeTransform {
	transform(value: any, m): any {
		if(value&&value!="--") {
			if (m) {
				return value*m
			}
			
		} else {
			return '--';
		}
	}
}