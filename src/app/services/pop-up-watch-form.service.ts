import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PopUpInfoService {
  public popUpForm$ = new Subject<any>();
  public popUpStepInfo$ = new Subject<any>();
  public popUpListDecision$ = new Subject<any>();
  public popUpStopProcessDecision$ = new Subject<any>();
  public popUpFormTemplate$ = new Subject<any>();

  public popUpTextTemplate$ = new Subject<any>();

  public updateContractList$ = new Subject<any>();

  openPopUpHistoryAction(isActive: boolean, formData: any = {}) {
    this.popUpForm$.next({ isActive, formData });
  }

  closePopUpHistoryAction(isActive: boolean, formData: any = {}) {
    this.popUpForm$.next({ isActive, formData });
  }

  openPopUpHistoryStep(isActive: boolean, stepInfo: any = {}) {
    this.popUpStepInfo$.next({ isActive, stepInfo });
  }

  closePopUpHistoryStep(isActive: boolean, stepInfo: any = {}) {
    this.popUpStepInfo$.next({ isActive, stepInfo });
  }

  popUpFormTemplate(isActive: boolean, formTemplate: any = {}) {
    this.popUpFormTemplate$.next({ isActive, formTemplate });
  }

  popUpListDecision(isActive: string, listDecision: any = {}) {
    this.popUpListDecision$.next({ isActive, listDecision });
  }

  popUpStopProcessDecision(isActive: string, contract: any = {}) {
    this.popUpStopProcessDecision$.next({ isActive, contract });
  }

  popUpTextTemplate(isActive: boolean = false, text: string = '') {
    this.popUpTextTemplate$.next({ isActive, text });
  }
}
