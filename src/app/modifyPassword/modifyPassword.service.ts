import {Injectable} from '@angular/core';
import { MyHttp} from 'services/myHttp/myhttp.service';
import { API} from 'services/config/app.config';
@Injectable()
export class ModifyPasswordService{
  constructor(private myHttp:MyHttp){

  }

  setPassword(body:{
    employeeId:string,
    pwd:string,
    type:number|string
  }):Promise<{ok:boolean,message:string}>{
    return this.myHttp.post({
      url:API.loginHost+API.setPassword.url,
      body:body
    }).toPromise()
      .then((res)=>{
        let data={
          ok:false,
          message:''
        };
        if(res.ok){
          let response=res.json();
          data.ok=(response.status==200);
          data.message=response.message;
        }
        return Promise.resolve(data);
      });
  }
}
