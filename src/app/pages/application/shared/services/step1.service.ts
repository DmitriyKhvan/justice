import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class Step1Service {
  constructor(private http: HttpClient) {}

  submit(): Observable<any> {
    // return throwError({ error: { status: 403 } });
    return this.http
      .get(`${environment.dbUrl}/user/users`)
      .pipe(tap(this.testFn));
  }

  testFn() {
    debugger;
    console.log('testFn');
  }
}
