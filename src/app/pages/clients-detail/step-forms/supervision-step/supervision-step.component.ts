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
    });
  }
}
