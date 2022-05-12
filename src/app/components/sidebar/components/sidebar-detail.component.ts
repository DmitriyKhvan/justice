import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PopUpInfoService } from 'src/app/services/pop-up-watch-form.service';

@Component({
  selector: 'app-sidebar-detail',
  template: `
    <div #wrapSidebarDetail class="sidebar">
      <i class="uil-times sidebar-close" data-close_detail="true"></i>
      <div class="sidebar-header">
        <div class="sidebar-title">
          <i class="icon-back mr-1" data-close_detail="true"></i>
          <span>
            {{ 'caseProcess' | translate }}
            <span class="fw-bold">№{{ notification?.data?.uniqueId }}</span>
          </span>
        </div>
      </div>

      <app-notification-action
        *ngIf="
          notification?.type === 'action' ||
          notification?.type === 'decision-action'
        "
        [notification]="notification"
      ></app-notification-action>

      <app-notification-step
        *ngIf="
          notification?.type === 'step' ||
          notification?.type === 'decision-step'
        "
        [notification]="notification"
      ></app-notification-step>
    </div>
  `,
  styleUrls: ['../sidebar.component.scss'],
})
export class SidebarDetailComponent implements OnInit, AfterViewInit {
  closePopUpInfoSub!: Subscription;

  @Input() notification!: any;
  @ViewChild('wrapSidebarDetail', { static: false })
  wrapSidebarDetail!: ElementRef;

  constructor(private popUpInfoService: PopUpInfoService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.closePopUpInfoSub = fromEvent(
      this.wrapSidebarDetail.nativeElement,
      'click'
    )
      .pipe(
        map((event: any) => event.target),
        tap((event: any) => {
          if (event.dataset.close_detail) {
            this.popUpInfoService.popUpNotificationDetail('close');
            // clearInterval(this.lawsuitService.timerIdDecisions);
          }
        })
      )
      .subscribe();
  }
}
