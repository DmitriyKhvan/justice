import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(private http: HttpClient, private router: Router) {}

  createUser(user: any): Observable<any> {
    return this.http.post(`${environment.dbUrl}/user/create`, user);
  }

  getUsers(data: any): Observable<any> {
    return this.http.get(
      `${environment.dbUrl}/user/users?page=${data.currentPage}&count=${data.itemsPerPage}&searchValue=${data.searchValue}`
    );
  }

  getUserById(id: any): Observable<any> {
    return this.http.get(`${environment.dbUrl}/user/user/${id}`);
  }

  updateUser(user: any): Observable<any> {
    return this.http.post(`${environment.dbUrl}/user/update`, user);
  }

  removeUser(id: any): Observable<void> {
    return this.http.delete<void>(`${environment.dbUrl}/user/delete?id=${id}`);
  }

  getRegions(): Observable<any> {
    return this.http.get(`${environment.dbUrl}/dictionary/mfo`);
  }

  getRoles(): Observable<any> {
    return this.http.get(`${environment.dbUrl}/user/roles`);
  }
}
