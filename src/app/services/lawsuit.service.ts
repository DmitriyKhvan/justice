import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LawsuitService {
  stepName!: string;
  stepIndex!: number;

  constructor(public http: HttpClient, public auth: AuthService) {}

  notificationAdd(notificationData: any): Observable<any> {
    return this.auth.fetchWithAuth(
      this.http
        .post(`${environment.dbUrlBek}/notification/add`, notificationData)
        .pipe(
          catchError((error) => {
            console.log(error);
            return throwError(error);
          })
        )
    );
  }

  getSteps(): Observable<any> {
    return this.auth.fetchWithAuth(
      this.http.get(`${environment.dbUrlBek}/step`).pipe(
        catchError((error) => {
          return throwError(error);
        })
      )
    );
  }

  getActions(): Observable<any> {
    return this.auth.fetchWithAuth(
      this.http.get(`${environment.dbUrlBek}/action/byStepId/${1}`).pipe(
        catchError((error) => {
          return throwError(error);
        })
      )
    );
  }

  requestAction() {}
}
