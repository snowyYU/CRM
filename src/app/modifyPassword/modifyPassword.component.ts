import {Component} from '@angular/core';
import { AuthRoleService } from '../../services/authRole/authRole.service';
import {ModifyPasswordService} from './modifyPassword.service';
import {PopService} from 'dolphinng';
@Component({
  selector: 'modify-password',
  templateUrl: './modifyPassword.component.html',
  styleUrls: ['./modifyPassword.component.less'],
  providers: [ModifyPasswordService,PopService]
})
export class ModifyPasswordComponent {

  employeeId:string='';
  oldPassword:string=''
  newPassword:string='';
  newPasswordCopy:string='';

  submitted:boolean=false;
  constructor(
    private oauth: AuthRoleService,
    private pop: PopService,
    private modifyPWSvc: ModifyPasswordService
  ) {
    console.log(this.oauth.employeeId);
    this.employeeId=this.oauth.employeeId;
  }

  submit(){
    this.submitted=true;
    let body={
      employeeId:this.employeeId,
      pwd:this.newPassword,
      oldPwd:this.oldPassword,
      type:1
    };
    console.log(body);
    this.modifyPWSvc.setPassword(body)
      .then((res)=>{
        this.submitted=false;
        
          this.pop.info({text:'修改成功！'})
            .onConfirm(()=>{
              history.back();
            }).onClose(()=>{
            history.back();
          });
        
          // this.pop.error({text:res.message||'修改密码失败！'});
        
      })
      .catch((res)=>{
        this.submitted=false;
        this.pop.error({text:res.message});
      })
  }

}
