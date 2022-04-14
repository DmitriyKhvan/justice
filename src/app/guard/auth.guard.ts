import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(
    protected router: Router,
    protected keycloakAngular: KeycloakService
  ) {
    super(router, keycloakAngular);
  }

  public isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let permission;
      console.log('this.authenticated', this.authenticated);
      if (!this.authenticated) {
        this.keycloakAngular
          .login()
          .catch((e) => console.error('token is finished!!!', e));
        return reject(false);
      }

      const requiredRoles: string[] = route.data.roles;
      // console.log('requiredRoles', requiredRoles);
      // console.log('this.roles', this.roles);

      if (!requiredRoles || requiredRoles.length === 0) {
        permission = true;
      } else {
        if (!this.roles || this.roles.length === 0) {
          permission = false;
        }
        if (requiredRoles.some((role) => this.roles.indexOf(role) > -1)) {
          permission = true;
        } else {
          permission = false;
        }
      }
      if (!permission) {
        if (this.keycloakAngular.isUserInRole('admin')) {
          this.router.navigate(['/admin/listUser']);
        } else if (this.keycloakAngular.isUserInRole('monitoring')) {
          this.router.navigate(['/monitoring']);
        } else {
          this.router.navigate(['/']);
        }
      }

      resolve(permission);
      // resolve(true);
    });
  }
}
