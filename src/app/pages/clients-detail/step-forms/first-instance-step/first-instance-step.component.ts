import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MainService } from '../../../../services/main.service';
import { ClientsService } from '../../../../services/clients.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-first-instance-step',
  templateUrl: './first-instance-step.component.html',
  styleUrls: ['./first-instance-step.component.scss'],
})
export class FirstInstanceStepComponent implements OnInit, OnDestroy {
  @Input() step!: any;
  @Output() status: EventEmitter<any> = new EventEmitter();

  stepStatus = 0;
  taskId!: any;
  taskInfo: any;
  lastAction: any;

  sb!: Subscription | undefined;

  constructor(
    public mainService: MainService,
    public clientsService: ClientsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  stepForm!: FormGroup;

  sp!: any;

  ngOnInit(): void {
    this.stepForm = new FormGroup({
      task_number: new FormControl(null),
      task_id: new FormControl(null),
      decision_date: new FormControl(null),
      decision_result: new FormControl(null),
      appeal: new FormControl(false),
      appeal_t_appeal_type: new FormControl(null),
      appeal_t_total_sum: new FormControl(null),
      appeal_t_total_debt: new FormControl({
        value: '100 000 000',
        disabled: true,
      }),
      appeal_t_penalty_sum: new FormControl(null),
      appeal_t_state_duty_sum: new FormControl(null),
      files: new FormControl([]),
      appeal_f_action: new FormControl(null, Validators.required),
      activation_date: new FormControl(null),
      add_info: new FormControl(null),
    });

    this.sb = this.clientsService.contractInfo.subscribe(value => {
      value?.tasks?.forEach((el: any) => {
        if (Number(el.task_step) === this.step) {
          this.stepStatus = el.task_status;
          this.taskId = el.task_id;
        }
      });
    });

    this.sb = this.clientsService.taskInfo.subscribe(value =>  this.taskInfo = value);
    this.sb = this.clientsService.lastAction.subscribe(value => this.lastAction = value);

    this.sb = this.stepForm.get('appeal')?.valueChanges.subscribe((val) => {
      this.resetField([
        'appeal_f_action',
        'appeal_t_appeal_type',
        'appeal_t_total_sum',
        'appeal_t_penalty_sum',
        'appeal_t_state_duty_sum',
      ]);
      if (val) {
        this.setValidator(['appeal_t_appeal_type',
          'appeal_t_total_sum',
          'appeal_t_penalty_sum',
          'appeal_t_state_duty_sum']);

        this.clearValidator(['appeal_f_action', 'activation_date']);
      } else {
        this.setValidator(['appeal_t_appeal_type']);

        this.clearValidator(['appeal_t_appeal_type',
          'appeal_t_total_sum',
          'appeal_t_penalty_sum',
          'appeal_t_state_duty_sum']);
      }
    });
    this.sb = this.stepForm
      .get('appeal_f_action')
      ?.valueChanges.subscribe((val) => {
        if (val === 2) {
          this.setValidator(['activation_date']);
        } else {
          this.resetField(['activation_date']);
          this.clearValidator(['activation_date']);
        }
      });
  }

  ngOnDestroy(): void {
    this.sb?.unsubscribe();
  }

  nextStep(): void {
    if (this.stepStatus === 0) {
      this.stepForm.patchValue({ task_number: String(this.step) });
      this.stepForm.patchValue({ task_id: this.taskId });
      this.complete(this.stepForm.value);
      this.stepForm.reset();
    }
  }

  complete(body: any): void {
    this.clientsService.completeTaskStep(body).subscribe((val: any) => {
      this.router.navigate([], {
        queryParams: {
          ...this.route.snapshot.queryParams,
          step: val.current_task.task_step,
          id: val.current_task.task_id
        },
      });
      this.clientsService.contractInfo.next(val);
      this.clientsService.lastAction.next(val.body.history?.array[val.body.history.array.length - 1]);
      this.clientsService.taskHistory.next(val.body.history);
      this.status.emit(this.stepStatus);
    });
  }

  resetField(arr: any = []): void {
    arr.forEach((el: string) => {
      this.stepForm.get(el)?.reset();
    });
  }

  setValidator(arr: any = []): void {
    const validators: ValidatorFn[] = [Validators.required];
    arr.forEach((el: string) => {
      this.stepForm.get(el)?.setValidators(validators);
      this.stepForm.get(el)?.updateValueAndValidity({ onlySelf: true });
    });
  }

  clearValidator(arr: any = []): void {
    arr.forEach((el: string) => {
      this.stepForm.get(el)?.clearValidators();
      this.stepForm.get(el)?.updateValueAndValidity({ onlySelf: true });
    });
  }

  getRelativeTime(): any {
    return moment(
      new Date(this.lastAction?.activation_date?.split('.').reverse().join(','))
    )
      .locale('ru')
      .toNow(true);
  }

  getSPValue(sp: string, key: any): void {
    if (this.taskInfo.sp) {
      return this.taskInfo.sp[sp]?.find((el: any) => el.key === key)?.value;
    }
  }
}
