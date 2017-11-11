import { Component, OnInit,ElementRef,Input,OnChanges,SimpleChanges } from '@angular/core';
import { AfterViewInit,ViewChild } from '@angular/core'
import { GalleryComponent } from 'dolphinng' 
@Component({
	moduleId: module.id,
	selector: 'previewer',
	templateUrl: 'previewer.component.html',
	styleUrls:['./previewer.component.less']
})
export class PreviewerComponent implements OnInit,OnChanges{
	
	@Input() previewer:boolean=true
	@Input() src:string=""
	@Input() size:string="md"
	@Input() syn:string			//传入文件名的后缀

	@ViewChild('ga') gallery:GalleryComponent

	modalVisible:boolean=false

	constructor(private elemRef:ElementRef) {}

	ngOnInit() {
		
	}

	ngOnChanges(changes:SimpleChanges){
		console.log("previewer change",changes)
		if (changes['src']) {
			console.log("src change")
			this.elemRef.nativeElement.querySelector("iframe").setAttribute('src',this.src)
			
		}
	}

	close(){
		this.modalVisible=false
	}

	open(event,url,syns){
		this.previewer=true
		console.log(syns)
		console.log(this.elemRef)
		if (syns=="img") {
			this.gallery.open(event,url)
		}
		if (syns=="file") {
			this.modalVisible=true
			this.size="lg"
			console.log(url)
			this.src=url
		}
	}

}