import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  private helper = new JwtHelperService();
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isAuthenticated()) {
      const decodedToken = this.helper.decodeToken(
        JSON.parse(localStorage.getItem('tokenData') + '').access_token
      );

      if (this.auth.currentUser.roles.includes(3)) {
        this.auth.setUserExp(decodedToken.user.user_exp);
        return true;
      } else {
        this.router.navigate(['/login'], {
          queryParams: {
            noRights: true,
          },
        });

        return false;
      }
    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          noRights: true,
        },
      });
      return false;
    }
  }
}
