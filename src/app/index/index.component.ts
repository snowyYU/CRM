import { Component } from '@angular/core';
import { Router } from '@angular/router'
import  {SettingService}  from '../../services/setting/setting.service';
import  {AuthRoleService}  from '../../services/authRole/authRole.service';
@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less'],
  providers:[SettingService,AuthRoleService]
})
export class IndexComponent {
  setting:SettingService;
  role:string=this.authRoleService.role;
  userName:string=this.authRoleService.userName;
  constructor(
    private router:Router,
    private settingService:SettingService,
    private authRoleService:AuthRoleService
    ){
    this.setting=this.settingService.getSetting();
    // this.role=this.authRoleService.role;
  }
  

  toggleAsideFolded(){
    this.setting.asideFolded=!this.setting.asideFolded;
  }
  toggleOffScreen(){
    this.setting.offScreen=!this.setting.offScreen;
  }
  cancelOffScreen(){
    this.setting.offScreen=false
  }

  logOut(){
    this.authRoleService.deleteAllCookies()
    this.router.navigate(['signin'])
    
    console.log('done')
  }


}
