import {Component, OnInit, Input, DoCheck, AfterContentChecked} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ClientsService} from '../../../services/clients.service';

@Component({
  selector: 'app-step',
  template: `
    <details
      class="step"
      [class.step-last]="isLast"
      [class.step-current]="currentStep == stepNumber"
      [open]="currentStep == stepNumber"
    >
      <summary class="header" (click)="detailsTrigger($event, stepNumber)">
        <div
          class="indicator mr-2"
          [class.current-step]="currentStep == stepNumber"
        >
          <div class="check" *ngIf="currentStep > stepNumber">
            <i class="uil-check"></i>
          </div>
          {{ stepNumber }}
        </div>
        <div class="title">
          {{ stepTitle }}
          <span *ngIf="currentStep > stepNumber">
            {{ stepDoneText }}
          </span>
        </div>
      </summary>
      <div class="content pl-5">
        <ng-content select="[step-content]"></ng-content>
      </div>
    </details>
  `,
  styles: [],
})
export class StepComponent implements OnInit, AfterContentChecked{
  stepNumber = 0;
  isLast = false;
  isFirst = false;
  currentStep = 1;

  @Input() step: any = 0;

  constructor(private router: Router, private route: ActivatedRoute, private clientService: ClientsService) {}

  @Input() stepTitle = '';
  @Input() stepDoneText = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe((val) => {
      this.currentStep = val.step;
    });


  }

  ngAfterContentChecked(): void {
  }

  detailsTrigger(evt: any, step: any): void {
    evt.preventDefault();
    evt.target.offsetParent.open ? evt.target.offsetParent.open = false : evt.target.offsetParent.open = true;
    this.router.navigate([], {
      queryParams: {
        ...this.route.snapshot.queryParams,
        step,
      },
    });
    this.clientService.currentStepTitle = this.stepTitle;
  }
}
