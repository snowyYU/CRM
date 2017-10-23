import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { PopService } from 'dolphinng'
import { ApplyAuthService } from './apply-auth.service'
import { Uploader } from '../../../../utils/uploader/Uploader'
import { GalleryComponent} from 'dolphinng';

class Attachment {


	constructor(
		bigClassifyList,
		applyAuth:ApplyAuthService,
		id:number
		){
		this.firstList=bigClassifyList
		this.uploader=new Uploader()
		this.applyAuth=applyAuth
		this.id=id
		//上传方法和参数
		this.uploader.url='http://121.46.18.25:9090/fileserver/file/upload';
	    this.uploader.isCompress=true;
	    this.uploader.onSelect((files)=>{//文件选择完毕
	      console.log(files);
	    });
	    this.uploader.onQueue((uploadFile)=>{//文件加入队列
	      //uploadFile.addSubmitData('fileId','文件ID');  //发送此字段删除该指定ID的文件
	      uploadFile.addSubmitData('businessType',this.secondType);
	      uploadFile.addSubmitData('fileName',uploadFile.fileName);
	      uploadFile.addSubmitData('fileType',uploadFile.fileExtension);
	      uploadFile.addSubmitData('fileSize',uploadFile.fileSize);
	      uploadFile.addSubmitData('fileContent',uploadFile.getFile());
	    });
	    this.uploader.onQueueAll((uploadFiles)=>{//文件全部加入队列
	      console.log('文件全部加入队列',uploadFiles);
	      this.uploader.upload()
	    });
	    
	    this.uploader.onProgress((progress,uploadFile,uploader,index)=>{//上传中
	      console.log(progress);
	      console.log(uploadFile);
	      console.log(uploader);
	      console.log(index);
	    });
	    this.uploader.onSuccess((uploadFile,uploader,index)=>{//上传请求成功
	      console.log(uploadFile);
	      console.log(uploader);
	      console.log(index);
	    });
	    this.uploader.onComplete((uploader)=>{//完成上传
	      console.log('完成上传',uploader);
	      this.isUploaded=true
	      // this.uploader.queue=this.uploader.queue.map(e=>{
	      // 	if(JSON.parse(e.response).body.status==200){

	      // 		e.setSuccess()
	      // 		console.log(e)
	      // 		return e
	      // 	}
	      // })
	      if (!uploader.queue[0].error) {
	    		let data=JSON.parse(uploader.queue[0].response)
	    		this.uploader.customData.data=data
	      		if (data.status==200) {
	      			setTimeout(()=>{
	      				this.uploader.queue[0].setSuccess()
	      			},1000)
			      	
			      	
			      	
			     }
	    	}


	    });

	}
	isUploaded:boolean=false
	uploader
	id
	applyAuth
	firstList:any[]//第一个下拉列表数据

	firstType//第一个下拉列表model数据
	secondList:any[]//第二个下拉列表数据
	secondType//第二个下拉列表model数据
	attachLoadId:any[]
	
	deleteClick(){
		this.uploader.queue.forEach(e=>{
			let data=e.response.json()
			this.applyAuth.deleteAttachment(data.body.fileId)
				.then(res=>{
					console.log(res)
				})
		})
	}
	selectFirstL(){
		this.applyAuth.getClassifyL(this.firstType)
			.then(res=>{
				console.log(res)
				this.secondList=res.body.records
			})
	}
	//打开文件和详情函数
	// openAttach(data){
	// 	console.log(data.response)
	// 	let fileId=JSON.parse(data.response).body.fileId
	// 	window.open('http://121.46.18.25:9090/fileserver/file/download?fileId='+fileId+'&mode='+'1')

	// }

}

@Component({
	moduleId: module.id,
	selector: 'apply-auth',
	templateUrl: './apply-auth.component.html',
	styleUrls:['./apply-auth.component.less'],
	providers:[ApplyAuthService]
})
export class ApplyAuthComponent implements OnInit {
	attachment={}

	guestId

	guestName
	status
	guestFrom
	createTime
	appId
	appName
	serviceMan
	companyType
	foundTime
	registerCapital
	licenceNum
	companyAddress
	linkName
	linkMobile
	linkJob
	linkIdcard
	memberType
	typeList:any[]
	isLegal
	isLegalList:any[]=[]
	firstList:any[]//附件第一个列表数据

	attachmentList:Attachment[]=[]

	originalArray:number[]=[]

	@ViewChild(GalleryComponent) gallery:GalleryComponent;

	constructor(
			private applyAuth:ApplyAuthService,
			private route:ActivatedRoute,
			private router:Router,
			private pop:PopService
		){
		
	}

