import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { MainService } from '../../../../services/main.service';
import { ClientsService } from '../../../../services/clients.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-supervision-step',
  templateUrl: './supervision-step.component.html',
  styles: [],
})
export class SupervisionStepComponent implements OnInit, OnDestroy {
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
      task_number: new FormControl(this.step),
      task_id: new FormControl(this.taskId),
      entry_date: new FormControl(''),
      files: new FormControl([], Validators.required),
      add_info: new FormControl(''),
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
}
