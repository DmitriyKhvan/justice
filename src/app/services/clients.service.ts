import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { ContractInfo } from '../interfaces';
import { AlertService } from './alert.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  // baseURL = 'http://10.1.1.165:3000/';

  tablePage = 1;
  tableCount = 1000;

  currentStep!: any;
  public currentStepTitle = 'Отправка оповещения должнику';

  public listByMfo = new BehaviorSubject([]);
  public contractInfo = new BehaviorSubject<any>({});
  public taskList = new BehaviorSubject<any>([]);

  public taskInfo = new BehaviorSubject<any>({});
  public lastAction = new BehaviorSubject<any>({});
  public taskHistory = new BehaviorSubject<any>([]);
  public sp = new BehaviorSubject<any>({});

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private alert: AlertService,
    public translate: TranslateService
  ) {}

  getMfo(status: any = ''): Observable<any> {
    // return this.auth.fetchWithAuth(
    //   this.http.get<any>(`${environment.dbUrl}/dictionary/mfo`)
    // );
    return this.http
      .get<any>(`${environment.dbUrlBek}/cases/IABSmfo?status=${status}`)
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

  getListByMfo({
    page,
    count,
    mfo,
    sortValue,
    sortType,
    search,
  }: any): Observable<any> {
    // return this.auth.fetchWithAuth(
    //   this.http.get<any>(
    //     `${environment.dbUrl}/process/list?page=${this.tablePage}&count=${this.tableCount}&mfo=${mfo}`
    //   )
    // );

    return this.http
      .post<any>(`${environment.dbUrlBek}/cases/getList`, {
        page,
        count,
        mfo,
        sortValue,
        sortType,
        search,
      })
      .pipe(
        catchError((error: any) => {
          this.alert.danger(
            !error.error.message || error.statusText === 'Unknown Error'
              ? this.translate.instant('serverError')
              : error.message
          );
          return throwError(error);
        })
      );
  }

  getListStopProcess({
    page,
    count,
    mfo,
    sortValue,
    sortType,
    search,
  }: any): Observable<any> {
    // return this.auth.fetchWithAuth(
    //   this.http.get<any>(
    //     `${environment.dbUrl}/process/list?page=${this.tablePage}&count=${this.tableCount}&mfo=${mfo}`
    //   )
    // );

    return this.http.post<any>(`${environment.dbUrlBek}/admin/getList`, {
      page,
      count,
      mfo,
      sortValue,
      sortType,
      search,
    });
  }

  downloadFile(id: any): any {
    if (id) {
      window.open(
        `${environment.fileBaseUrl}/file/downloadById/${id}`,
        'blank'
      );
    }
  }

  getFile(id: any): Promise<any> {
    return new Promise<any>(async (resolve: any, reject: any) => {
      try {
        this.http
          .request('get', `${environment.fileBaseUrl}/file/downloadById/${id}`)
          .subscribe((file) => {
            resolve(file);
          });
      } catch (err) {
        reject(err);
      }
    });
  }
}
