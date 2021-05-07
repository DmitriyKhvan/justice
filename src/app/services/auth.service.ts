import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { AuthResponse, User } from "../interfaces";

@Injectable({providedIn: 'root'})

export class AuthService {
  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {}

  get token(): string {
    return ""
  }

  login(user: User): Observable<any> {
    return this.http.post('', user).pipe(tap(), catchError(this.handleError.bind(this)))
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error)
  }

  isAuthenticated() {
    return true
  }

  logout() {
    this.setToken(null)
  }

  setToken(response: AuthResponse | null) {
    if (response) {
      // localStorage.setItem('tokenId', response.tokenId) 
      // localStorage.setItem('tokenExp', response.expDate) 
    } else {
      localStorage.clear()
    }
  }
}