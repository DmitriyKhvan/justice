import {
  AfterContentInit,
  Component,
  ContentChildren,
  OnDestroy,
  OnInit,
  QueryList,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccordionItemComponent } from '../accordion-item/accordion-item.component';
import { ClientsService } from '../../../services/clients.service';
import { Subscription } from 'rxjs';
import { StepComponent } from '../../stepper/step/step.component';

@Component({
  selector: 'app-accordion-wrapper',
  template: ` <ng-content></ng-content> `,
  styles: [],
})
export class AccordionWrapperComponent
  implements OnInit, AfterContentInit, OnDestroy {
  private sb!: Subscription;
  @ContentChildren(AccordionItemComponent)
  accordionItemComponent!: QueryList<AccordionItemComponent>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public clientsService: ClientsService
  ) {}

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    this.accordionItemComponent.last.isLast = true;

    this.route.queryParams.subscribe((val) => {
      if (this.route.snapshot.routeConfig?.path === 'clients/history') {
        // this.sb = this.clientsService.contractDetails(val.contract).subscribe(value => {
        //   this.accordionItemComponent.toArray().forEach((step: AccordionItemComponent, idx: number) => {
        //     step.currentStep = Number(val.step);
        //     step.status = value?.tasks?.find((el: any) => Number(el.task_step) === Number(step.step))?.task_status;
        //     step.stepNumber = step.step;
        //   });
        // });
        this.clientsService.contractDetails(val.contract).subscribe((value) => {
          this.clientsService.contractInfo.next(value);
          this.clientsService.taskList.next(
            value.tasks.map((el: any) => el.task_step)
          );
          this.accordionItemComponent.toArray().forEach((step: AccordionItemComponent, idx: number) => {
              step.status = value?.tasks?.find(
                (el: any) => Number(el.task_step) === Number(step.step)
              )?.task_status;
              step.taskId = value?.tasks?.find(
                (el: any) => Number(el.task_step) === Number(step.step)
              )?.task_id;
              step.stepNumber = step.step;
            });
        });
        if (val.id) {
          this.sb = this.clientsService
            .getTask(val.id, val.step)
            .subscribe((value) => {
              this.clientsService.taskInfo.next(value);
              this.clientsService.lastAction.next(
                value.body?.history?.array[value.body?.history?.array.length - 1]
              );
              this.clientsService.taskHistory.next(value.body?.history?.array);
            });
        }
      }
    });
  }

  ngOnDestroy(): void {
    // this.sb.unsubscribe();
  }
}
