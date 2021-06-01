import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConfirmService {
  public confirm$ = new Subject<any>();

  confirm(text: string, user: any, method: any) {
    this.confirm$.next({ text, user, method });
  }
}
