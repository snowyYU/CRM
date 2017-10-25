import { Directive,OnInit,ElementRef,Input,OnChanges,SimpleChanges } from '@angular/core'

@Directive({
	selector:'[mySrc]'
})

export class MySrcDirective implements OnInit,OnChanges {
	@Input() mySrc:any
	constructor(private elemRef:ElementRef){

	}
	
	ngOnInit(){

	}

	ngOnChanges(changes:SimpleChanges){
		let chg=changes['mySrc'];
		if ((chg&&chg.currentValue!==chg.previousValue)) {
			// code...
			if (typeof this.mySrc==='string') {
				// code...
				this.elemRef.nativeElement.setAttribute('src',this.mySrc)
			}

		}
	}


}