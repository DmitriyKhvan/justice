import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(
    private http: HttpClient,
    private router: Router,
    public translate: TranslateService,
    private alert: AlertService
  ) {}

  createUser(user: any): Observable<any> {
    return this.http
      .post(`${environment.authUrl}/admin/realms/JUSTICE/users`, user)
      .pipe(
        catchError((error) => {
          this.alert.danger(error.error.message);
          return throwError(error);
        })
      );
  }

  getUsers({
    currentPage = 0,
    itemsPerPage = 9999,
    searchValue = '',
  }: any): Observable<any> {
    return this.http
      .get(
        `${environment.authUrl}/admin/realms/JUSTICE/users?search=${searchValue}&first=${currentPage}&max=${itemsPerPage}`
      )
      .pipe(
        catchError((error) => {
          this.alert.danger(error.error.message);
          return throwError(error);
        })
      );
  }

  getCountUsers(): Observable<any> {
    return this.http
      .get(`${environment.authUrl}/admin/realms/JUSTICE/users/count`)
      .pipe(
        catchError((error) => {
          this.alert.danger(error.error.message);
          return throwError(error);
        })
      );
  }

  // getSearchUsers({
  //   currentPage = 0,
  //   itemsPerPage = 9999,
  //   searchValue,
  // }: any): Observable<any> {
  //   return this.http.get(
  //     `${environment.authUrl}/admin/realms/JUSTICE/users?briefRepresentation=true&first=${currentPage}&max=${itemsPerPage}&search=${searchValue}`
  //   );
  // }

  getUserById(id: any): Observable<any> {
    return this.http
      .get(`${environment.authUrl}/admin/realms/JUSTICE/users/${id}`)
      .pipe(
        catchError((error) => {
          console.log('77777777777777');

          this.alert.danger(error.error.message || error.error.error);
          return throwError(error);
        })
      );
  }

  updateUser(userId: string, user: object): Observable<any> {
    return this.http
      .put(`${environment.authUrl}/admin/realms/JUSTICE/users/${userId}`, user)
      .pipe(
        catchError((error) => {
          this.alert.danger(error.error.message);
          return throwError(error);
        })
      );
  }

  removeUser(id: any): Observable<void> {
    return this.http
      .delete<void>(`${environment.authUrl}/admin/realms/JUSTICE/users/${id}`)
      .pipe(
        catchError((error) => {
          this.alert.danger(error.error.message);
          return throwError(error);
        })
      );
  }

  // getRegions(): Observable<any> {
  //   return this.http.get(`${environment.dbUrlBek}/cases/IABSmfo`);
  // }

  getRegions(): Observable<any> {
    return this.http.get(`${environment.dbUrlBek}/references/getTree`);
  }

  getRoles(): Observable<any> {
    return this.http.get(
      `${environment.authUrl}/admin/realms/JUSTICE/clients/78e0fab3-a7ca-4b70-a949-925644fdd2fc/roles`
    );
  }

  getUserRoles(userId: string): Observable<any> {
    // console.log('userId', userId);

    return this.http.get(
      `${environment.authUrl}/admin/realms/JUSTICE/users/${userId}/role-mappings/clients/78e0fab3-a7ca-4b70-a949-925644fdd2fc`
    );
  }

  setUserPassWord(userId: string, passData: object): Observable<any> {
    return this.http.put(
      `${environment.authUrl}/admin/realms/JUSTICE/users/${userId}/reset-password`,
      passData
    );
  }

  setUserRoles(userId: string, roles: any): Observable<any> {
    return this.http.post(
      `${environment.authUrl}/admin/realms/JUSTICE/users/${userId}/role-mappings/clients/78e0fab3-a7ca-4b70-a949-925644fdd2fc`,
      roles
    );
  }

  removeUserRoles(userId: string, roles: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: [roles],
    };

    return this.http
      .delete<void>(
        `${environment.authUrl}/admin/realms/JUSTICE/users/${userId}/role-mappings/clients/78e0fab3-a7ca-4b70-a949-925644fdd2fc`,
        httpOptions
      )
      .pipe(
        catchError((error) => {
          this.alert.danger(error.error.message);
          return throwError(error);
        })
      );
  }
}
