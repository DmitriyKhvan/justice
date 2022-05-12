import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import { PopUpInfoService } from 'src/app/services/pop-up-watch-form.service';

@Component({
  selector: 'app-notification-action',
  template: `
    <div class="sidebar-content decisionInfo">
      <h2 class="lawsuitTitle add">
        {{
          notification?.data?.action?.lang[lawsuitService.translate.currentLang]
        }}
      </h2>

      <h4 class="title">{{ 'head_lawyer' | translate }}</h4>
      <div class="row justify-content-between mb-2">
        <div class="col-6">
          <div class="label-info">{{ 'decision_date' | translate }}</div>

          <div class="value-info">
            {{ notification?.data?.updatedAt | date: 'dd.MM.yyyy HH:mm' }}
          </div>
        </div>
        <div class="col-6">
          <div class="label-info">{{ 'decision_head_lawyer' | translate }}</div>
          <div
            *ngIf="notification?.data?.actionStatus === 1"
            class="value-info rejected"
          >
            {{ 'rejected' | translate }}
          </div>
          <div
            *ngIf="notification?.data?.actionStatus === 3"
            class="value-info approved"
          >
            {{ 'approved' | translate }}
          </div>
        </div>
      </div>

      <div class="row justify-content-between mb-2">
        <div class="col-12">
          <div class="label-info">{{ 'comment' | translate }}</div>
          <div class="value-info">
            {{
              notification?.message
                ? notification.message
                : ('no_comment' | translate)
            }}
          </div>
        </div>
      </div>

      <hr class="separater" />

      <h4 class="title">{{ 'lawyer' | translate }}</h4>
      <div class="row justify-content-between mb-2">
        <div class="col-4">
          <div class="label-info">{{ 'departure_date' | translate }}</div>
          <div class="value-info">
            {{ notification?.data?.createdAt | date: 'dd.MM.yyyy HH:mm' }}
          </div>
        </div>
      </div>

      <button
        (click)="showStep()"
        type="button"
        class="page-form__actionbtn text-uppercase"
      >
        {{ 'considerApplication' | translate }}
      </button>
    </div>
  `,
  styles: [],
})
export class NotificationAction implements OnInit {
  @Input() notification!: any;

  constructor(
    public lawsuitService: LawsuitService,
    private router: Router,
    private popUpInfoService: PopUpInfoService
  ) {}

  ngOnInit(): void {}

  showStep() {
    this.popUpInfoService.popUpListNotification$.next('close');
    this.popUpInfoService.popUpNotificationDetail$.next('close');
    this.popUpInfoService.updateContractList$.next(true);
    this.router.navigate(['/clients/lawsuit'], {
      queryParams: {
        mfo: this.notification?.toMfo,
        contractId: this.notification?.data?.uniqueId,
        stepId: this.notification?.data?.step?.id,
      },
    });
  }
}
