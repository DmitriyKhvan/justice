import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { PopUpInfoService } from 'src/app/services/pop-up-watch-form.service';

@Component({
  selector: 'app-notification-step',
  template: `
    <div class="sidebar-content decisionInfo">
      <h4 class="title">Главный юрист</h4>
      <div class="row justify-content-between mb-2">
        <div class="col-6">
          <div class="label-info">Дата принятия решения</div>
          <div class="value-info">
            {{ notification?.data.updatedAt | date: 'dd.MM.yyyy HH:mm' }}
          </div>
        </div>
        <div class="col-6">
          <div class="label-info">Решение Г.Ю.</div>
          <div
            *ngIf="notification?.data?.status === 1"
            class="value-info rejected"
          >
            Отказано
          </div>
          <div
            *ngIf="notification?.data?.status === 3"
            class="value-info approved"
          >
            Одобрено
          </div>
        </div>
      </div>

      <div class="row justify-content-between mb-2">
        <div class="col-12">
          <div class="label-info">Комментарий</div>
          <div class="value-info">
            {{
              notification?.message ? notification?.message : 'Нет комментарий'
            }}
          </div>
        </div>
      </div>

      <hr class="separater" />

      <h4 class="title">Юрист</h4>
      <div class="row justify-content-between mb-2">
        <div class="col-6">
          <div class="label-info">Дата отправки</div>
          <div class="value-info">
            {{ notification?.data?.createdAt | date: 'dd.MM.yyyy HH:mm' }}
          </div>
        </div>

        <div class="col-6">
          <div class="label-info">Выбранный шаг</div>
          <div class="value-info">
            {{ notification?.data?.toStep?.lang?.ru }}
          </div>
        </div>
      </div>
      <div class="row justify-content-between mb-2">
        <div class="col-12">
          <div class="label-info">Выбранное действие</div>
          <div class="value-info">
            {{ notification?.data?.toAction.lang.ru }}
          </div>
        </div>
      </div>
      <button
        (click)="showStep()"
        type="button"
        class="page-form__actionbtn text-uppercase"
      >
        Рассмотреть заявку
      </button>
    </div>
  `,
  styles: [],
})
export class NotificationStep implements OnInit {
  @Input() notification!: any;

  constructor(
    public mainService: MainService,
    private router: Router,
    private popUpInfoService: PopUpInfoService
  ) {}

  ngOnInit(): void {}

  showStep() {
    this.mainService.sidebar = false;
    this.mainService.sidebarDetail = false;
    this.popUpInfoService.updateContractList$.next(true);
    this.router.navigate(['/clients/lawsuit'], {
      queryParams: {
        mfo: this.notification?.toMfo,
        contractId: this.notification?.data?.uniqueId,
        stepId: this.notification?.data?.fromStep.id,
      },
    });
  }
}
