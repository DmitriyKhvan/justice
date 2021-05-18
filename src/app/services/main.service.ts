import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  baseURL = 'http://10.1.1.165:3000/';

  public role = 'lawyer'; // == lawyer == // == headLawyer == //

  public ROLE = 'IY'; // IY - исполнительный юрист ---- GY - главный юрист

  public sidebar = false;
  public sidebarDetail = false;

  constructor(private http: HttpClient) {}

  // public previousUrl = new BehaviorSubject({});
  // public currentUrl = new BehaviorSubject('');

  regionList: any;

  getMfo(): Observable<any> {
    return this.http.get<any>(this.baseURL + `dictionary/mfo`);
  }
}
