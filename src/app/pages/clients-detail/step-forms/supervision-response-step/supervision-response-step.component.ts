import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { Subscription } from 'rxjs';
import { MainService } from '../../../../services/main.service';
import { ClientsService } from '../../../../services/clients.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-supervision-response-step',
  templateUrl: './supervision-response-step.component.html',
  styles: [],
})
export class SupervisionResponseStepComponent implements OnInit, OnDestroy {
  @Input() step!: any;
  @Output() status: EventEmitter<any> = new EventEmitter();

  stepStatus = 0;
  taskId!: any;
  taskInfo: any;
  lastAction: any;

  sb!: Subscription;

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
      decision_date: new FormControl(null),
      action: new FormControl(null, Validators.required),
      files: new FormControl([]),
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
  }
  ngOnDestroy(): void {
    this.sb.unsubscribe();
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

  getRelativeTime(): any {
    return moment(
      new Date(this.lastAction?.activation_date?.split('.').reverse().join(','))
    )
      .locale('ru')
      .toNow(true);
  }

  getSPValue(sp: string, key: any): void {
    if (this.taskInfo.sp) {
      return this.taskInfo?.sp[sp]?.find((el: any) => el.key === key)?.value;
    }
  }
}
