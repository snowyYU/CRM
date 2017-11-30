import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute,ParamMap } from '@angular/router'
import { PopService } from 'dolphinng'
import { SpreadManageService,SendData } from './spread-manage.service'

@Component({
	selector:'spread-manage',
	templateUrl:'./spread-manage.component.html',
	styleUrls:['./spread-manage.component.less'],
	providers:[SpreadManageService]
})
export class SpreadManageComponent implements OnInit{
    loading:boolean

    rolloverApplyId              //展期单号
    companyName                  //会员名称
    borrowApplyId                //贷款单号
    repaymentAmount              //展期金额(元)
    currentPeriod                //还款期数
    currentPeriodStr             //还款期数，中文
    createTime                   //申请日期
    status                       //状态
    statusName                   //状态,中文
    rolloverStartDate            //展期开始日期

    rows:number=10
	page:number=0
    count:number
    
    qryStatus=1                     //请求状态
    keyWord                         //请求关键字

    dictList:any[]
    dataList:any[]



    thisPageRoute:string='financingM/spreadManage'
    constructor(
		private pop:PopService,
		private router:Router,
		private route:ActivatedRoute,
		private spreadManage:SpreadManageService
		){}
	ngOnInit(){
        this.getStatusList()
        this.subscribeRouteParams()
    }
    
    //11.14,新增两个方法，
	//路由中的参数和获取列表的请求参数是否要一样呢
	//有些时候是一样的，有时候又不是，不过目前系统中是一样的
	//规范化，1.从组件的service中导入查询条件的interface。2.组件内部定义路由的参数结构，两者不一定相同
	//必传参数在声明时必须初始化
	subscribeRouteParams(){
		this.route.paramMap.subscribe((paramMap:ParamMap)=>{
			console.log(paramMap)
			console.log(paramMap['params']['rows'])
			console.log(!!paramMap['params'])
	
		    paramMap['params']['rows']?this.rows=parseInt(paramMap['params']['rows']):null
            paramMap['params']['page']?this.page=parseInt(paramMap['params']['page']):null
            paramMap['params']['qryStatus']?this.qryStatus=paramMap['params']['qryStatus']:null
			paramMap['params']['keyWord']?this.keyWord=paramMap['params']['keyWord']:null

			this.getDataList()
		})
	}

	navigate(){
		let routeParam:{
			page,
            rows,
            qryStatus?,
            keyWord?
		}={
			page:this.page,
            rows:this.rows,
        }
        
        if(this.qryStatus){
            routeParam.qryStatus=this.qryStatus
        }
        
        if(this.keyWord){
            routeParam.keyWord=this.keyWord
        }

		console.log("router",this.router)
		console.log("activerouter",this.route)
		this.router.navigate([this.thisPageRoute,routeParam])
    }

    getStatusList(){
        this.spreadManage.getStatusList()
        .then(res=>{
            this.loading=false
            console.log(res)
            this.dictList=res.body.records
        })
        .catch(res=>{
            this.pop.error({
                title:'错误提示',
                text:res.message
            })
        })
    }
    
    getDataList(){
		this.loading=true
		let sendData:SendData={
			rows:this.rows,
            page:this.page+1,
            status:this.qryStatus,                  //请求状态
            companyName:this.keyWord,           //会员名称（支持模糊模糊匹配）
		}
		this.spreadManage.getDataList(sendData)
			.then(res=>{
                this.handleData(res)
			})
			.catch(res=>{
				this.pop.error({
					title:'错误提示',
					text:res.message
				})
			})
    }
    
    handleData(res){
        console.log(res)
        this.loading=false
        this.dataList=res.body.records
        this.count=res.body.paginator.totalCount
        // this.format(this.dataList)
    }

    //展期开始日期格式化（由于展期是从第二天开始计算，所以展期开始日期需要加一天）
    // format(dataList:any[]){
    //     let temp:any
    //     let dataString:any
    //     let repaymentDate:string
    //     let dataTimeArray:any[]
    //     if(dataList&&dataList.length>0){
    //         for(let i=0;i<dataList.length;i++){
    //             dataTimeArray=dataList[i].repaymentDate.split(" ")
    //             dataString=new Date(dataTimeArray[0]);
    //             dataString.setDate(dataString.getDate()+1)
    //             repaymentDate=dataString.getFullYear()+'-'+(dataString.getMonth()<10?('0'+dataString.getMonth()):dataString.getMonth())+'-'+(dataString.getDate()<10?('0'+dataString.getDate()):dataString.getDate())
    //             dataList[i].repaymentDate=repaymentDate+' '+dataTimeArray[1]
    //         }
    //     }
    // }

	//审批
	check(row){
		this.router.navigate(['financingM/spreadManage/detail',row.rolloverApplyId],{queryParams: {isCheck:true}})
    }
    
    //详情
    detail(row){
        this.router.navigate(['financingM/spreadManage/detail',row.rolloverApplyId])
    }
}