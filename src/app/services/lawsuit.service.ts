import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, filter, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LawsuitService {
  stepName!: string;
  stepIndex!: number;

  steps: any[] = [
    // { id: 1, name: 'Уведомление', status: 'complete' },
    // { id: 2, name: 'Процесс работы с ТПП', status: 'complete' },
    // { id: 3, name: 'Процесс работы с судом', status: 'complete' },
    // { id: 5, name: 'Процесс работы с Нотариусом', status: 'complete' },
    // { id: 4, name: 'Процесс работы с МИБ', status: 'complete' },
    // { id: 6, name: 'Процесс работы с Аукционом', status: 'last' },
    // {
    //   stepid: 1,
    //   stepname: 'Notification',
    //   stepconfirmation: true,
    //   langname: 'Уведомление',
    //   actionscount: 2,
    // },
    // {
    //   stepid: 2,
    //   stepname: 'TPP',
    //   stepconfirmation: true,
    //   langname: 'Торгово-промышленная палата',
    //   actionscount: 1,
    // },
  ];

  /** Текущее действие в шаге */
  currentStep: any = {
    // stepid: 2,
    //   stepname: 'TPP',
    //   stepconfirmation: true,
    //   langname: 'Торгово-промышленная палата',
    //   actionscount: 1,
  };

  actionIds: any[] = [];
  actionStart: any = {}; // начальная форма (действие) в шаге (следующий шаг)
  historyActions: any[] = []; // история действий текущего шага
  historySteps: any[] = []; // история шагов текущего шага
  activeAction: any[] = [];
  mfo!: string;
  contractId!: any; // uniqueId
  fromStepId!: any; // текущий шаг
  isDeniedStep: boolean = false;

  constructor(
    public http: HttpClient,
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  getContractInfo(id: any): Observable<any> {
    return this.http
      .get(`${environment.dbUrlBek}/cases/getContract?contractId=${id}`)
      .pipe(
        catchError((error) => {
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

  getStepsProcess({ contractId, mfo }: any): Observable<any> {
    console.log(contractId, mfo);

    return this.http
      .get(
        `${environment.dbUrlBek}/process/getSteps?uniqueId=${contractId}&mfo=${mfo}&lang=ru`
      )
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  getCurrentStep(id: number) {
    console.log('this.steps', this.steps);
    console.log('id', id);

    this.currentStep = this.steps.find((step: any) => step.stepid === +id);
    this.stepIndex =
      this.steps.findIndex((step: any) => step.stepid === +id) + 1;

    this.stepName = this.currentStep?.lang?.ru;

    console.log(this.stepName);
    console.log(this.stepIndex);

    this.router.navigate([], {
      queryParams: {
        ...this.route.snapshot.queryParams,
        stepId: id,
      },
    });
  }

  getStepActions({ mfo, contractId, stepId }: any): Observable<any> {
    return this.http
      .get(
        `${environment.dbUrlBek}/process/getStepActions?stepId=${stepId}&uniqueId=${contractId}&mfo=${mfo}&lang=ru`
      )
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  getActions(stepId: number): Observable<any> {
    return this.http
      .get(`${environment.dbUrlBek}/action/byStepId/${stepId}`)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  removeActionForm(id: number): void {
    console.log('id', id);

    this.actionIds = this.actionIds.filter((actionId) => actionId !== id);
  }

  apiFetch(data: any, api: string): Observable<any> {
    const dataFormat = {
      ...data,
      uniqueId: this.contractId,
      mfo: this.mfo,
      processId: this.actionStart?.processId,
    };
    return this.http.post(`${environment.dbUrlBek}/${api}`, dataFormat).pipe(
      tap(this.setHistoryActions.bind(this)),
      catchError((error) => {
        console.log(error);
        return throwError(error);
      })
    );
  }

  setHistoryActions(histories: any): void {
    this.historyActions = histories.actions.filter(
      (action: any) => action.actionStatus !== 0
    );

    this.historySteps = histories.jumps;

    this.actionIds = [];
  }

  getReqId(actionId: any) {
    return this.historyActions
      .filter((action) => action.actionId === actionId)
      .slice(-1)[0]?.data;
  }
}