	ngOnInit(){

		this.guestId=this.route.params['value']['id']

		//给原数组originalArray赋值 
		for (let i=0;i<300;i++){ 
		this.originalArray[i]=i+1; 
		} 

		this.getIsLegal()
		this.getTypeList()
		this.getFistList()
		

		this.applyAuth
			.getData(this.route.params['value']['id'])
			.then(res=>{
				this.handleData(res);
			})
			.catch(res=>{
				this.pop.error({
					title:'错误信息',
					text:res.message
				})
			})
	}

	getTypeList(){
		this.applyAuth.getTypeList()
		.then(res=>{
			console.log(res.body)

			this.typeList=res.body.records
		})
		.catch(res=>{
			this.pop.error({
				title:'错误提示',
				text:res.message
			})
		})
	}

	getIsLegal(){
		this.applyAuth.getIsLegal()
		.then(res=>{
			console.log(res.body)
			this.isLegalList=res.body.records
		})
		.catch(res=>{
			this.pop.error({
				title:'错误提示',
				text:res.message
			})
		})
	}

	// 获取附件第一个下拉列表的数据
	getFistList(){
		this.applyAuth.getBigClassify()
			.then(res=>{
				this.firstList=res.body.records
				console.log(this.firstList)
				this.addAttachment()
			})
			.catch(res=>{
			this.pop.error({
				title:'错误提示',
				text:res.message
			})
		})
	}

	handleData(res){
		this.guestName=res.body.guestName;
		this.status=res.body.statusDic;
		this.guestFrom=res.body.guestFromDic;
		this.createTime=res.body.createTime;
		this.appId=res.body.appId;
		this.appName=res.body.appName;
		this.serviceMan=res.body.serviceMan;
		this.companyType=res.body.companyTypeDic;
		this.foundTime=res.body.foundTime;
		this.registerCapital=res.body.registerCapital*0.0001;
		this.licenceNum=res.body.licenceNum;
		this.companyAddress=res.body.companyAddress;
		this.linkName=res.body.linkName;
		this.linkMobile=res.body.linkMobile;
		this.linkJob=res.body.linkJob;
	}

	addAttachment(){
		console.log(this.firstList)
		console.log(this.attachmentList.length)
		if (this.attachmentList.length>=5) {
			this.pop.info({
				title:"提示信息",
				text:"附件上传不超过5个"
			})
			return;
		}

		let ele=new Attachment(this.firstList,this.applyAuth,this.createUniqueId())
		this.attachmentList.push(ele)
	}

	deleteFile(item){
		console.log(item.id)
		if (item.uploader.customData.data&&item.uploader.customData.data.status==200) {
			this.applyAuth.deleteAttachment(item.uploader.customData.data.body.fileId)
				.then(res=>{
					console.log(res)
				})
		}
		let deleteIndex
		this.attachmentList.forEach((e,i)=>{
			if (e.id=item.id) {
				deleteIndex=i
				return
			}
		})
		this.attachmentList.splice(deleteIndex,1)


	}

	show(e,item){
		let url:any=this.applyAuth.getFileUrl(item.uploader.customData.data.body.fileId)
		this.gallery.open(e,url);

		
	}

	cancel(){
		window.history.back()
	}

	submit(){
		//整理提交的数据
		let sendData={
			memberType:this.memberType,		//会员类别
			guestId:this.guestId,			//客户跟踪ID
			isLegal:this.isLegal,			//是否法人
			linkIdcard:this.linkIdcard		//联系人身份证
		} 
		console.log(this.attachmentList[0])
		if (this.attachmentList[0]&&this.attachmentList[0].uploader.customData.data){
			this.attachmentList.forEach((e,i)=>{
				if (this.attachmentList[i]&&this.attachmentList[i].uploader.customData.data){
					sendData['attch'+(i+1)+'Type']=e.secondType
					sendData['attch'+(i+1)+'Loadid']=e.uploader.customData.data.body.fileId

				}
				
			})
		}

		console.log(this.attachmentList)

		this.applyAuth.saveData(sendData)
			.then(res=>{
				console.log(res)
				this.pop.info({
					title:'提示信息',
					text:res.message
				})

				this.router.navigate(['business/customerList'])
			})
			.catch(res=>{
				this.pop.error({
					title:'错误信息',
					text:res.message
				})
			})

	}

	//生成一个不重复的随机数1~300
	createUniqueId():number{
		let index=Math.floor(Math.random()*this.originalArray.length);
		this.originalArray.splice(index,1)
		console.log(index); 
		console.log(this.originalArray); 
		return index+1
	}


}