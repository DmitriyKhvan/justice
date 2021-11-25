import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LawsuitService {
  stepName!: string;
  stepIndex!: number;

  steps: any[] = [
    { id: 1, name: 'Уведомление', status: 'complete' },
    { id: 2, name: 'Процесс работы с ТПП', status: 'complete' },
    { id: 3, name: 'Процесс работы с судом', status: 'complete' },
    { id: 5, name: 'Процесс работы с Нотариусом', status: 'complete' },
    { id: 4, name: 'Процесс работы с МИБ', status: 'complete' },
    { id: 6, name: 'Процесс работы с Аукционом', status: 'last' },
  ];

  /** Текущее действие в шаге */
  currentStep: any = {
    id: 3,
    name: 'Процесс работы с судом',
    status: 'complete',
  };

  actionIds: any[] = [];
  activeAction: any[] = [];

  constructor(public http: HttpClient, public auth: AuthService) {}

  notificationAdd(notificationData: any): Observable<any> {
    return this.http
      .post(`${environment.dbUrlBek}/notification/add`, notificationData)
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(error);
        })
      );
  }

  getSteps(): Observable<any> {
    return this.http.get(`${environment.dbUrlBek}/step`).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getCurrentStep(id: number) {
    this.currentStep = this.steps.find((step: any) => step.id === id);
  }

  getActions(): Observable<any> {
    return this.http
      .get(`${environment.dbUrlBek}/action/byStepId/${this.currentStep.id}`)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  requestAction() {}
}
