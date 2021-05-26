import { ConstantPool } from '@angular/compiler';
import {
  Component,
  OnInit,
  Input,
  DoCheck,
  AfterContentChecked,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from '../../../services/clients.service';

@Component({
  selector: 'app-step',
  template: `
    <details
      class="step"
      [class.step-last]="isLast"
      [class.step-current]="step <= currentTaskStep"
      [open]="isOpen()"
    >
      <summary class="header" (click)="detailsTrigger($event, step)">
        <div
          class="indicator mr-2"
          [class.current-step]="step <= currentTaskStep"
        >
          <div
            class="badge"
            [class.bg-danger]="status === -1"
            [class.bg-success]="status === 1 || status === 3"
            [class.bg-warning]="status === 2"
            [ngSwitch]="status"
            *ngIf="status"
          >
            <i class="uil-times" *ngSwitchCase="-1"></i>
            <i class="uil-check" *ngSwitchCase="1"></i>
            <i class="icon-clock" *ngSwitchCase="2"></i>
            <i class="uil-info-circle" *ngSwitchCase="3"></i>
          </div>
          {{ step }}
        </div>
        <div class="title">
          {{ stepTitle }}
          <div
            [class.text-danger]="status === -1"
            [class.text-success]="status === 1 || status === 3"
            [class.text-warning]="status === 2"
            [ngSwitch]="status"
          >
<!--            *ngIf="status"-->
            <span *ngSwitchCase="-1">Заявка отклонена</span>
            <span *ngSwitchCase="1">{{ stepDoneText }}</span>
            <span *ngSwitchCase="2">Заявка в ожидании</span>
            <span *ngSwitchCase="3">Заявка одобрена</span>
          </div>
        </div>
      </summary>
      <div class="content pl-5">
        <ng-content select="[step-content]"></ng-content>
      </div>
    </details>
  `,
  styles: [],
})
export class StepComponent implements OnInit, AfterContentChecked {
  isLast = false;
  isFirst = false;
  currentStep = 1;

  currentTaskStep = 1;

  @Input() status: any = 0;

  @Input() step: any = 0;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private clientService: ClientsService
  ) {}

  @Input() stepTitle = '';
  @Input() stepDoneText = '';

  ngOnInit(): void {}

  ngAfterContentChecked(): void {}

  detailsTrigger(evt: any, step: any): void {
    evt.preventDefault();

    if (step <= this.currentTaskStep) {
      this.clientService.currentStepTitle = this.stepTitle;
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

    // if (this.currentStep < step) {
    //   evt.preventDefault();
    // } else if (this.currentStep === step) {
    //   this.clientService.currentStepTitle = this.stepTitle;
    //   evt.target.offsetParent.open
    //     ? (evt.target.offsetParent.open = false)
    //     : (evt.target.offsetParent.open = true);
    //   this.router.navigate([], {
    //     queryParams: {
    //       ...this.route.snapshot.queryParams,
    //       step,
    //     },
    //   });
    // }
  }

  isOpen(): any {
    return this.currentStep === Number(this.step) && Number(this.step) <= this.currentTaskStep;
  }
}
