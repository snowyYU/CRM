import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { PopService } from 'dolphinng'
import { DetailService } from './detail.service'
import { DateService } from '../../../../services/date/date.service'
import { config } from '../../../../../protractor.conf';

@Component({
	moduleId: module.id,
	selector:'detail',
	templateUrl:'./detail.component.html',
	styleUrls:['detail.component.less'],
	providers:[DetailService,DateService]
})

export class LoanTrackComponent implements OnInit {

	constructor(
		private router:Router,
		private pop:PopService,
		private detail:DetailService,
		private dateService:DateService
		) {}

	ngOnInit() {
        
	}
}