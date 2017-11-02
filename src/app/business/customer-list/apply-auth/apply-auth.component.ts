import { Component, OnInit,ViewChild,ReflectiveInjector } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { PopService } from 'dolphinng'
import { ApplyAuthService } from './apply-auth.service'
import { Uploader } from '../../../../utils/uploader/Uploader'
import { GalleryComponent} from 'dolphinng';
import { DateService } from "../../../../services/date/date.service"

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
		this.pop=ReflectiveInjector.resolveAndCreate([PopService]).get(PopService)
		//上传方法和参数
		this.uploader.url='http://121.46.18.25:9090/fileserver/file/upload';
	    this.uploader.isCompress=true;
	    this.uploader.onSelect((files)=>{//文件选择完毕


	      console.log(files[0].name.length);
	    });
	    this.uploader.onQueue((uploadFile)=>{//文件加入队列
	      //uploadFile.addSubmitData('fileId','文件ID');  //发送此字段删除该指定ID的文件
	      console.log(uploadFile)
	      if (uploadFile.file.name.length>30) {
	    		this.pop.info({
	    			title:"提示信息",
	    			text:"文件名过长"
	    		})
	    		this.uploader.queue=[]
	    	}
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

	pop

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
	providers:[DateService,ApplyAuthService]
})
export class ApplyAuthComponent implements OnInit {

	guest_status:Array<any>;
	guest_from:Array<any>;
	app_list:Array<any>;
	app_list_temp:Array<any>;
	guest_company_type:Array<any>;

	province:string;
	provinceList;
	city:string;
	cityList;
	detailAddress:string

	todayDate

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

	//这个变量用来存放已选择的附件下拉列表
	selectedAttachTypeL:any[]=[]

	@ViewChild(GalleryComponent) gallery:GalleryComponent;

	constructor(
			private applyAuth:ApplyAuthService,
			private route:ActivatedRoute,
			private router:Router,
			private pop:PopService,
			private dateService:DateService
		){
		//获客途径下拉
		this.inputSelect("guest_from")
			.then(res=>{
				this.guest_from=res.body.records
			})
			.catch(res=>{
				this.pop.error({
					title:'错误信息',
					text:res.message
				})
			})
		//归属渠道下拉
		this.applyAuth
			.getBelongAppData()
			.then(res=>{
				console.log(res);
				this.app_list=res.body.records
				this.app_list_temp=res.body.records
			})
			.catch(res=>{
				this.pop.error({
					title:'错误信息',
					text:res.message
				})
			})
		//公司类型下拉
		this.inputSelect("guest_company_type")
			.then(res=>{
				this.guest_company_type=res.body.records
			})
			.catch(res=>{
				this.pop.error({
					title:'错误信息',
					text:res.message
				})
			})

		//选择省的列表
		this.provinceSelect()
	}

	ngOnInit(){


		this.todayDate=this.dateService.format({
			date:this.dateService.todayDate(),
			formatType:'yyyy-MM-dd'
		});



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
			// console.log(res.body)

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
			// console.log(res.body)
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
		this.memberType=res.body.memberType;
		this.status=res.body.statusDic;
		this.guestFrom=res.body.guestFrom;
		this.createTime=res.body.createTime;
		this.appId=res.body.appId;
		this.appName=res.body.appName;
		this.serviceMan=res.body.serviceMan;
		this.companyType=res.body.companyType;
		this.foundTime=res.body.foundTime;
		this.registerCapital=res.body.registerCapital*0.0001;
		this.licenceNum=res.body.licenceNum;
		this.companyAddress=res.body.companyAddress;
		this.linkName=res.body.linkName;
		this.linkMobile=res.body.linkMobile;
		this.linkJob=res.body.linkJob;

		//处理公司地址

		if (res.body.companyAddress) {
			let array=res.body.companyAddress.split('-')
			switch (array.length) {
				case 1:
					this.province=array[0];
					break;
				case 2:
					this.province=array[0];
					this.getCityList("2");
					this.city=array[1];
					break;
				case 3:
					this.province=array[0];
					this.detailAddress=array[2];
					this.getCityList("2");
					this.city=array[1];
					break;
				default:

					break;
			}
		}

	}

	selectSecondL(){
		this.selectedAttachTypeL=[]
		if (this.attachmentList.length>0) {
			this.attachmentList.forEach(e=>{
				this.selectedAttachTypeL.push(e.secondType)
			})
		}

		console.log(this.selectedAttachTypeL)

	}

