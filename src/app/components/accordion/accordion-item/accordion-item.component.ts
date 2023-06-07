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
        <div class="indicator mr-2" [class.current-step]="details.open">
          <div
            class="badge"
            [class.bg-success]="status === 1"
            [class.bg-warning]="status === 2"
            [class.bg-danger]="status === 3"
            [ngSwitch]="status"
          >
            <i class="uil-check" *ngSwitchCase="1"></i>
            <i class="icon-clock" *ngSwitchCase="2"></i>
            <i class="uil-times" *ngSwitchCase="3"></i>
          </div>
          {{ stepNumber }}
        </div>
        <div class="title pr-2">
          {{ accordionTitle }}
          <span
            [class.text-warning]="status === 2"
            [class.text-danger]="status === 3"
          >
            {{ accordionDoneText }}
          </span>
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
        <!--        <ng-content select="[accordion-footer]"></ng-content>-->
        <form action="" class="page-form">
          <div class="text-field mb-2">
            <div class="text-field__title">{{ 'comment' | translate }}</div>
            <label class="text-field__label bg-white">
              <textarea
                placeholder="{{ 'specify_details' | translate }}"
              ></textarea>
            </label>
          </div>

          <div class="row">
            <div class="col-7">
              <div class="page-form__actionbtn text-uppercase bg-white">
                <!--    (click)="clientDetail.nextStep()"-->
                добавить комментарий
              </div>
            </div>
          </div>
        </form>
      </div>
    </details>
  `,
  styleUrls: ['./accordion-item.component.scss'],
})
export class AccordionItemComponent implements OnInit {
  stepNumber = 0;
  isLast = false;
  isFirst = false;
  currentStep = 1;

  status = 1;

  @Input() step: any = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientsService
  ) {}

  @Input() accordionTitle = '';
  @Input() accordionDoneText = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe((val) => {
      this.currentStep = val.step;
    });
  }

  detailsTrigger(evt: any, step: any): void {
    evt.preventDefault();
    evt.target.offsetParent.open
      ? (evt.target.offsetParent.open = false)
      : (evt.target.offsetParent.open = true);
    this.router.navigate([], {
      queryParams: {
        ...this.route.snapshot.queryParams,
        step,
      },
    });
  }
}
