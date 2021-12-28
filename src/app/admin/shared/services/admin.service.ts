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
    return this.http.post(
      `${environment.authUrl}/admin/realms/JUSTICE/users`,
      user
    );
  }

  getUsers({ currentPage = 0, itemsPerPage = 9999 }: any): Observable<any> {
    return this.http.get(
      `${environment.authUrl}/admin/realms/JUSTICE/users?first=${currentPage}&max=${itemsPerPage}`
    );
  }

  getSearchUsers({
    currentPage = 0,
    itemsPerPage = 9999,
    searchValue,
  }: any): Observable<any> {
    return this.http.get(
      `${environment.authUrl}/admin/realms/JUSTICE/users?briefRepresentation=true&first=${currentPage}&max=${itemsPerPage}&search=${searchValue}`
    );
  }

  getUserById(id: any): Observable<any> {
    return this.http.get(
      `${environment.authUrl}/admin/realms/JUSTICE/users/${id}`
    );
  }

  updateUser(userId: string, user: object): Observable<any> {
    return this.http.put(
      `${environment.authUrl}/admin/realms/JUSTICE/users/${userId}`,
      user
    );
  }

  removeUser(id: any): Observable<void> {
    return this.http.delete<void>(
      `${environment.authUrl}/admin/realms/JUSTICE/users/${id}`
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

  setUserRoles(userId: string, roles: object) {
    return this.http.post(
      `${environment.authUrl}/admin/realms/JUSTICE/users/${userId}/role-mappings/clients/78e0fab3-a7ca-4b70-a949-925644fdd2fc`,
      roles
    );
  }
}
