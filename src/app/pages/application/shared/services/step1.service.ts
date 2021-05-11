import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Step1Service {
  constructor(private http: HttpClient) {}

  submit(data): Observable<any> {
    return this.http.post().pipe();
  }
}
