import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';
import { PopService } from 'dolphinng';
import { MemberManageService,SendData } from './member-manage.service'
import { AuthRoleService } from '../../../services/authRole/authRole.service'
import { SessionStorageService } from '../../../services/session-storage/session-storage.service'

@Component({
	selector:'member-manage',
	templateUrl:'./member-manage.component.html',
	styleUrls:['./member-manage.component.less'],
	providers:[MemberManageService]
})
export class MemberManageComponent implements OnInit{

	loading:boolean
	dataList:any
	appId:string=''
	appIdList:any
	memberType:string=''
	memberTypeList:any
	memberName:string

	//分页参数
	page:number=0
	rows:number=10
	count:number

	//模态框
	vipMangeModal:boolean
	modalDataList:any
	modalListLoading:boolean
	modalSize:string='lg'

	totalCreditValue:number
	totalCreditBanlance:number
	//传往申请授信页面的数据
	companyName:string  	//会员名称
	memberId:number	 	//会员ID
	sAppId:number			//

	productTypeName:string				//产品类别
	productId:number
	productName:string				//申请产品
	creditValue:number//原授信额度
	//原有效期
	expiryDateBegin:string//起
	expiryDateEnd:string//止

	
	changeManageModal:boolean=false
	modalMemberId
	modalMemberName
	modalServiceManL:any[]=[]
	modalServiceMan
	modalServiceManO
	modalAppName

	//授信额度模态框的服务经理
	modalApplyServiceMan

	thisPageRoute:string='memberM/memberManage'

	//用于记录提交申请前的页面
	memberDetailDomain

	constructor(
		private router:Router,
		private route:ActivatedRoute,
		private pop:PopService,
		private memManage:MemberManageService,
		public authRole:AuthRoleService,
		private sessionStorage:SessionStorageService
		){
		this.getAppIdList()
		this.getMemberTypeList()
	}

	ngOnInit(){
		this.subscribeRouteParams()
		// this.getListData()
	}

	//11.14,新增两个方法，
	//路由中的参数和获取列表的请求参数是否要一样呢
	//有些时候是一样的，有时候又不是，不过目前系统中是一样的
	//规范化，1.从组件的service中导入查询条件的interface。2.组件内部定义路由的参数结构，两者不一定相同
	//必传参数在声明时必须初始化
	subscribeRouteParams(){
		this.route.paramMap.subscribe((paramMap:ParamMap)=>{

			paramMap['params']['rows']?this.rows=parseInt(paramMap['params']['rows']):null
			paramMap['params']['page']?this.page=parseInt(paramMap['params']['page']):null
			paramMap['params']['appId']?this.appId=paramMap['params']['appId']:null
			paramMap['params']['memberType']?this.memberType=paramMap['params']['memberType']:null
			paramMap['params']['keyword']?this.memberName=paramMap['params']['keyword']:null

			this.getListData()
		})
	}

	navigate(){
		let routeParam:{
			page,
			rows,
			appId?,
			memberType?,
			keyword?
		}={
			page:this.page,
			rows:this.rows,
		}

		if(this.appId){
			routeParam.appId=this.appId
		}

		if(this.memberType){
			routeParam.memberType=this.memberType
		}

		if(this.memberName){
			routeParam.keyword=this.memberName
		}

		this.router.navigate([this.thisPageRoute,routeParam])


	}

	//获取归属渠道下拉列表数据
	getAppIdList(){
		this.memManage
			.getAllApp()
			.then(res=>{
				this.appIdList=res.body.records
			})
			.catch(res=>{
				this.pop.error({
					title:'错误提示',
					text:res.message
				})
			})
	}
	//获取类别下拉列表数据
	getMemberTypeList(){
		this.memManage
			.getMemberType()
			.then(res=>{
				this.memberTypeList=res.body.records
			})
			.catch(res=>{
				this.pop.error({
					title:'错误提示',
					text:res.message
				})
			})
	}
	//获取列表数据
	getListData(){
		this.loading=true 
		let sendData:SendData={
			companyName:this.memberName,
			appId:this.appId,
			memberType:this.memberType,
			page:this.page+1,
			rows:this.rows,
		}
		this.memManage
			.getListData(sendData)
			.then(res=>{
				this.loading=false
				this.handleListData(res)
			})
			.catch(res=>{
				this.pop.error({
					title:'错误提示',
					text:res.message
				})
			})

	}
	//点击授信额度
	mount(row){

	}
	//渲染列表函数
	handleListData(res){
		this.dataList=res.body.records
		this.count=res.body.paginator.totalCount
	}

	//模态框部分的函数

	/**
	 * 关闭函数
	 */
	closeModal(){
		this.vipMangeModal=false
		this.changeManageModal=false

	}

