import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class Step1Service {
  constructor(public http: HttpClient, public auth: AuthService) {}

  submit(): Observable<any> {
    // return throwError({ error: { status: 403 } });
    // return this.http
    //   .get(`${environment.dbUrl}/user/users`)
    //   .pipe(tap(this.testFn));

    return this.auth
      .fetchWithAuth(this.http.get(`${environment.dbUrl}/user/users`))
      .pipe(
        tap(this.testFn),
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  testFn() {}
}
