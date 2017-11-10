import { 	
			Component, 
			OnInit,
			Input,
			Output,
			EventEmitter

			} from '@angular/core';
import { PreviewOrDownloadService } from './preview-or-download.service'
import { PopService } from 'dolphinng'
import { img,file } from '../previewer/filetype'
@Component({
	moduleId: module.id,
	selector: 'preview-or-download',
	templateUrl: 'preview-or-download.component.html',
	styleUrls:['./preview-or-download.component.less'],
	providers:[PreviewOrDownloadService]

})
export class PreviewOrDownloadComponent implements OnInit {
	@Input() fileId
	@Output() tranferFileType=new EventEmitter<any>()


	//判断文件类型是否可以预览，注意，只要存在fileId，下载肯定会出现的
	preShow:boolean=false

	constructor(
		private preOrDown:PreviewOrDownloadService,
		private pop:PopService
		) {}

	ngOnInit() {
		if (this.fileId) {
			this.getFileInfo()
		}
	}

	getFileInfo(){
		this.preOrDown.getFileInfo(this.fileId)
			.then(res=>{
				if (res.status==200) {
					console.log(res)
					if (img.indexOf(res.body.fileType)>=0||file.indexOf(res.body.fileType)>=0) {
						this.preShow=true
						console.log("显示查看")
					}
					console.log("准备触发emit事件",res.body.fileType)
					this.tranferFileType.emit(res.body.fileType)
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

}