	ifHidden(type){
		// console.log(this.selectedAttachTypeL.indexOf(type.code+''))
		let i=this.selectedAttachTypeL.indexOf(type+'')
		if(i<0) {
			return false
		}else{
			// console.log(i)
			return true
		}

	}

	addAttachment(){
		console.log(this.firstList)
		console.log("attachmentList数组的长度",this.attachmentList.length)
		if (this.attachmentList.length>=5) {
			this.pop.info({
				title:"提示信息",
				text:"附件上传不超过5个"
			})
			return;
		}
		let unique=this.createUniqueId()
		console.log("随机数+1",unique)
		let ele=new Attachment(this.firstList,this.applyAuth,unique)
		console.log(ele)
		this.attachmentList.push(ele)
	}

	deleteFile(item){
		console.log("点击删除时取到的项",item)

		if (item.uploader.customData.data&&item.uploader.customData.data.status==200) {
			this.applyAuth.deleteAttachment(item.uploader.customData.data.body.fileId)
				.then(res=>{
					console.log(res)
				})
		}
		let deleteIndex
		this.attachmentList.forEach((e,i)=>{
			if (e.id==item.id) {
				deleteIndex=i
				return
			}
		})
		console.log(deleteIndex)
		this.attachmentList.splice(deleteIndex,1)
		console.log("全局的附件数组",this.attachmentList)
		//更新每个附件第二个下拉列表的小黑屋
		this.selectSecondL()
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
		//整理地址
		let companyAddress:string;
		if(this.province&&this.city&&this.detailAddress){
			companyAddress=this.province+'-'+this.city+'-'+this.detailAddress;
		}else{
			companyAddress='';
		}
		let sendData={
			guestName:this.guestName,		//客户名称
			guestFrom:this.guestFrom,		//获客途径
			appId:this.appId,				//归属渠道
			memberType:this.memberType,		//会员类别
			guestId:this.guestId,			//客户跟踪ID
			linkName:this.linkName,			//联系人
			linkMobile:this.linkMobile,		//联系人手机
			isLegal:this.isLegal,			//是否法人
			linkJob:this.linkJob,			//联系人职位
			linkIdcard:this.linkIdcard,		//联系人身份证
			licenceNum:this.licenceNum,		//营业执照号
			companyType:this.companyType,	//公司类型
			registerCapital:this.registerCapital?this.registerCapital*10000:null,	//注册资金
			foundTime:this.foundTime,
			companyAddress:companyAddress,

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
		console.log("生成一个不重复的随机数",index);
		// console.log(this.originalArray);
		return index+1
	}


	//下拉
	inputSelect(type:string):Promise<any>{
		return this.applyAuth
			.getDictListData(type)

	}

	//获取地址下拉列表
	//省
	provinceSelect(){
		this.applyAuth.getAddress({
			parentCode:0,
			level:1
		}).then(res=>{
			this.provinceList=res.body.records
		})
		.catch(res=>{
				this.pop.error({
					title:'错误信息',
					text:res.message
				})
			})
	}

	getCityList(v){
		console.log(v);
		//获取省code
		this.applyAuth.getAddress({
			parentCode:0,
			level:1,
			name:this.province
		}).then(res=>{
			return Promise.resolve(res.body.records[0].code)
		}).then(res=>{
			this.applyAuth.getAddress({
				parentCode:res,
				level:2
			}).then(res=>{
				if (v=="1") {
					this.city=""
					console.log("fffffffffff")
				}

				this.cityList=res.body.records
			}).catch(res=>{
				this.pop.error({
					title:'错误信息',
					text:res.message
				})
			})

		})
	}

	change(){
		if(this.guestFrom!=1){
			this.app_list=this.app_list_temp
			this.appId='C00001'
		}else{
			this.appId='undefined'
			this.app_list=this.arrayCopy(this.app_list)
		}
	}

	arrayCopy(str:Array<any>):Array<any>{
		let app_array:Array<Resource>=new Array(str.length-1)
		let add:boolean=false
		let resource:Resource
		 for(let i=0;i<app_array.length;i++){
		 	if(str[i].resourceId=='C00001'){
				add=true
			}
		 	if(add){
		 		resource=new Resource(str[i+1].resourceId,str[i+1].resourceName)
		 	}else{
		 		resource=new Resource(str[i].resourceId,str[i].resourceName)
		 	}
		 	app_array[i]=resource
		}
		return app_array
	}


}

class Resource {
	resourceId:number
	resourceName:string
	constructor(resourceId:number,resourceName:string) {
		this.resourceId=resourceId
		this.resourceName=resourceName
	}
}
