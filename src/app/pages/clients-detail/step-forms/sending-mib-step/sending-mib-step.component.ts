import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { MainService } from '../../../../services/main.service';
import { Subscription } from 'rxjs';
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
  selector: 'app-sending-mib-step',
  templateUrl: './sending-mib-step.component.html',
  styleUrls: ['./sending-mib-step.component.scss'],
})
export class SendingMibStepComponent implements OnInit, OnDestroy {
  @Input() step!: any;

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
  private sb!: Subscription;
  stepForm!: FormGroup;

  ngOnInit(): void {
    this.stepForm = new FormGroup({
      task_number: new FormControl(null),
      task_id: new FormControl(null),
      out_doc_number: new FormControl(null),
      out_doc_date: new FormControl(null),
      files: new FormControl([]),
      add_info: new FormControl(null),
    });

    this.sb = this.clientsService.contractInfo.subscribe((value) => {
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
              this.lastAction =
                value2.body.history.array[value2.body.history.array.length - 1];
            }
          });
      }
    });
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
      console.log('next step', val);
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
        this.lastAction =
          val.body.history.array[val.body.history.array.length - 1];
      }
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
    return this.taskInfo?.sp[sp].find((el: any) => el.key === key)?.value;
  }
}
