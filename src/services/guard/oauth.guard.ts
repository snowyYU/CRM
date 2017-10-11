import {Injectable} from '@angular/core';
import { AuthRoleService } from '../authRole/authRole.service';
import {Toaster} from 'dolphinng';
import {PopService} from 'dolphinng';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class OauthGuard implements CanActivate {
  constructor(private oauth: AuthRoleService,
              private toaster: Toaster,
              private pop: PopService,
              private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>| boolean|Promise<boolean> {
    let canActivate = true;
    let data= route.routeConfig.data
    if (typeof data === 'object') {
      if ((data['fnIn'] instanceof Array) || (typeof data['fnIn'] === 'string')) {
        canActivate = this.oauth.fnIn(data['fnIn']);
      } else if ((data['fnRequire'] instanceof Array) || (typeof data['fnRequire'] === 'string')) {
        canActivate = this.oauth.fnRequire(data['fnRequire']);
      }
    }
    if (!canActivate) {
      this.pop.error({text: '您没有进入该页面的权限！'})
        .onConfirm(()=> {
          history.back();
        })
        .onClose(()=> {
          history.back();
        });
    }
    return canActivate;
  }
}
