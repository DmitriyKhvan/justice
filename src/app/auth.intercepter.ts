import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthIntercepter implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    debugger;
    console.log('reqqq', req.url.match(/refreshToken/));
    if (!req.url.match(/refreshToken/)) {
      this.auth.fetchWithAuth();
    }

    if (this.auth.isAuthenticated()) {
      req = req.clone({
        headers: req.headers.append('Auth', JSON.stringify(this.auth.token)),
      });
    }

    // req = req.clone({
    //   headers: req.headers.append('Auth', this.auth.token),
    // });

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('[Intercepter Error]: ', error);
        if (error.status === 403) {
          this.auth.logout();
          this.router.navigate(['/login'], {
            queryParams: {
              authFailed: true,
            },
          });
        }

        return throwError(error);
      })
    );
  }
}
