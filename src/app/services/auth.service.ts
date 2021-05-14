import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { AuthResponse, User } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {}

  get token(): string {
    const expDate = new Date(Number(localStorage.getItem('tokenExp')));
    // console.log('expDate', expDate);

    if (new Date() > expDate) {
      this.logout();
      return '';
    }
    return JSON.stringify(localStorage.getItem('tokenId'));
  }

  login(user: User): Observable<any> {
    return this.http
      .post(`${environment.dbUrl}/user/login`, user)
      .pipe(tap(this.setToken), catchError(this.handleError.bind(this)));
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
    }

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

      console.log('response', response);

      localStorage.setItem('tokenId', response.refresh_token);
      localStorage.setItem('tokenExp', JSON.stringify(decodedToken.exp * 1000));
    } else {
      localStorage.clear();
    }
  }
}
