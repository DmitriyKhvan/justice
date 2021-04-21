import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor() { }

  public previousUrl = new BehaviorSubject('');
  public currentUrl = new BehaviorSubject('');
}
