import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router'
import { PopService } from 'dolphinng'
import { SpreadManageDetailService,SendData } from './spread-manage-detail.service'
import { textDef } from '@angular/core/src/view/text';

@Component({
	selector:'spread-manage-detail',
	templateUrl:'./spread-manage-detail.component.html',
	styleUrls:['./spread-manage-detail.component.less'],
	providers:[SpreadManageDetailService]
})
export class SpreadManageDetailComponent implements OnInit{
    loading:boolean
    isCheck:boolean
    down:boolean=false

    rolloverApplyId			//展期单号
	createTime				//创建时间
	status					//状态
    statusName				//状态，中文
    memberId                //会员ID
	companyName				//企业名称
	rolloverDate			//承诺还款日期
	repaymentCapital 	 	//展期金额	
	repaymentInterest		//本期利息
	rolloverDeposit			//展期保证金
	rolloverRate			//展期利率，百分比
    remarks					//申请理由

    currentPeriod	        //还款期数
	currentPeriodStr		//还款期数，中文
	fileLoadId				//文件提取码
	auditOneBy				//一审人
    auditOneRemarks			//一审意见
    auditOneTime			//一审时间
 
    auditTwoTime	             //二审时间
    auditTwoeBy	                 //二审员
    auditTwoRemarks              //二审意见
    comfirmRolloverDate	         //批准还款日期
    realRolloverDate	         //实际还款日期 



    borrowApplyId			//贷款单号
	approveAmount			//贷款金额
	productId				//产品ID
	productName				//产品名称
	ratedCycle				//贷款周期
	paymentWay				//还款方式
	paymentWayDic			//还款方式，中文
	rate					//利率
	rateType				//计息方式
	rateTypeDic				//计息方式，中文

    rolloverData:{               //展期数据
        rolloverApplyId?
        createTime?
        status?
        statusName?
        memberId?
        companyName?
        rolloverDate?
        repaymentCapital?
        repaymentInterest?
        rolloverDeposit?
        rolloverRate?
        remarks?
        currentPeriod?
        currentPeriodStr?
        fileLoadId?
        auditOneBy?
        auditOneRemarks?
        auditOneTime?
        
        resourceId?
        borrowApplyId?
        auditTwoTime?
        auditTwoeBy?
        auditTwoRemarks?
    }={}     
                              
    financeData:{                //借款单数据
        borrowApplyId?
        approveAmount?
        productId?
        productName?
        ratedCycle?
        paymentWay?
        paymentWayDic?
        rate?
        rateType?
        rateTypeDic?

        resourceId?
    }={}

    productData:{                //产品参数数据
        paymentWayName?
        interestValue?
        interestTypeName?
    }={}

    repaymentList:any[]          //还款计划数据

    submitting: boolean = false
    constructor(
		private pop:PopService,
		private router:Router,
		private route:ActivatedRoute,
		private spreadManage:SpreadManageDetailService
		){}
	ngOnInit(){
        this.rolloverApplyId=this.route.params['value']['id']
        this.getDetail(this.rolloverApplyId)
        if (this.route.queryParams['value']['isCheck']) {
			this.isCheck = this.route.queryParams['value']['isCheck']
		} else {
			this.isCheck = false
		}
    }

    getDetail(id:string){
        this.spreadManage.getRolloverDetail(id)
        .then(res=>{
            console.log(res)
            this.rolloverData=res.body
            return Promise.resolve(res.body)
        })
        .then(res=>{
            this.spreadManage.getfinanceApply(res.borrowApplyId)
            .then(res=>{
                console.log(res)
                this.financeData=res.body.records[0]
                return Promise.resolve(res.body.records[0])
            })
            .then(res=>{
                this.spreadManage.getProductsAttach(res.resourceId,res.productId,res.repaymentWay)
                .then(res=>{
                    console.log(res)
                    this.productData=res.body.records
                    return Promise.resolve(res.body.records)
                })
                .then(res=>{
                    this.spreadManage.getRepaymentPlan(this.financeData.borrowApplyId)
                    .then(res=>{
                        console.log(res)
                        this.repaymentList=res.body.records
                    })
                    .catch(res=>{
                        this.pop.error({
                                title:'错误信息',
                            text:res.message
                        })
                    })  
                })
            })
        })
    }

    submitConfirm(param: number) {
		let str:string
		if(param==2){
			str='通过'
		}else{
			str='拒绝'
		}
		this.pop.confirm({
			title: '操作确认',
			text: '确认 '+str+' 审批申请吗？'
		}).onConfirm(() => {
			this.submit(param)
		})

    }
    
    submit(param: number){
        this.submitting=true
        let queryData:SendData={
            rolloverApplyId:this.rolloverApplyId,
            remarks:this.remarks,
            status:param,
            auditOneRemarks:this.auditOneRemarks
        }
        this.spreadManage.saveRollover(queryData)
        .then(res => {
            this.submitting=false
            console.log(res)
            this.pop.info({
                title: '提示信息',
                text: '处理成功'
            })
            // this.router.navigate(['/financingM/spreadManage/detail'],this.rolloverApplyId)
        })
        .catch(res => {
            this.pop.error({
                title: '错误提示',
                text: res.message
            })
            this.submitting=false
        })
    }


    back(){
		window.history.back()
	}
}