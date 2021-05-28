import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConfirmService {
  public confirm$ = new Subject<any>();

  confirm(text: string, id: number, method: any) {
    this.confirm$.next({ text, id, method });
  }
}
