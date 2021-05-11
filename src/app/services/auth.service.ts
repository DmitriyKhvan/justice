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

  get token(): string | null {
    const expDate = new Date(Number(localStorage.getItem('tokenExp')));
    console.log('expDate', expDate);

    if (new Date() > expDate) {
      this.logout();
      return '';
    }
    return localStorage.getItem('tokenExp');
  }

  login(user: User): Observable<any> {
    return this.http
      .post(`${environment.dbUrl}/user/login`, user)
      .pipe(tap(this.setToken), catchError(this.handleError.bind(this)));
  }

  private handleError(error: HttpErrorResponse) {
    console.log('error', error);

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
      const decodedToken = helper.decodeToken(
        response.access_token.access_token
      );

      console.log('response', response);

      localStorage.setItem('tokenId', response.access_token.refresh_token);
      localStorage.setItem('tokenExp', JSON.stringify(decodedToken.exp * 1000));
    } else {
      localStorage.clear();
    }
  }
}
