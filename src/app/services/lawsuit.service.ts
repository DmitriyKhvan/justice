import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, filter, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AlertService } from './alert.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LawsuitService {
  stepName!: string;
  stepIndex!: number;

  stopProcessStep!: any; // Шаг остановка процесса

  steps: any[] = []; // текущие шаги процесса

  /** Текущее действие в шаге */
  currentStep: any = {
    // stepid: 2,
    //   stepname: 'TPP',
    //   stepconfirmation: true,
    //   langname: 'Торгово-промышленная палата',
    //   actionscount: 1,
  };

  actions: any[] = [];
  actionStart: any = { processId: null }; // начальная форма (действие) в шаге (следующий шаг)
  historyActions: any[] = []; // история действий текущего шага
  historySteps: any[] = []; // история шагов текущего шага
  activeAction: any[] = [];
  mfo!: string;
  contractId!: any; // uniqueId
  fromStepId!: any; // текущий шаг
  isDeniedStep: boolean = false;
  // decisions!: any;
  decisions: any = {
    actions: [],
    actionsCount: 0,
    steps: [],
    stepsCount: 0,
  };

  timerIdDecisions!: any; // таймер для решений гл. юрист
  contract!: any;

  constructor(
    public http: HttpClient,
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertService
  ) {}

  monitoring(data: any): Observable<any> {
    return this.http.post(`${environment.dbUrlBek}/cases/monit`, data);
  }

  pushNotifications({ page = 1, count = 20, value = '' }): Observable<any> {
    return this.http.get(
      `${environment.dbUrlBek}/push/get?status=0&page=${page}&count=${count}&value=${value}`
    );
  }

  isActionForm(id: number) {
    return this.actions.find((action: any) => action.actionId === id);
  }

  removeActionForm(id: number | null): void {
    this.actions = this.actions.filter((action) => action.actionId !== id);
  }

  getPending({ contractId, mfo }: any): Observable<any> {
    return this.http
      .get(
        `${environment.dbUrlBek}/headLawyer/getPending?uniqueId=${contractId}&mfo=${mfo}`
      )
      .pipe(
        catchError((error) => {
          this.alert.danger(error.error.message);
          return throwError(error);
        })
      );
  }

  confirmAction(data: any, api: string): Observable<any> {
    return this.http.post(`${environment.dbUrlBek}/${api}`, data).pipe(
      catchError((error) => {
        this.alert.danger(error.error.message);
        return throwError(error);
      })
    );
  }

  getContractInfo(id: any): Observable<any> {
    return this.http
      .get(`${environment.dbUrlBek}/cases/getContract?contractId=${id}`)
      .pipe(
        catchError((error) => {
          this.alert.danger(error.error.message);
          return throwError(error);
        })
      );
  }

  getSteps(): Observable<any> {
    return this.http.get(`${environment.dbUrlBek}/step`).pipe(
      catchError((error) => {
        this.alert.danger(error.error.message);
        return throwError(error);
      })
    );
  }

  getStepsProcess({ contractId, mfo }: any): Observable<any> {
    return this.http
      .get(
        `${environment.dbUrlBek}/process/getSteps?uniqueId=${contractId}&mfo=${mfo}&lang=ru`
      )
      .pipe(
        catchError((error) => {
          this.alert.danger(error.error.message);
          return throwError(error);
        })
      );
  }

  getCurrentStep(id: number) {
    // console.log('this.steps', this.steps);
    // console.log('id', id);

    this.currentStep = this.steps.find((step: any) => step.stepid === +id);
    this.stepIndex =
      this.steps.findIndex((step: any) => step.stepid === +id) + 1;

    this.stepName = this.currentStep?.lang?.ru;

    // console.log(this.stepName);
    // console.log(this.stepIndex);

    // if (id !== this.fromStepId) {
    this.fromStepId = id;

    this.router.navigate([], {
      queryParams: {
        ...this.route.snapshot.queryParams,
        stepId: id,
      },
    });
    // }
  }

  getStepActions({ mfo, contractId, stepId }: any): Observable<any> {
    return this.http
      .get(
        `${environment.dbUrlBek}/process/getStepActions?stepId=${stepId}&uniqueId=${contractId}&mfo=${mfo}&lang=ru`
      )
      .pipe(
        catchError((error) => {
          this.alert.danger(error.error.message);
          return throwError(error);
        })
      );
  }

  getActions(stepId: number): Observable<any> {
    return this.http
      .get(`${environment.dbUrlBek}/action/byStepId/${stepId}`)
      .pipe(
        catchError((error) => {
          this.alert.danger(error.error.message);
          return throwError(error);
        })
      );
  }

  apiFetch(data: any, api: string, actionId: number | null): Observable<any> {
    const dataFormat = {
      ...data,
      uniqueId: this.contractId,
      mfo: this.mfo,
      processId: this.actionStart?.processId,
      active: true,
    };

    this.actionStart = {
      processId: null,
    };

    this.removeActionForm(actionId);

    return this.http.post(`${environment.dbUrlBek}/${api}`, dataFormat).pipe(
      tap(this.setHistoryActions.bind(this)),
      catchError((error) => {
        // console.log(error);
        this.alert.danger(error.error.message);
        return throwError(error);
      })
    );
  }

  setHistoryActions(histories: any): void {
    this.historyActions = histories.actions.filter(
      // (action: any) => action.actionStatus !== 0 && action.actionStatus !== 4
      (action: any) => action.actionStatus !== 0
    );

    this.historySteps = histories.jumps;
  }

  getReqId(actionId: any) {
    return this.historyActions
      .filter((action) => action.actionId === actionId)
      .slice(-1)[0]?.data;
  }

  getDic(dicName: string): Observable<any> {
    return this.http
      .get(`${environment.dbUrlBek}/references/getSprByType?type=${dicName}`)
      .pipe(
        catchError((error) => {
          this.alert.danger(error.error.message);
          return throwError(error);
        })
      );
  }

  addTextTemplate(data: object): Observable<any> {
    return this.http
      .post(`${environment.dbUrlBek}/notification/sample/add`, data)
      .pipe(
        catchError((error) => {
          this.alert.danger(error.error.message);
          return throwError(error);
        })
      );
  }

  removeTextTemplate(id: number): Observable<any> {
    return this.http
      .delete(`${environment.dbUrlBek}/notification/sample/remove/${id}`)
      .pipe(
        catchError((error) => {
          this.alert.danger(error.error.message);
          return throwError(error);
        })
      );
  }

  listTextTemplate(): Observable<any> {
    return this.http
      .get(
        `${environment.dbUrlBek}/notification/sample/find/${this.contract.clientType}`
      )
      .pipe(
        catchError((error) => {
          this.alert.danger(error.error.message);
          return throwError(error);
        })
      );
  }

  getRenewalProcess(data: any): Observable<any> {
    return this.http
      .post(`${environment.dbUrlBek}/process/renewal/add/`, data)
      .pipe(
        catchError((error) => {
          this.alert.danger(error.error.message);
          return throwError(error);
        })
      );
  }
}
