import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {AuthService} from './auth.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  // baseURL = 'http://10.1.1.165:3000/';
  baseURL = 'http://10.1.1.226:3001/';

  public role = 'lawyer'; // == lawyer == // == headLawyer == //

  public ROLE = 'IY'; // IY - исполнительный юрист ---- GY - главный юрист

  public sidebar = false;
  public sidebarDetail = false;

  tablePage = 1;
  tableCount = 1000;

  constructor(private http: HttpClient, private auth: AuthService) {}

  // public previousUrl = new BehaviorSubject({});
  // public currentUrl = new BehaviorSubject('');

  regionList: any;

  getMfo(): Observable<any> {
    return this.auth.fetchWithAuth(this.http.get<any>(this.baseURL + `dictionary/mfo`));
  }

  getListByMfo(mfo: any): Observable<any> {
    return this.auth.fetchWithAuth(
      this.http.get<any>(
        `${environment.dbUrl}process/list?page=${this.tablePage}&count=${this.tableCount}&mfo=${mfo}`
      )
    );
  }
}
