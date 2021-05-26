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
}
