import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginPass } from '../interfaces';

export type AlertType = 'success' | 'warning' | 'danger';

export interface Alert {
  type: AlertType;
  text: string;
  loginPass: LoginPass | null;
}

@Injectable({ providedIn: 'root' })
export class AlertService {
  public alert$ = new Subject<Alert>();

  success(text: string, loginPass: LoginPass | null = null) {
    this.alert$.next({ type: 'success', text, loginPass });
  }

  warning(text: string, loginPass: LoginPass | null = null) {
    this.alert$.next({ type: 'warning', text, loginPass });
  }

  danger(text: string, loginPass: LoginPass | null = null) {
    this.alert$.next({ type: 'danger', text, loginPass });
  }
}
