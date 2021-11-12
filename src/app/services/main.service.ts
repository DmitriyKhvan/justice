import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  public role = 'lawyer'; // == lawyer == // == headLawyer == //

  public ROLE: Array<any> = []; // 1 - исполнительный юрист ---- 2 - главный юрист  ---- 3 - администратор

  public sidebar = false;
  public sidebarDetail = false;

  constructor() {}

  getRole(): any {
    if (this.ROLE && this.ROLE.includes(1)) {
      return 'IY';
    } else if (this.ROLE && this.ROLE.includes(2)) {
      return 'GY';
    }
  }
}
