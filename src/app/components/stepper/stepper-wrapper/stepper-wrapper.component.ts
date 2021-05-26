import {
  AfterContentInit,
  Component,
  ContentChildren, Input,
  OnInit,
  QueryList,
} from '@angular/core';
import { StepComponent } from '../step/step.component';
import { ActivatedRoute, Router } from '@angular/router';
import {ClientsService} from '../../../services/clients.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-stepper-wrapper',
  template: `
    <ng-content></ng-content>
  `,
  styles: [],
})
export class StepperWrapperComponent implements OnInit, AfterContentInit {

  taskInfo!: any;
  currentStep = 1;

  @ContentChildren(StepComponent) stepComponent!: QueryList<StepComponent>;

  constructor(private router: Router, private route: ActivatedRoute, private clientsService: ClientsService) {}

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    this.stepComponent.first.isFirst = true;
    this.stepComponent.last.isLast = true;


    this.route.queryParams.subscribe((val) => {
      if (this.route.snapshot.routeConfig?.path === 'clients/detail') {
        this.clientsService.contractDetails(val.contract).subscribe(value => {
          this.taskInfo = value;

          this.stepComponent.toArray().forEach((step: StepComponent, idx: number) => {
            step.currentStep = Number(val.step);
            step.status = value.tasks.find((el: any) => Number(el.task_step) === Number(step.step))?.task_status;
            step.currentTaskStep = Number(value.current_task.task_step);
          });
        });
      }
    });
  }
}
