import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  baseURL = 'http://10.1.1.165:3000/';

  tablePage = 1;
  tableCount = 1000;

  currentStep!: any;
  public currentStepTitle = 'Отправка оповещения должнику';

  public listByMfo = new BehaviorSubject([]);

  constructor(private http: HttpClient) {}

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
}
