import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class Step1Service {
  constructor(private http: HttpClient) {}

  submit(): Observable<any> {
    return this.http.get(`${environment.dbUrl}/user/users`).pipe();
  }
}
