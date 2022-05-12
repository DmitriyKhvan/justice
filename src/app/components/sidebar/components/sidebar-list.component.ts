import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fromEvent, interval, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import { PopUpInfoService } from 'src/app/services/pop-up-watch-form.service';

@Component({
  selector: 'app-sidebar-list',
  template: `
    <div [class]="isActive" class="sidebar" #sidebar>
      <i class="uil-times sidebar-close" data-close="true"></i>
      <div class="notifications">
        <h4 class="notificationTitle">{{ 'notifications' | translate }}</h4>
        <div class="searchBlock">
          <i class="icon-search"></i>
          <input
            type="text"
            #search
            placeholder="{{ 'searchCaseNumber' | translate }}"
          />
        </div>

        <ng-container *ngIf="notifications.length; else noNotifications">
          <div class="notifications-title">
            <div class="notifications-number">
              <span class="notifications-number__title">{{
                'caseNumber' | translate
              }}</span>
            </div>
            <div class="notifications-name"></div>
            <div class="notifications-date">
              <span>{{ 'date' | translate }}</span>
            </div>
          </div>

          <div
            *ngFor="let notification of notifications"
            class="notifications-item"
            (click)="showSidebarDetail(notification)"
          >
            <div class="notifications-number">
              <i class="marker"></i>
              <span>#{{ notification.data.uniqueId }}</span>
            </div>

            <div
              *ngIf="
                notification.type === 'action' ||
                notification.type === 'decision-action'
              "
              class="notifications-name"
            >
              <p>
                {{ 'action' | translate }} "{{
                  notification.data.action.lang[
                    lawsuitService.translate.currentLang
                  ]
                }}"
                <span
                  *ngIf="notification.data.actionStatus === 1"
                  class="rejected"
                  >{{ 'rejected' | translate }}</span
                >
                <span
                  *ngIf="notification.data.actionStatus === 2"
                  class="pending"
                  >{{ 'pending' | translate }}</span
                >
                <span
                  *ngIf="notification.data.actionStatus === 3"
                  class="approved"
                  >{{ 'approved' | translate }}</span
                >
              </p>
            </div>

            <div
              *ngIf="
                notification.type === 'step' ||
                notification.type === 'decision-step'
              "
              class="notifications-name"
            >
              <p>
                {{ 'transitionStep' | translate }} "{{
                  notification.data.toStep.lang[
                    lawsuitService.translate.currentLang
                  ]
                }}"
                <span *ngIf="notification.data.status === 1" class="rejected">{{
                  'rejected' | translate
                }}</span>

                <span *ngIf="notification.data.status === 2" class="pending">{{
                  'pending' | translate
                }}</span>

                <span *ngIf="notification.data.status === 3" class="approved">{{
                  'approved' | translate
                }}</span>
              </p>
            </div>
            <div class="notifications-date">
              {{ notification.updatedAt | date: 'dd.MM.yyyy HH:mm' }}
            </div>
          </div>
          <app-loader *ngIf="loader"></app-loader>
        </ng-container>

        <ng-template #noNotifications>
          <app-loader *ngIf="loader; else message"></app-loader>
          <!-- <app-loader></app-loader> -->

          <ng-template #message>
            <h4 class="notificationTitle add">
              {{ 'notificationsNotFound' | translate }}
            </h4>
          </ng-template>
        </ng-template>
      </div>
    </div>

    <div class="sidebar-detail">
      <app-sidebar-detail [notification]="notification"></app-sidebar-detail>
    </div>
  `,
  styleUrls: ['../sidebar.component.scss'],
})
export class SidebarListComponent implements OnInit, AfterViewInit, OnDestroy {
  pushSub!: Subscription;
  searchSub!: Subscription;
  scrollSub!: Subscription;
  popUpInfoSub!: Subscription;

  notifications: any[] = [];
  notification!: any;
  page: number = 1;
  loader: boolean = true;
  timerId!: any;
  isActive!: string;

  @ViewChild('search', { static: false }) inputRef!: ElementRef;
  @ViewChild('sidebar', { static: false }) sidebarRef!: ElementRef;

  constructor(
    public lawsuitService: LawsuitService,
    private popUpInfoService: PopUpInfoService
  ) {}

  ngOnInit(): void {
    this.selectNotifications();

    this.popUpInfoSub = this.popUpInfoService.popUpNotificationDetail$.subscribe(
      (popUpData: any) => {
        this.isActive = popUpData.isActive;
      }
    );
  }

  selectNotifications() {
    this.pushSub = interval(5000)
      .pipe(
        startWith(''),
        switchMap(() => {
          return this.lawsuitService.pushNotifications({});
        })
      )
      .subscribe((notifications) => {
        this.loader = false;

        const resArr = [...notifications, ...this.notifications];
        this.notifications = resArr.filter(
          (v, i, a) =>
            a.findIndex((t) => JSON.stringify(t) === JSON.stringify(v)) === i
        );
      });
  }

  showSidebarDetail(notification: any): void {
    this.popUpInfoService.popUpNotificationDetail('open');
    this.notification = notification;
  }

  ngAfterViewInit(): void {
    this.searchSub = fromEvent(this.inputRef.nativeElement, 'keyup')
      .pipe(
        debounceTime(700),
        map((event: any) => event.target.value.toLowerCase()),
        distinctUntilChanged(),
        tap((value) => {
          if (value) {
            this.pushSub.unsubscribe();
            // clearInterval(this.timerId);
          } else {
            this.selectNotifications();
            // this.timerId = setInterval(() => {
            //   this.selectNotifications();
            // }, 5000);
          }
        }),
        switchMap((value) => {
          this.loader = true;
          return this.lawsuitService.pushNotifications({ value: value });
        })
      )
      .subscribe((notifications) => {
        this.loader = false;
        this.notifications = notifications;
      });

    this.scrollSub = fromEvent(this.sidebarRef.nativeElement, 'scroll')
      .pipe(
        debounceTime(700),
        map((event: any) => event.target),
        filter((event: any) => {
          return event.scrollHeight === event.clientHeight + event.scrollTop;
        }),
        switchMap(() => {
          this.loader = true;
          this.page++;
          return this.lawsuitService.pushNotifications({
            page: this.page,
            count: 20,
          });
        })
      )
      .subscribe((notifications) => {
        this.loader = false;
        if (notifications.length) {
          const resArr = [...notifications, ...this.notifications];
          this.notifications = resArr.filter(
            (v, i, a) =>
              a.findIndex((t) => JSON.stringify(t) === JSON.stringify(v)) === i
          );
        }
        //  else {
        //   this.scrollSub.unsubscribe();
        // }
      });
  }

  ngOnDestroy(): void {
    this.pushSub?.unsubscribe();

    this.searchSub?.unsubscribe();

    this.scrollSub?.unsubscribe();

    this.pushSub?.unsubscribe();
    // clearInterval(this.timerId);
  }
}
