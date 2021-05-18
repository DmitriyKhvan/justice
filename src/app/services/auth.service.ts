import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HostListener, Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { AuthResponse, refreshTokenContent, User } from '../interfaces';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public error$: Subject<string> = new Subject<string>();
  private timer: any;
  private time: number = 1000 * 10;

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
      .pipe(
        tap(this.setToken.bind(this)),
        catchError(this.handleError.bind(this))
      );
  }

  private handleError(error: HttpErrorResponse) {
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
    // debugger;
    return !!this.token;
  }

  logout(): void {
    debugger;
    this.setToken(null);
    this.stopTimerLogout();
    this.router.navigate(['/login']);
  }

  private setToken(response: any) {
    if (response) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(response.access_token);
      //this.time = decodedToken.user.user_exp;

      console.log('decodedToken', decodedToken);

      localStorage.setItem('tokenData', JSON.stringify(response));
      localStorage.setItem('tokenExp', JSON.stringify(decodedToken.exp * 1000));
      this.startTimerLogout();
    } else {
      localStorage.clear();
    }
  }

  refreshToken(tokenData: any): Observable<any> {
    debugger;

    return this.http
      .post(`${environment.dbUrl}/user/refreshToken`, JSON.parse(tokenData))
      .pipe(
        shareReplay(),
        tap(this.setToken)
        // catchError(this.handleError.bind(this))
      );
  }

  fetchWithAuth(): void {
    const loginUrl = '/login';
    let tokenData = null;

    if (localStorage.getItem('tokenData')) {
      tokenData = localStorage.getItem('tokenData');

      const expDate = new Date(Number(localStorage.getItem('tokenExp')));
      console.log('expDate', expDate);
      if (new Date() > expDate) {
        debugger;
        this.refreshToken(localStorage.getItem('tokenData')).subscribe();
      }
    } else {
      this.router.navigate([loginUrl]);
    }
  }

  startTimerLogout() {
    console.log('time', this.time);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.logout(), this.time);
  }

  private stopTimerLogout() {
    clearTimeout(this.timer);
  }
}
