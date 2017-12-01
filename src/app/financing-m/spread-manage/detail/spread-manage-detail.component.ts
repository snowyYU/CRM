import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router'
import { PopService } from 'dolphinng'
import { SpreadManageDetailService,SendData } from './spread-manage-detail.service'
import { SessionStorageService } from '../../../../services/session-storage/session-storage.service';
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
    submitting:boolean=false
    down:boolean=false
    show:boolean=false

    rolloverApplyId			//展期单号
	createTime				//创建时间
	status					//状态
    statusName				//状态，中文
    
    memberId                //会员ID
    companyName				//企业名称
    repaymentCapital 	 	//展期金额
    rolloverDeposit			//展期保证金
    repaymentInterest		//本期利息
    rolloverRate			//展期利率，百分比
    rolloverDate			//承诺还款日期
    comfirmRolloverDate	    //批准还款日期

    remarks					//申请理由
    
    borrowApplyId			//贷款单号
    currentPeriod	        //还款期数
    currentPeriodStr		//还款期数，中文
    
    fileLoadId				//文件提取码
    
	auditOneBy				//一审人
    auditOneRemarks			//一审意见
    auditOneTime			//一审时间
 
    auditTwoTime	        //二审时间
    auditTwoBy	            //二审员
    auditTwoRemarks         //二审意见

	approveAmount			//贷款金额
	productId				//产品ID
	productName				//产品名称
	ratedCycle				//贷款周期
	paymentWay				//还款方式
	paymentWayDic			//还款方式，中文
	rate					//利率
	rateType				//计息方式
    rateTypeDic				//计息方式，中文
    
	repaymentDate			//到期还款日

    rolloverData:{          //展期数据
        rolloverApplyId?
        createTime?
        status?
        statusName?
        memberId?
        companyName?
        repaymentCapital?
        rolloverDeposit?
        repaymentInterest?
        rolloverRate?
        rolloverDate?
        comfirmRolloverDate?
        remarks?
        borrowApplyId?
        currentPeriod?
        currentPeriodStr?
        fileLoadId?
        auditOneBy?
        auditOneRemarks?
        auditOneTime?
        auditTwoTime?
        auditTwoeBy?
        auditTwoRemarks?
    }={}     
                              
    financeData:{          //借款单数据
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
    }={}

    repaymentList:any[]     //还款计划数据

    //用于记录提交申请前的页面
	memberDetailDomain

    constructor(
		private pop:PopService,
		private router:Router,
		private route:ActivatedRoute,
        private spreadManage:SpreadManageDetailService,
        private sessionStorage:SessionStorageService
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
                this.spreadManage.getRepaymentPlan(res.borrowApplyId)
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
            // remarks:this.remarks,
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
            this.sessionStorage.memberDetailDomain='financingM/spreadManage'
            this.isCheck=false
            this.router.navigate(['financingM/spreadManage/detail',this.rolloverApplyId])
            this.getDetail(this.rolloverApplyId)
        })
        .catch(res => {
            this.pop.error({
                title: '错误提示',
                text: res.message
            })
            this.submitting=false
        })
    }

    downEvent(){
        this.show=true;
        setTimeout(()=>{this.down=true},300);
    }

    upEvent(){
        this.show=false;
        setTimeout(()=>{this.down=false},300);
    }

    back(){
		console.log(this.sessionStorage.memberDetailDomain)
		if(!!this.sessionStorage.memberDetailDomain){
			this.memberDetailDomain=this.sessionStorage.memberDetailDomain
			this.sessionStorage.deleteItem('memberDetailDomain')
			this.router.navigate([this.memberDetailDomain])
		}else{
			window.history.back()
		}
	}
}