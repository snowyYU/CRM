import { 	
			Component, 
			OnInit,
			Input,
			Output,
			EventEmitter

			} from '@angular/core';
import { PreviewBtnService } from './preview-btn.service'
import { PopService } from 'dolphinng'
import { img,file } from '../previewer/filetype'
@Component({
	moduleId: module.id,
	selector: 'preview-btn',
	templateUrl: 'preview-btn.component.html',
	styleUrls:['./preview-btn.component.less'],
	providers:[PreviewBtnService]

})
export class PreviewBtnComponent implements OnInit {
	@Input() fileId
	fileType
	// @Output() tranferFileType=new EventEmitter<any>()

	@Output() imgPreview=new EventEmitter<any>()
	@Output() pdfPreview=new EventEmitter<any>()

	//判断文件类型是否可以预览，注意，只要存在fileId，下载肯定会出现的
	preShow:boolean=false

	constructor(
		private preBtn:PreviewBtnService,
		private pop:PopService
		) {}

	ngOnInit() {
		if (this.fileId) {
			this.getFileInfo()
		}
	}

	getFileInfo(){
		this.preBtn.getFileInfo(this.fileId)
			.then(res=>{
				if (res.status==200) {
					// console.log(res)
					if (img.indexOf(res.body.fileType)>=0||file.indexOf(res.body.fileType)>=0) {
						this.preShow=true
						console.log("显示查看")
					}
					// console.log("准备触发emit事件",res.body.fileType)
					this.fileType=res.body.fileType
					// this.tranferFileType.emit(res.body.fileType)
					// this.pop.info({
					// 	title:"提示信息",
					// 	text:res.message
					// })
				}else{
					this.pop.error({
						title:"错误信息",
						text:res.message
					})
				}
				console.log(res)
			})
			.catch(res=>{
				this.pop.error({
					title:"错误信息",
					text:res.message
				})
			})
	}
	//show方法，获取文件信息方法，下载方法--start
	show(e){
		
		if (this.fileId) {
			let url:any=this.preBtn.getFileUrl(this.fileId)
			
			console.log("准备触发emit事件imgPreview&&pdfPreview")


			// this.gallery.open(e,url);
			//这里判断上传文件的类型
			//分为可以预览的和不可以预览的，不可以预览的需要下载
			if(img.indexOf(this.fileType)>=0||file.indexOf(this.fileType)>=0){
				if (img.indexOf(this.fileType)>=0) {
					this.imgPreview.emit({event:e,url:url})
					
				}else if (file.indexOf(this.fileType)>=0) {
					this.pdfPreview.emit({event:e,url:url})
					
				}
			}else{
				this.pop.confirm({
					title:"提示框",
					text:"此文件不支持预览，是否下载查看？"
				}).onConfirm(()=>{
					this.download()
				})
			}
		}/*else{
			this.pop.error({
				title:'错误提示',
				text:'无此文件！'
			})
		}*/
	}

	

	download(){
		if (!!this.fileId) {
			let url=this.preBtn.downLoadFile(this.fileId)
			// window.open(url)
			console.log(url)
			window.location.href =url
			
		}else{
		
			this.pop.info({
				title:"提示信息",
				text:"下载失败"
			})
		}
	}

	//--end



}