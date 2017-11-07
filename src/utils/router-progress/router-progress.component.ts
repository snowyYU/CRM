import { Component,
		 OnInit,
		 NgZone,
		 Renderer,
		 ElementRef,
		 ViewChild
		  } from '@angular/core';

import { Router,
		 Event as RouterEvent,
		 NavigationStart,
		 NavigationEnd,
		 NavigationCancel,
		 NavigationError
		 } from '@angular/router'

@Component({
	moduleId: module.id,
	selector: 'router-progress',
	templateUrl: './router-progress.component.html',
	styleUrls:['./router-progress.component.less']
})
export class RouterProgressComponent implements OnInit {
	constructor(
		private router:Router
		) {
		router.events.subscribe((event:RouterEvent)=>{
			this.navigationInterceptor(event)
		})
	}

	loading:boolean=true

	ngOnInit() {
		
	}

	navigationInterceptor(event:RouterEvent):void{
		if(event instanceof NavigationStart) {
			this.loading=true
		}
		if (event instanceof NavigationEnd) {
	      this.loading = false
	    }

	    // Set loading state to false in both of the below events to hide the spinner in case a request fails
	    if (event instanceof NavigationCancel) {
	      this.loading = false
	    }
	    if (event instanceof NavigationError) {
	      this.loading = false
	    }



	}


}