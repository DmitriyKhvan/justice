import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  public role = 'lawyer'; // == lawyer == // == headLawyer == //

  constructor() { }

  public previousUrl = new BehaviorSubject({});
  public currentUrl = new BehaviorSubject('');
}
