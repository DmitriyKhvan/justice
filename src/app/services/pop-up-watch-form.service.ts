import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PopUpInfoService {
  public popUpForm$ = new Subject<any>();
  public popUpStepInfo$ = new Subject<any>();
  public popUpListDecision$ = new Subject<any>();

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

  popUpListDecision(isActive: string, listDecision: any = {}) {
    this.popUpListDecision$.next({ isActive, listDecision });
  }
}
