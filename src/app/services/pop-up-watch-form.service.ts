import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PopUpWatchFormService {
  public popUpForm$ = new Subject<any>();

  openPopUp(isActive: boolean, formData: any = {}) {
    this.popUpForm$.next({ isActive, formData });
  }

  closePopUp(isActive: boolean, formData: any = {}) {
    this.popUpForm$.next({ isActive, formData });
  }
}
