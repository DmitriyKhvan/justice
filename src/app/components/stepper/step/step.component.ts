import { ConstantPool } from '@angular/compiler';
import {
  Component,
  OnInit,
  Input,
  DoCheck,
  AfterContentChecked,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from '../../../services/clients.service';
import { Observable, Subscription } from 'rxjs';
import { MainService } from '../../../services/main.service';

@Component({
  selector: 'app-step',
  template: `
    <details
      class="step"
      [class.step-last]="isLast"
      [class.step-current]="step <= currentTaskStep"
      [open]="isOpen()"
      #stepRef
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
          {{ step }}
        </div>
        <div class="title">
          {{ stepTitle }}
          <div
            [class.text-danger]="status === -1"
            [class.text-success]="status === 1 || status === 3"
            [class.text-warning]="status === 2 || status === 4"
            [ngSwitch]="status"
          >
            <!--            *ngIf="status"-->
            <span *ngSwitchCase="-1">Заявка отклонена</span>
            <span *ngSwitchCase="1">{{ stepDoneText }}</span>
            <span *ngSwitchCase="2">Заявка в ожидании</span>
            <span *ngSwitchCase="3">Заявка одобрена</span>
            <span *ngSwitchCase="4">Подача новой заявки</span>
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
export class StepComponent implements OnInit, AfterViewInit {
  @ViewChild('stepRef') stepRef!: ElementRef;
  isLast = false;
  isFirst = false;
  currentStep = 1;

  currentTaskStep = 1;

  @Input() status: any = 0;
  @Input() step: any = 0;
  @Input() taskId!: any;
  @Input() stepTitle = '';
  @Input() stepDoneText = '';

  // private sb!: Subscription;
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private clientsService: ClientsService,
    private mainService: MainService
  ) {}

  ngOnInit(): void {
    // this.route.queryParams.subscribe(val => {
    //   console.log(val);
    //   console.log(this.clientsService.contractInfo);
    // });

    // console.log(this.isOpen());
    // this.sb = this.clientsService.contractInfo.subscribe(value => {
    //   value?.tasks.forEach((el: any) => {
    //     if (Number(el.task_step) === this.step) {
    //       this.taskId = el.task_id;
    //       console.log(this.taskId);
    //     }
    //   });
    //
    //   if (this.taskId) {
    //     // this.id.emit(this.taskId);
    //     // this.clientsService
    //     //   .getTask(this.taskId, this.step)
    //     //   .subscribe((value2) => {
    //     //     this.taskInfo = value2;
    //     //     if (value2.body.history) {
    //     //       this.lastAction = value2.body.history.array[value2.body.history.array.length - 1];
    //     //     }
    //     //   });
    //   }
    // });
  }

  ngAfterViewInit(): void {
    // console.dir(this.stepRef.nativeElement);
    if (this.stepRef.nativeElement.open) {
      // console.log('qwe');
      //   this.clientsService
      //     .getTask(this.taskId, this.step)
      //     .subscribe((value) => {
      //       console.log(value);
      //       this.clientsService.taskInfo.next(value);
      //     });
    }
  }

  detailsTrigger(evt: any, step: any): void {
    evt.preventDefault();

    if (step <= this.currentTaskStep) {
      this.clientsService.currentStepTitle = this.stepTitle;
      evt.target.offsetParent.open
        ? (evt.target.offsetParent.open = false)
        : (evt.target.offsetParent.open = true);
      // if (evt.target.offsetParent.open) {
      //   evt.target.offsetParent.open = false;
      // } else {
      //   evt.target.offsetParent.open = true;
      //   // @ts-ignore
      //   // if (this.clientsService.taskInfo?.body.id !== this.taskId) {
      //   //   console.log('qwe');
      //   //   // this.clientsService
      //   //   //   .getTask(this.taskId, this.step)
      //   //   //   .subscribe((value) => {
      //   //   //     console.log(value);
      //   //   //     this.clientsService.taskInfo.next(value);
      //   //   //   });
      //   // }
      // }
      this.router.navigate([], {
        queryParams: {
          ...this.route.snapshot.queryParams,
          step,
          id: this.taskId
        },
      });
    }

    // if (this.currentStep < step) {
    //   evt.preventDefault();
    // } else if (this.currentStep === step) {
    //   this.clientsService.currentStepTitle = this.stepTitle;
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
    return (
      this.currentStep === Number(this.step) &&
      Number(this.step) <= this.currentTaskStep
    );
  }
}
