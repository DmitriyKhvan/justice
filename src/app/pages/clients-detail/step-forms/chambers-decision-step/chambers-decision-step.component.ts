import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MainService } from '../../../../services/main.service';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ClientsService } from '../../../../services/clients.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

declare var $: any;
@Component({
  selector: 'app-chambers-decision-step',
  templateUrl: './chambers-decision-step.component.html',
  styleUrls: ['./chambers-decision-step.component.scss'],
})
export class ChambersDecisionStepComponent implements OnInit, OnDestroy {
  @Input() step!: any;

  formBtnText = 'следующий шаг';

  stepStatus = 0;
  taskId!: any;
  taskInfo: any;
  lastAction: any;

  constructor(
    public mainService: MainService,
    public clientsService: ClientsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  private sb!: Subscription | undefined;

  stepForm!: FormGroup;

  toCourt = true;

  ngOnInit(): void {
    this.stepForm = new FormGroup({
      task_number: new FormControl(''),
      task_id: new FormControl(''),
      in_doc_number: new FormControl('', Validators.required),
      in_doc_date: new FormControl('', Validators.required),
      files: new FormControl([], Validators.required),
      to_court: new FormControl(true, Validators.required),
      reason: new FormControl(null),
      add_info: new FormControl(''),
      activation_date: new FormControl(''),
    });

    this.sb = this.clientsService.contractInfo.subscribe(value => {
      value?.tasks?.forEach((el: any) => {
        if (Number(el.task_step) === this.step) {
          this.stepStatus = el.task_status;
          this.taskId = el.task_id;
        }
      });

      if (this.taskId) {
        this.clientsService
          .getTask(this.taskId, this.step)
          .subscribe((value2) => {
            this.taskInfo = value2;
            if (value2.body.history) {
              this.lastAction = value2.body.history.array[value2.body.history.array.length - 1];
            }
          });
      }
    });

    this.sb = this.stepForm.get('reason')?.valueChanges.subscribe((val) => {
      if (val === 1) {
        this.formBtnText = 'Закрыть дело';
      } else if (val === 2) {
        this.formBtnText = 'Временно приостановить';
      } else if (val === 1) {
        this.formBtnText = 'Отложить временно';
      }
    });
    this.sb = this.stepForm.get('to_court')?.valueChanges.subscribe((val) => {
      const validators: ValidatorFn[] = [Validators.required];
      this.toCourt = val;
      if (val) {
        this.stepForm.get('reason')?.clearValidators();
        this.stepForm.get('activation_date')?.clearValidators();
      } else {
        this.stepForm.get('reason')?.setValue(null);
        this.stepForm.get('activation_date')?.setValue('');
        this.stepForm.get('reason')?.setValidators(validators);
        this.stepForm.get('activation_date')?.setValidators(validators);
      }
    });
  }

  ngOnDestroy(): void {
    this.sb?.unsubscribe();
  }

  logger(evt: any): void {
    console.log(evt);
  }

  nextStep(): void {
    if (this.stepStatus === 0) {
      this.stepForm.patchValue({ task_number: String(this.step) });
      this.stepForm.patchValue({ task_id: this.taskId });
      this.complete(this.stepForm.value);
      this.stepForm.reset();
      this.stepForm.disable();
    }
  }

  complete(body: any): void {
    this.clientsService.completeTaskStep(body).subscribe((val: any) => {
      this.router.navigate([], {
        queryParams: {
          ...this.route.snapshot.queryParams,
          step: val.current_task.task_step,
        },
      });
      this.stepStatus = val.current_task.task_status;
      if (val.body) {
        this.taskInfo = val;
      }
      if (val.body.history) {
        this.lastAction = val.body.history.array[val.body.history.array.length - 1];
      }
    });
  }

  getRelativeTime(): any {
    return moment(
      new Date(
        this.lastAction?.activation_date?.split('.').reverse().join(',')
      )
    )
      .locale('ru')
      .toNow(true);
  }
}
