import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { AuthResponse, refreshTokenContent, User } from '../interfaces';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient, private router: Router) {}

  get token(): string | null {
    // const expDate = new Date(Number(localStorage.getItem('tokenExp')));
    // console.log('expDate', expDate);

    // if (new Date() > expDate && !!localStorage.getItem('tokenExp')) {
    //   debugger;
    //   // this.logout();
    //   // return '';
    // }
    return localStorage.getItem('tokenData');
  }

  login(user: User): Observable<any> {
    return this.http
      .post(`${environment.dbUrl}/user/login`, user)
      .pipe(tap(this.setToken), catchError(this.handleError.bind(this)));
  }

  private handleError(error: HttpErrorResponse): any {
    console.log('error', error);
    const { message } = error.error;
    switch (message) {
      case 'INVALID_LOGIN':
        this.error$.next('Неверный логин');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Неверный пароль');
        break;
      case 'Tokens not found':
        this.error$.next('Токен не найден');
        break;
    }

    // this.logout();
    // this.router.navigate(['/login']);

    return throwError(error);
  }

  isAuthenticated() {
    return !!this.token;
  }

  logout() {
    this.setToken(null);
  }

  private setToken(response: any) {
    if (response) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(response.access_token);

      // console.log('response', response);

      localStorage.setItem('tokenData', JSON.stringify(response));
      localStorage.setItem('tokenExp', JSON.stringify(decodedToken.exp * 1000));
    } else {
      localStorage.clear();
    }
  }

  refreshToken(tokenData: any): Observable<any> {
    debugger;
    this.logout();
    return this.http
      .post(`${environment.dbUrl}/user/refreshToken`, JSON.parse(tokenData))
      .pipe(
        tap(this.setToken)
        // catchError(this.handleError.bind(this))
      );
  }
}
