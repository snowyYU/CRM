import {Injectable} from '@angular/core';
import { AuthRoleService } from '../authRole/authRole.service';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class LoginGuard implements CanActivate{
  constructor(
    private auth:AuthRoleService,
    private router:Router
  ){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean>| boolean|Promise<boolean>{
    let isSigIn=this.auth.token;
    if(!isSigIn){
      this.router.navigate(['/signin']);
    }
    console.log(!!isSigIn)
     return !!isSigIn;
  }
}
