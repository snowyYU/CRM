import { Component,AfterViewInit,Input,EventEmitter,Output} from '@angular/core';
import { ContentChild ,ElementRef,ViewChild} from '@angular/core';
@Component({
  selector: 'select-bar',
  templateUrl: './select-bar.component.html',
  styleUrls: ['./select-bar.component.less']
})
export class SelectBarComponent implements AfterViewInit{

  showValue:boolean=true;
  showKeyword:boolean=false;
  showList:boolean=false;


  @Input() styleClass:string;
  @Input() isTriangle:boolean=true

  @Output() onDropdown:EventEmitter<any>=new EventEmitter();
  @Output() onDropup:EventEmitter<any>=new EventEmitter();
  @ViewChild('valueWrap') valueWrap:ElementRef;
  @ViewChild('kwWrap') kwWrap:ElementRef;
  @ViewChild('listWrap') listWrap:ElementRef;
  constructor(
  ){
    window.addEventListener('click',()=>{
      this.dropup();
    });

  }

  ngAfterViewInit(){
    let valElem=this.valueWrap.nativeElement.querySelector('input');
    if(valElem){
      valElem.addEventListener('click',(ev)=>{
        this.dropdown();
      });
      valElem.addEventListener('keydown',(ev)=>{
        ev.preventDefault();
        if(this.showValue){
          this.dropdown();
        }
      });
    }
  }
  stopProp(ev:Event){
    let e=ev||window.event;
    let target=e.target||e.srcElement;
    if(target['nodeName']==='INPUT'||target['nodeName']==='UL') {
      ev.stopPropagation();
    }
  }

  dropdown(){
    this.onDropdown.emit();
    this.showValue=false;
    this.showKeyword=true;
    this.showList=true;
    let elem:HTMLElement=this.kwWrap.nativeElement.querySelector('input');
    if(elem){
      setTimeout(()=>{
        let h=elem.offsetHeight;
        this.listWrap.nativeElement.style.top=h+1+'px';
        elem.focus();
      });
    }
  }

  dropup(){
    this.onDropup.emit();
    this.showValue=true;
    this.showKeyword=false;
    this.showList=false;
  }

}
