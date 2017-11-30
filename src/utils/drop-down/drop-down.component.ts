import { 
	Component, 
	OnInit,
	Input,
	ViewChild,
	ElementRef
	 } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'drop-down',
	templateUrl: 'drop-down.component.html',
	styleUrls:['./drop-down.component.less']
})
export class DropDownComponent implements OnInit {
	//真正控制内容的显示隐藏
	contentShow:boolean
	//为了消除ngif造成的闪动，引入opacity
	cssOpen:boolean
	//设置动画时间
	@Input() animateTime:number=0.3

	@ViewChild('content') content:ElementRef;

	@Input() set show(value:boolean){
		
		//传入的值为true，内容显示
		//先获取实际内容的高度
		let height;
		
		this.content.nativeElement.style.transition="height "+this.animateTime+"s"
		if (value) {
			this.contentShow=value
			this.cssOpen=true
			setTimeout(()=>{
				height=this.content.nativeElement.offsetHeight
				this.content.nativeElement.style.height=0
				this.cssOpen=false
				setTimeout(()=>{
					this.content.nativeElement.style.height=height+"px"
				})
			})
			
		}else{

			this.content.nativeElement.style.height=0
			
			setTimeout(()=>{
				this.content.nativeElement.style.height=null
				this.contentShow=value

			},this.animateTime*1000)
		}
	}

	constructor() {}

	ngOnInit() {
		
	}

	open(){
		this.show=true
	}

	close(){
		this.show=false
	}


}




//获取的高度