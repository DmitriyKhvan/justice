import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MainService {

  public role = 'lawyer'; // == lawyer == // == headLawyer == //

  public ROLE = 'GY'; // IY - исполнительный юрист ---- GY - главный юрист

  public sidebar = false;
  public sidebarDetail = false;

  constructor() {}

}
