import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { MainService } from '../../../../services/main.service';
import { ClientsService } from '../../../../services/clients.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-response-court-step',
  templateUrl: './response-court-step.component.html',
  styleUrls: ['./response-court-step.component.scss'],
})
export class ResponseCourtStepComponent implements OnInit, OnDestroy {
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

  ngOnInit(): void {
    this.stepForm = new FormGroup({
      task_number: new FormControl(null),
      task_id: new FormControl(null),
      to_court: new FormControl(true),
      action: new FormControl(null),
      add_info: new FormControl(null),
      activation_date: new FormControl(null),
      court_case_id: new FormControl(null, Validators.required),
      court_files: new FormControl([], Validators.required),
      court_dates: new FormControl(null, Validators.required),
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

    this.sb = this.stepForm.get('to_court')?.valueChanges.subscribe((val) => {
      if (val) {
        // this.resetField(['action', 'activation_date', 'files', 'add_info']);
        this.setValidator(['court_case_id', 'court_dates']);

        this.clearValidator(['action']);
      } else {
        // this.resetField(['case_number', 'dates', 'files']);
        this.setValidator(['action']);

        this.clearValidator(['court_case_id', 'court_dates']);
      }
    });
    this.sb = this.stepForm.get('action')?.valueChanges.subscribe((val) => {
      if (val === 1) {
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
      new Date(
        this.lastAction?.activation_date?.split('.').reverse().join(',')
      )
    )
      .locale('ru')
      .toNow(true);
  }
}
