import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router'
import { PopService } from 'dolphinng'
import { GetReportService,SendData } from './get-report.service'

@Component({
	selector:'get-report',
	templateUrl:'./get-report.component.html',
	styleUrls:['./get-report.component.less']
})

export class GetReportComponent implements OnInit {
    reportData:any[]           //报告数据

    taskId:string              //任务ID
    reportId:string            //报告ID
    howtodo:number             //措施
    howtodoDic:string          //措施，中文
	actionTime:string          //执行时间
    status:number              //状态（1：在跟踪，2：结束）
    statusDic:string           //状态，中文
	nextwork:string            //下一步工作
	remark:string              //描述
	attchFile1:string          //附件1
    attchFile2:string          //附件2
    
    //用来触发提交时的遮罩
    submitting:boolean=false
    constructor(
        private router:Router,
        private route:ActivatedRoute,
		private pop:PopService,
		private getReport:GetReportService,
        ) {}

    ngOnInit() {}

    getOverdueReportDetails(){
        let data=JSON.parse(this.route.params['value']['data'])
		console.log(data)
		let queryData:SendData={
            taskId:data.taskId,
            reportId:data.reportId
        }
        this.getReport.getOverdueReportDetails(queryData)
        .then(res=>{
            this.handleData(res)
            // this.reportData=res.body.records
        })
        .catch(res=>{
            this.pop.error({
                title:'错误提示',
                text:res.message
            })
        })
    }

    handleData(res){
        this.taskId=res.body.taskId,
        this.reportId=res.body.reportId,
        this.howtodo=res.body.howtodo,
        this.howtodoDic=res.body.howtodoDic,
        this.actionTime=res.body.actionTime,
        this.status=res.body.status,
        this.statusDic=res.body.statusDic,
        this.nextwork=res.body.nextwork,
        this.remark=res.body.remark,
        this.attchFile1=res.body.attchFile1,
        this.attchFile2=res.body.attchFile2
    }

    submit(){
        //遮罩出现
		this.submitting=true
        let queryData:SendData={
            taskId:this.taskId,          //任务ID
            howtodo:this.howtodo,        //措施
            actionTime:this.actionTime,  //执行时间
            status:this.status,          //状态（1：在跟踪，2：结束）
            nextwork:this.nextwork,      //下一步工作
            remark:this.remark,          //描述
            attchFile1:this.attchFile1,  //附件1
            attchFile2:this.attchFile2   //附件2
        }
        this.getReport.saveData(queryData)
        .then(res=>{
            console.log(res)
            this.pop.info({
                title:'提示信息',
                text:res.message
            })
            this.submitting=false
            this.router.navigate(['financingM/getMission'])
        })
        .catch(res=>{
            this.pop.error({
                title:'错误提示',
                text:res.message
            })
            this.submitting=false
        })
    }

    back(){
        window.history.back()
    }
}