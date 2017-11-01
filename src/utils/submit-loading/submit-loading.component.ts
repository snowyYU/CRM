import { Component, Input, OnInit,OnChanges,SimpleChanges } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'submit-loading',
	templateUrl: 'submit-loading.component.html',
	styleUrls:['./submit-loading.component.less']
})
export class SubmitLoadingComponent implements OnInit,OnChanges {
  @Input() show:boolean=false;
  @Input() icon:string="spinner";
  @Input() size:any="middle";

	constructor() {}

	ngOnInit() {

	}

	ngOnChanges(changes:SimpleChanges){
		console.log(changes)
		let ifShow=changes['show']
		if(ifShow){
			let currentIfShow=ifShow.currentValue
			let preIfShow=ifShow.previousValue
			if(currentIfShow!=preIfShow){
				if(currentIfShow==true){
					this.addClass(document.body,'submit-loading-component-o-h')
					console.log(document.getElementsByTagName("body")[0])
					// document.getElementsByTagName("body")[0].style="overflow-y:hidden"
				}else if(currentIfShow==false){
					this.removeClass(document.body,'submit-loading-component-o-h')
					// document.getElementsByTagName("body")[0].removeAttribute("style")
				}
			}
		}
	}

	/**
   * 为元素添加一个类
   * @param elem
   * @param className
   */
  private addClass(elem: HTMLElement, className: string) {
    let classList = elem.className.split(/\s+/);
    if (classList.indexOf(className) < 0) {
      classList.push(className);
      elem.className = classList.join(' ');
    }
  }
	/**
   * 删除某个类
   * @param elem
   * @param className
   */
  private removeClass(elem: HTMLElement, className: string) {
    let classList = elem.className.split(/\s+/);
    let clsIndex = classList.indexOf(className);
    if (clsIndex >= 0) {
      classList.splice(clsIndex, 1);
      elem.className = classList.join(' ');
    }
  }

}
