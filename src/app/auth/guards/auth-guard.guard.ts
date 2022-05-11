import { Injectable } from '@angular/core';
<<<<<<< HEAD
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

=======
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
>>>>>>> origin/master
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {

  constructor(private tokenService: TokenService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
<<<<<<< HEAD
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
}
=======
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.tokenService.getToken()) {
      // User not authenticated properly
      this.tokenService.removeToken();
      this.router.navigate(['/login']);
      return false;
    }
    else {
      return true;
    }
  }
}
>>>>>>> origin/master
