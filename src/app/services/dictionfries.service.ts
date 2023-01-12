import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class DictionariesService {
  constructor(
    private http: HttpClient,
    private alert: AlertService,
    public translate: TranslateService
  ) {}

  getRegions(): Observable<any> {
    return this.http.get(`${environment.dbUrlBek}/references/getTree`).pipe(
      catchError((error) => {
        this.alert.danger(
          !error.error.message || error.statusText === 'Unknown Error'
            ? this.translate.instant('serverError')
            : error.message
        );
        return throwError(error);
      })
    );
  }

  getDic(dicName: string): Observable<any> {
    return this.http
      .get(`${environment.dbUrlBek}/references/getSprByType?type=${dicName}`)
      .pipe(
        catchError((error) => {
          this.alert.danger(
            !error.error.message || error.statusText === 'Unknown Error'
              ? this.translate.instant('serverError')
              : error.message
          );
          return throwError(error);
        })
      );
  }

  getDicByActionId(id: number): Observable<any> {
    debugger;

    return this.http
      .get(`${environment.dbUrlBek}/references/getSprByActionId?actionId=${id}`)
      .pipe(
        catchError((error) => {
          this.alert.danger(
            !error.error.message || error.statusText === 'Unknown Error'
              ? this.translate.instant('serverError')
              : error.message
          );
          return throwError(error);
        })
      );
  }
}