	isEmptyObject(object:object){
		for(let o in object){
			return false
		}
		return true
	}

	detail(row){
		this.sessionStorage.memberDetailDomain=this.thisPageRoute
		this.router.navigate(['memberM/memberManage/detail',row.memberId])
	}
	/**
	 * 获取模态框列表数据
	 */
	getModalList(row:any){
		//为参数赋值
		this.memberId=row.memberId
		this.companyName=row.companyName
		this.sAppId=row.appId
		this.modalApplyServiceMan=row.serviceMan
		this.memManage
			.getModalData(row.memberId)
			.then(res=>{
				if (res.body.records[0].creditFacility) {
					// 模态框出现
					this.vipMangeModal=true
					this.totalCreditValue=res.body.totalCreditValue
					this.totalCreditBanlance=res.body.totalCreditBanlance
					this.modalDataList=res.body.records
				}else{
					if (this.authRole.roleIn(['008','002'])&&this.authRole.userName!=row.serviceMan) {
						this.pop.info({
							title:'提示信息',
							text:'会员无产品授信记录'
						})
						return
					}
					//检查
					this.memManage.checkApplyExist(row.memberId)
						.then(res=>{
							this.goToNew()
						})
						.catch(res=>{
							this.pop.error({
								title:"提示信息",
								text:res.message
							})
						})

					
				}
			})
			.catch(res=>{
				this.pop.error({
					title:'错误提示',
					text:res.message
				})
			})
	}

	// checkApplyExist(row){
	// 	//为传到申请授信页面的参数赋值
	// 	this.productTypeName=row.creditFacility.productTypeName				//产品类别
	// 	this.productName=row.creditFacility.productName				//申请产品
	// 	this.productId=row.creditFacility.productId
	// 	this.creditValue=row.creditFacility.creditValue//原授信额度
	// 	//原有效期
	// 	this.expiryDateBegin=row.creditFacility.expiryDateBegin//起
	// 	this.expiryDateEnd=row.creditFacility.expiryDateEnd//止


	// 	this.memManage.checkApplyExist(row.memberId)
	// 		.then(res=>{
	// 			console.log(res)
	// 			this.goToRe()
	// 		})
	// 		.catch(res=>{
	// 			this.pop.error({
	// 				title:'错误提示',
	// 				text:res.message
	// 			})
	// 		})
	// }

	reCredit(){
		//新增一个校验
		this.memManage.checkApplyExist(this.memberId)
			.then(res=>{
				this.goToRe()
			})
			.catch(res=>{
				this.pop.error({
					title:'错误提示',
					text:res.message
				})
			})
	}

	goToNew(){
		//序列化json字符
		let toNewData={
			memberId:this.memberId,
			companyName:this.companyName,
			appId:this.sAppId,
			serviceMan:this.modalApplyServiceMan
		}
		this.closeModal();
		setTimeout(e=>{
			this.router.navigate(['memberM/memberManage/newApply',JSON.stringify(toNewData)])

		},0)

	}
	goToRe(){

		


		let toReData={
			memberId:this.memberId,
			companyName:this.companyName,
			appId:this.sAppId,
			serviceMan:this.modalApplyServiceMan
			// productTypeName:this.productTypeName,				//产品类别
			// productId:this.productId,
			// productName:this.productName,				//申请产品
			// creditValue:this.creditValue,//原授信额度
			// //原有效期
			// expiryDateBegin:this.expiryDateBegin,//起
			// expiryDateEnd:this.expiryDateEnd,//止

		}
		this.closeModal()
		setTimeout(e=>{
			this.router.navigate(['memberM/memberManage/reApply',JSON.stringify(toReData)])
		},0)
	}

	changeManage(row){
		this.modalServiceManL=[]
		this.changeManageModal=true
		this.modalMemberId=row.memberId
		this.modalMemberName=row.companyName
		this.modalServiceManO=row.serviceMan
		this.modalAppName=row.prmResourceRegister?row.prmResourceRegister.resourceName:""
		
		this.memManage.getManageL()
			.then(res=>{

				res.body.records.forEach(e=>{
					if (row.serviceMan!=e.employeeName) {
						this.modalServiceManL.push(e)
					}
					
				})

			})
			.catch(res=>{
				this.pop.error({
					title:'错误信息',
					text:res.message
				})
			})

	}

	submit(){
		this.memManage.changeServiceMan(this.modalMemberId,this.modalServiceMan)
			.then(res=>{
				this.pop.info({
					title:'提示信息',
					text:'更改成功！'
				})
				this.changeManageModal=false
				this.getListData()


			})
			.catch(res=>{
				this.pop.error({
					title:'错误信息',
					text:res.message
				})
			})
	}



	
}