import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { PopService } from 'dolphinng'
import { VistReportService } from './visit-report.service';
import { DateService } from '../../../services/date/date.service';
import { AuthRoleService } from '../../../services/authRole/authRole.service'
import { SendData } from './sendDate'

@Component({
	selector:'customer-list',
	templateUrl:'./visit-report.component.html',
	styleUrls:['./visit-report.component.less'],
	providers:[VistReportService,DateService]
})
export class VisitReportComponent implements OnInit{
	dateStart:string='';
	dateEnd:string='';
	pastMonthNum:number=1;
	monthSelectBtn:number=1;
	dateList:any;       

	serviceMan:string=''
	serviceManL:any[]
	customerName
	//是否正在加载
	loading:boolean;
	submitAfterClick:boolean=false;
	submitting:boolean=false;
	//总数
	count:number;
	page:number=0;
	rows:number=10;

	//分页参数


	constructor(
				private router:Router,
				private pop:PopService,
				private vistReportService:VistReportService,
				private dateService:DateService,
				public authRole:AuthRoleService

		){
		
	}
	ngOnInit(){
		this.getManages()
		this.setVistDate(1);
		this.loading=true;
		this.queryData();
	}

	//获取服务经理列表
	getManages(){
		this.vistReportService.getManageL()
			.then(res=>{
				console.log(res)
				res.body.unshift({employeeName:''})

				this.serviceManL=res.body
			})
			.catch(res=>{
				this.pop.error({
					title:'错误信息',
					text:res.message
				})
			})
	}

	setVistDate(pastMonthNum:number){
		this.dateEnd=this.dateService.format({
			date:this.dateService.todayDate(),
			formatType:'yyyy-MM-dd'
		});
		let pastMonthDate=this.dateService.lastMountMonth({
			date:this.dateService.todayDate(),
			num:pastMonthNum
		});
		this.dateStart=this.dateService.format({
			date:pastMonthDate,
			formatType:'yyyy-MM-dd'
		})
	}

	monthSelect(num:number){
		this.submitAfterClick=false;
		this.monthSelectBtn=num;
		this.setVistDate(num);
	}

	queryData(){
		this.submitting=true;
		console.log(this.serviceMan)
		let data:SendData={
			startDate:this.dateStart,
			endDate:this.dateEnd,
			page :this.page+1,
			rows:this.rows,
			serviceMan:this.serviceMan,
			keyword:this.customerName
		}
		console.log(data)
		this.vistReportService.getList(data).then(res=>{
			this.submitting=false;
			this.handleData(res);
		})
	}

	handleData(res){
		
		console.log(res);
		
			
			// code...
			this.loading=false;
			this.count=res.count;
			this.dateList=res.records
		
	}

	serach(){
		this.page=0;
		
		this.submitAfterClick=true;
		this.queryData();
	}

	// dateStartChange(date){
	// 	console.log(this.dateStart);
	// }

	detail(info){
		console.log(info);
		this.router.navigate(['business/visitReport/detail',info.timetableId])
	}

	edit(info){
		this.router.navigate(['business/visitReport/edit',info.timetableId])
	}

	add(){
		this.router.navigate(['business/visitReport/add']);
	}

}