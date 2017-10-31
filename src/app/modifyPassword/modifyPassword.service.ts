import {Injectable} from '@angular/core';
import { MyHttp} from 'services/myHttp/myhttp.service';
import { API} from 'services/config/app.config';
import { MyHttpClient } from 'services/myHttp/myhttpClient.service'

@Injectable()
export class ModifyPasswordService{
  constructor(private myHttp:MyHttpClient){

  }

  setPassword(body:{
    employeeId:string,
    pwd:string,
    oldPwd:string,
    type:number|string
  }):Promise<any>{
    return this.myHttp.post({
      url:API.loginHost+API.setPassword.url,
      body:body
    }).toPromise()
      .then((res)=>{
        if (res.status==200) {
          return Promise.resolve(res)
        }else{
          return Promise.reject(res)
        }


        // let data={
        //   ok:false,
        //   message:''
        // };
        // if(res.ok){
        //   let response=res;
        //   data.ok=(response.status==200);
        //   data.message=response.message;
        // }
        // return Promise.resolve(data);
      });
  }
}
