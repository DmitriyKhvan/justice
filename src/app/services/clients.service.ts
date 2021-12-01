import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MainService } from './main.service';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { ContractInfo } from '../interfaces';

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
    private mainService: MainService,
    private auth: AuthService
  ) {}

  getMfo(): Observable<any> {
    // return this.auth.fetchWithAuth(
    //   this.http.get<any>(`${environment.dbUrl}/dictionary/mfo`)
    // );
    return this.http.get<any>(`${environment.dbUrlBek}/cases/mfo`);
  }

  getListByMfo(mfo: any): Observable<any> {
    // return this.auth.fetchWithAuth(
    //   this.http.get<any>(
    //     `${environment.dbUrl}/process/list?page=${this.tablePage}&count=${this.tableCount}&mfo=${mfo}`
    //   )
    // );

    return this.http.post<any>(`${environment.dbUrlBek}/cases/getList`, {
      page: 1,
      count: 10,
      mfo,
    });
  }

  contractDetails(id: any): Observable<any> {
    return this.http.post(`${environment.dbUrl}/process/open`, {
      case_id: id,
    });
  }

  completeTaskStep(body: any): Observable<any> {
    return this.http.post(
      `${environment.dbUrl}/process/task/send?role=${this.mainService.ROLE}`,
      body
    );
  }

  getTask(taskId: number, step: number): Observable<any> {
    return this.http.get(
      `${environment.dbUrl}/process/task/get?task_id=${taskId}&step=${step}`
    );
  }

  addTaskComment(body: any): Observable<any> {
    return this.http.post(`${environment.dbUrl}/comments`, body);
  }

  downloadFile(id: any): any {
    if (id) {
      window.open(
        `${environment.fileBaseUrl}/file/downloadById/${id}`,
        'blank'
      );
    }
  }

  // getFile(id: any): Observable<any> {
  //   return this.http.get<any>(`${environment.fileBaseUrl}/file/downloadById/${id}`);
  // }
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
