import {
  AfterContentInit,
  Component,
  ContentChildren, Input, OnDestroy,
  OnInit,
  QueryList,
} from '@angular/core';
import { StepComponent } from '../step/step.component';
import { ActivatedRoute, Router } from '@angular/router';
import {ClientsService} from '../../../services/clients.service';
import {BehaviorSubject, Subscription} from 'rxjs';

@Component({
  selector: 'app-stepper-wrapper',
  template: `
    <ng-content></ng-content>
  `,
  styles: [],
})
export class StepperWrapperComponent implements OnInit, AfterContentInit, OnDestroy {

  private sb!: Subscription;
  @ContentChildren(StepComponent) stepComponent!: QueryList<StepComponent>;

  constructor(private router: Router, private route: ActivatedRoute, private clientsService: ClientsService) {}

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    this.stepComponent.first.isFirst = true;
    this.stepComponent.last.isLast = true;

    this.route.queryParams.subscribe((val) => {
      if (this.route.snapshot.routeConfig?.path === 'clients/detail') {
        this.clientsService.contractDetails(this.route.snapshot.queryParams.contract).subscribe(value => {
          this.clientsService.contractInfo.next(value);
          this.clientsService.taskList.next(value.tasks.map((el: any) => el.task_step));

          this.stepComponent.toArray().forEach((step: StepComponent, idx: number) => {

            step.currentStep = Number(val.step);
            step.status = value?.tasks?.find((el: any) => Number(el.task_step) === Number(step.step))?.task_status;
            step.taskId = value?.tasks?.find((el: any) => Number(el.task_step) === Number(step.step))?.task_id;
            step.currentTaskStep = Number(value?.current_task?.task_step);
          });
        });
        // this.sb = this.clientsService.contractInfo.subscribe(value => {
        //   if (value) {
        //     this.stepComponent.toArray().forEach((step: StepComponent, idx: number) => {
        //
        //       step.currentStep = Number(val.step);
        //       step.status = value?.tasks?.find((el: any) => Number(el.task_step) === Number(step.step))?.task_status;
        //       step.taskId = value?.tasks?.find((el: any) => Number(el.task_step) === Number(step.step))?.task_id;
        //       step.currentTaskStep = Number(value?.current_task?.task_step);
        //     });
        //   }
        // });
        this.sb = this.clientsService
          .getTask(val.id, val.step)
          .subscribe((value) => {
            this.clientsService.taskInfo.next(value);
            this.clientsService.lastAction.next(value.body?.history?.array[value.body.history?.array.length - 1]);
            this.clientsService.taskHistory.next(value.body?.history?.array);
            this.clientsService.sp.next(value.sp);
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.sb.unsubscribe();
  }
}
