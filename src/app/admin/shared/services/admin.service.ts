import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(private http: HttpClient, private router: Router) {}

  createUser(user: any): Observable<any> {
    return this.http.post(`${environment.dbUrl}/user/create`, user);
  }

  getUsers(data: any): Observable<any> {
    return this.http
      .get(
        `${environment.dbUrl}/user/users?page=${data.currentPage}&count=${data.itemsPerPage}&searchValue=${data.searchValue}`
      )
      .pipe(
        map((res: any) => {
          const users = res.users.map((el: any) => {
            const roles: Array<string> = [];
            const mfo: Array<string> = [];
            el.roles.forEach((item: any) => {
              roles.push(item.name);
            });

            el.mfo.forEach((item: any) => {
              mfo.push(item.name_uz);
            });
            return { ...el, roles, mfo };
          });
          return { ...res, users };
        })
      );
  }

  getUserById(id: any): Observable<any> {
    return this.http.get(`${environment.dbUrl}/user/user/${id}`);
  }

  updateUser(user: any): Observable<any> {
    console.log('userrrrrrrr', user);

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
