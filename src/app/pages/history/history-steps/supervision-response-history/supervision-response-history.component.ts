import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { MainService } from '../../../../services/main.service';
import { ClientsService } from '../../../../services/clients.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-supervision-response-history',
  template: `
    <details
      class="accordion mb-1 bg-gray-secondary pb-1"
      *ngFor="let history of histories; index as i"
      #historyDetails
    >
      <!--      [class.pb-1]="historyDetails.open"-->
      <summary
        class="header px-2 pt-1"
        style="border-radius: 5px"
        (click)="detailsTrigger($event)"
      >
        <div class="indicator mr-2" [class.current-step]="historyDetails.open">
          <div
            class="badge"
            [class.bg-danger]="history.status === -1"
            [class.bg-success]="history.status === 1 || history.status === 3"
            [class.bg-warning]="history.status === 2 || history.status === 4"
            [ngSwitch]="history.status"
          >
            <i class="uil-times" *ngSwitchCase="-1"></i>
            <i class="uil-check" *ngSwitchCase="1"></i>
            <i class="icon-clock" *ngSwitchCase="2"></i>
            <i class="uil-info-circle" *ngSwitchCase="3"></i>
            <i class="uil-lock" *ngSwitchCase="4"></i>
          </div>
          {{ i + 1 }}
        </div>
        <div class="title pr-2">
          <div class="text-secondary" [ngSwitch]="history.status">
            <!--            *ngIf="status"-->
            <span *ngSwitchCase="-1">Заявка отклонена</span>
            <span *ngSwitchCase="1">{{ accordionDoneText }}</span>
            <span *ngSwitchCase="2">Заявка в ожидании</span>
            <span *ngSwitchCase="3">Заявка одобрена</span>
            <span *ngSwitchCase="4">Подача новой заявки</span>
          </div>
          <span class="text-secondary">{{
            getFormattedDate(history?.updated_at, 'lll')
          }}</span>
        </div>
        <div
          class="arrow"
          style="font-size: 14px"
          [ngSwitch]="historyDetails.open"
        >
          <i class="fas fa-chevron-down" *ngSwitchCase="false"></i>
          <i class="fas fa-chevron-up" *ngSwitchCase="true"></i>
        </div>
      </summary>
      <div class="content m-0 py-1 pr-2">
        <div class="row flex-nowrap mb-2">
          <div class="col-6">
            <div class="form-field__title">№ дело</div>
            <div class="form-field__disabled">
              {{ taskInfo?.body?.case_number }}
            </div>
          </div>

          <div class="col-6">
            <div class="form-field__title">Дата решение</div>
            <div class="form-field__disabled">
              {{ history?.decision_date }}
            </div>
          </div>
        </div>

        <div class="row flex-nowrap mb-2">
          <div class="col-6">
            <div class="form-field__title">Выбранное действие</div>
            <div class="form-field__disabled">
              {{ getSPValue('supervision_prosecutor_action', history?.action) }}
            </div>
          </div>
        </div>

        <div class="form-field__title" *ngIf="history?.files">
          Скан документа
        </div>
        <div class="mb-2">
          <div
            *ngFor="let item of history?.files; index as i"
            class="py-1 d-flex align-items-center"
            (click)="clientsService.downloadFile(item?.id)"
          >
            <i class="icon-attach mr-1" style="font-size: 22px"></i>
            <div class="ml-1 cursor-pointer">
              {{ item.name }}
            </div>
          </div>
        </div>
        <div class="mb-2">
          <div class="form-field__title">Дополнительная информация</div>
          <div class="form-field__disabled">
            {{ history?.add_info }}
          </div>
        </div>
      </div>
    </details>

    <app-alert-info
      [text]="'Подождите, данные еще не отправлены исполнительным юристом.'"
      [icon]="'uil-clock-three'"
      [iconColorClass]="'text-warning'"
      *ngIf="!histories"
    ></app-alert-info>
  `,
  styles: [],
})
export class SupervisionResponseHistoryComponent implements OnInit, OnDestroy {
  @Input() step!: any;
  @Input() accordionDoneText = '';
  stepStatus = 0;
  taskId: any;
  taskInfo: any;

  histories!: Array<any>;

  constructor(
    public mainService: MainService,
    public clientsService: ClientsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  addComment!: FormGroup;
  disabled = false;
  private sb!: Subscription;
  ngOnInit(): void {
    this.addComment = new FormGroup({
      comment: new FormControl(''),
    });

    this.sb = this.clientsService.contractInfo.subscribe((value) => {
      value?.tasks?.forEach((el: any) => {
        if (Number(el.task_step) === this.step) {
          this.stepStatus = el.task_status;
          this.taskId = el.task_id;
        }
      });
    });

    this.sb = this.clientsService.taskInfo.subscribe(
      (value) => (this.taskInfo = value)
    );
    this.sb = this.clientsService.taskHistory.subscribe(
      (value) => (this.histories = value)
    );
  }
  ngOnDestroy(): void {
    this.sb.unsubscribe();
  }
  detailsTrigger(evt: any): void {
    evt.preventDefault();
    evt.target.offsetParent.open
      ? (evt.target.offsetParent.open = false)
      : (evt.target.offsetParent.open = true);
  }

  getFormattedDate(date: any, format: any, locale: any = 'ru'): any {
    return moment(date).locale(locale).format('LLL');
  }

  getSPValue(sp: any, key: any): any {
    if (this.taskInfo.sp) {
      return this.taskInfo?.sp[sp]?.find((el: any) => el.key === key)?.value;
    }
  }
}
