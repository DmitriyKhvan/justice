import {
  Component,
  OnInit,
  Input,
  DoCheck,
  AfterContentChecked,
  AfterContentInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from '../../../services/clients.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-accordion-item',
  template: `
    <details
      class="accordion mb-1"
      [class.accordion-last]="isLast"
      [class.accordion-current]="currentStep == stepNumber"
      [open]="currentStep == stepNumber"
      #details
    >
      <summary
        class="header px-2 pt-1"
        [class.pb-1]="details.open === false"
        (click)="detailsTrigger($event, stepNumber)"
      >
        <div class="indicator mr-2" [class.current-step]="isTask()">
          <div
            class="badge"
            [class.bg-danger]="status === -1"
            [class.bg-success]="status === 1 || status === 3"
            [class.bg-warning]="status === 2 || status === 4"
            [ngSwitch]="status"
            *ngIf="status"
          >
            <i class="uil-times" *ngSwitchCase="-1"></i>
            <i class="uil-check" *ngSwitchCase="1"></i>
            <i class="icon-clock" *ngSwitchCase="2"></i>
            <i class="uil-info-circle" *ngSwitchCase="3"></i>
            <i class="uil-lock" *ngSwitchCase="4"></i>
          </div>
          {{ stepNumber }}
        </div>
        <div class="title pr-2">
          {{ accordionTitle }}
          <div
            [class.text-danger]="status === -1"
            [class.text-success]="status === 1 || status === 3"
            [class.text-warning]="status === 2 || status === 4"
            [ngSwitch]="status"
            *ngIf="status"
          >
            <span *ngSwitchCase="-1">Заявка отклонена</span>
            <span *ngSwitchCase="1">{{ accordionDoneText }}</span>
            <span *ngSwitchCase="2">Заявка в ожидании</span>
            <span *ngSwitchCase="3">Заявка одобрена</span>
            <span *ngSwitchCase="4">Подача новой заявки</span>
          </div>
        </div>
        <div class="arrow" [ngSwitch]="details.open">
          <i class="fas fa-chevron-down" *ngSwitchCase="false"></i>
          <i class="fas fa-chevron-up" *ngSwitchCase="true"></i>
        </div>
      </summary>
      <div class="content">
        <ng-content select="[accordion-content]"></ng-content>
      </div>
      <div class="footer">
        <div class="comments" *ngFor="let comment of comments">
          <div class="comments-header">
            <div>
              <div class="comments-owner-name">{{ comment?.last_name }} {{ comment?.first_name }} {{ comment?.middle_name }}</div>
              <div class="comments-owner-post">Исполнитель юрист</div>
            </div>
            <div class="comments-created">{{getFormattedDate(comment?.created_at, 'lll')}}</div>
          </div>
          <div class="comments-content">{{ comment?.text }}</div>
        </div>
        <form
          action=""
          class="page-form"
          [formGroup]="commentForm"
          (ngSubmit)="addComment()"
        >
          <div class="text-field mb-2">
            <div class="text-field__title">Комментарий</div>
            <label class="text-field__label bg-white">
              <textarea
                placeholder="Уточните детали"
                formControlName="comment"
              ></textarea>
            </label>
          </div>

          <div class="row">
            <div class="col-6">
              <button
                type="submit"
                class="page-form__actionbtn text-uppercase bg-white"
                [disabled]="commentForm.invalid"
              >
                <!--    (click)="clientDetail.nextStep()"-->
                добавить комментарий
              </button>
            </div>
          </div>
        </form>
      </div>
    </details>
  `,
  styleUrls: ['./accordion-item.component.scss'],
})
export class AccordionItemComponent implements OnInit {
  stepNumber!: any;
  isLast = false;
  isFirst = false;
  currentStep = 1;

  status!: any;

  @Input() step: any;
  @Input() taskId!: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clientsService: ClientsService
  ) {}

  @Input() accordionTitle = '';
  @Input() accordionDoneText = '';

  commentForm!: FormGroup;
  comments: Array<any> = [];

  tasks = [];

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      comment: new FormControl(null, Validators.required),
    });

    this.route.queryParams.subscribe((val) => {
      this.currentStep = val.step;
    });
    this.clientsService.taskInfo.subscribe((value) => {
      if (Number(this.route.snapshot.queryParams.step) === this.step) {
        this.comments = value?.body?.comments;
      }
    });
    this.clientsService.taskList.subscribe(value => {
      this.tasks = value;
    });
  }

  detailsTrigger(evt: any, step: any): void {
    evt.preventDefault();

    // @ts-ignore
    if (this.isTask()){
      evt.target.offsetParent.open
        ? (evt.target.offsetParent.open = false)
        : (evt.target.offsetParent.open = true);
      this.router.navigate([], {
        queryParams: {
          ...this.route.snapshot.queryParams,
          step,
          id: this.taskId,
        },
      });
    }
  }

  isTask(): any {
    // @ts-ignore
    return this.tasks?.includes(String(this.step));
  }

  addComment(): void {
    const body = {
      step: this.route.snapshot.queryParams.step,
      task_id: Number(this.route.snapshot.queryParams.id),
      text: this.commentForm.value.comment,
    };

    this.clientsService.addTaskComment(body).subscribe((value) => {
      console.log(value);
    });
    this.commentForm.reset();
  }

  getFormattedDate(date: any, format: any, locale: any = 'ru'): any {
    return moment(date).locale(locale).format(format);
  }
}
