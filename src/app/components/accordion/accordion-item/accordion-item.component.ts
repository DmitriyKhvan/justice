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
        <ng-content select="[accordion-footer]"></ng-content>
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
    if (step <= this.currentStep) {
      evt.target.offsetParent.open
        ? (evt.target.offsetParent.open = false)
        : (evt.target.offsetParent.open = true);
      this.router.navigate([], {
        queryParams: {
          ...this.route.snapshot.queryParams,
          step,
          id: this.taskId
        },
      });
    }
  }
}
