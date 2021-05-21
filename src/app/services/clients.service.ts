import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MainService } from './main.service';
import { AuthService } from './auth.service';
import {environment} from '../../environments/environment';

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

  constructor(
    private http: HttpClient,
    private mainService: MainService,
    private auth: AuthService
  ) {}

  getMfo(): Observable<any> {
    console.log(environment.dbUrl);
    return this.auth.fetchWithAuth(this.http.get<any>(environment.dbUrl + `dictionary/mfo`));
  }

  getListByMfo(mfo: any): Observable<any> {
    return this.auth.fetchWithAuth(
      this.http.get<any>(
        `${environment.dbUrl}process/list?page=${this.tablePage}&count=${this.tableCount}&mfo=${mfo}`
      )
    );
  }

  contractDetails(id: any): Observable<any> {
    return this.http.post(`${environment.dbUrl}process/open`, {
      case_id: id,
    });
  }

  completeTaskStep(body: object): Observable<any> {
    return this.http.post(
      `${environment.dbUrl}process/task/send?role=${this.mainService.ROLE}`,
      body
    );
  }

  getTask(taskId: number, step: number): Observable<any> {
    return this.http.get(
      `${environment.dbUrl}process/task/get?task_id=${taskId}&step=${step}`
    );
  }
}
