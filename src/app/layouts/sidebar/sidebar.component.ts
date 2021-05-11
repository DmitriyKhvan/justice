import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  template: `
    <div class="sidebar-wrapper" *ngIf="mainService.sidebar || mainService.sidebarDetail">
      <div class="sidebar" [@showSidebar]="sidebar">
        <i class="uil-times-circle sidebar-close" (click)="mainService.sidebar = false"></i>
        <div class="notifications">
          <div class="notifications-item" (click)="showSidebarDetail()">
            <div class="notifications-title">
              <i class="fas fa-circle"></i>
              Процесс по делу №132100
            </div>
            <div class="notifications-status">есть обновления</div>
          </div>
          <div class="notifications-item">
            <div class="notifications-title">
              <i class="fas fa-circle"></i>
              Процесс по делу №132100
            </div>
            <div class="notifications-status">есть обновления</div>
          </div>
          <div class="notifications-item">
            <div class="notifications-title">
              <i class="fas fa-circle"></i>
              Процесс по делу №132100
            </div>
            <div class="notifications-status">есть обновления</div>
          </div>
        </div>
      </div>
      <div class="sidebar" [@showSidebar]="sidebarDetail">
        <i class="uil-times-circle sidebar-close" (click)="mainService.sidebar = false; mainService.sidebarDetail = false"></i>
        <div class="sidebar-header">
          <div class="sidebar-title">
            <i class="icon-back mr-1" (click)="mainService.sidebarDetail = false"></i>
            <span>
              Процесс по делу
              <span class="fw-bold">№132100</span>
            </span>
          </div>
          <div
            class="sidebar-header__link row align-items-center ml-4 mr-1 py-1"
          >
            <i class="icon-clock mr-1"></i>
            История дела
          </div>
        </div>
        <div class="sidebar-content">
          <div class="sidebar-item ml-4 mr-1 py-1">
            <div class="sidebar-item_header">
              <i class="icon-clock mr-1"></i>
              24 февраля 2020, 10:25
            </div>
            <div class="sidebar-item_content">
              Сформирована заявка в палату
              <div class="row">
                <div class="col-8">
                  <div
                    class="btn btn-outlined-primary mt-1 text-uppercase fw-bold"
                  >
                    рассмотреть заявку
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('showSidebar', [
      state(
        'show',
        style({
          transform: 'translateX(0)',
        })
      ),
      state(
        'hide',
        style({
          transform: 'translateX(478px)',
        })
      ),
      transition('show => hide', animate('300ms ease-out')),
      transition('hide => show', animate('300ms ease-in')),
    ]),
  ],
})
export class SidebarComponent implements OnInit {
  constructor(public mainService: MainService) {}

  ngOnInit(): void {}

  get sidebar(): any {
    return this.mainService.sidebar ? 'show' : 'hide';
  }
  get sidebarDetail(): any {
    return this.mainService.sidebarDetail ? 'show' : 'hide';
  }

  showSidebarDetail(): void {
    this.mainService.sidebarDetail = true;
  }
}
