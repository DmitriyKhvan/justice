import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  // baseURL = 'http://10.1.1.165:3000/';
  baseURL = 'http://10.1.1.226:3001/';

  tablePage = 1;
  tableCount = 1000;

  currentStep!: any;
  public currentStepTitle = 'Отправка оповещения должнику';

  public listByMfo = new BehaviorSubject([]);

  constructor(private http: HttpClient, private mainService: MainService) {}

  getListByMfo(mfo: any): Observable<any> {
    return this.http.get<any>(
      `${this.baseURL}process/list?page=${this.tablePage}&count=${this.tableCount}&mfo=${mfo}`
    );
  }

  contractDetails(id: any): Observable<any> {
    return this.http.post(`${this.baseURL}process/open`, {
      case_id: id,
    });
  }

  completeTaskStep(body: object): Observable<any> {
    return this.http.post(
      `${this.baseURL}process/task/send?role=${this.mainService.ROLE}`,
      body
    );
  }

  getTask(taskId: number, step: number): Observable<any> {
    return this.http.get(
      `${this.baseURL}process/task/get?task_id=${taskId}&step=${step}`
    );
  }
}
