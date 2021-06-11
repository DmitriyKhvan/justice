import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ClientsService } from '../../../../services/clients.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../../../../services/main.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-send-alert-step',
  templateUrl: './send-alert-step.component.html',
  styleUrls: ['./send-alert-step.component.scss'],
})
export class SendAlertStepComponent implements OnInit, OnDestroy {
  @Input() step!: any;
  @Output() id: EventEmitter<any> = new EventEmitter();
  stepStatus = 0;
  taskId: any;
  taskInfo: any;

  lastAction: any;

  constructor(
    public mainService: MainService,
    public clientsService: ClientsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  stepForm!: FormGroup;
  disabled = false;

  private sb!: Subscription;

  ngOnInit(): void {
    this.stepForm = new FormGroup({
      files: new FormControl([], Validators.required),
    });

    this.sb = this.clientsService.contractInfo.subscribe((value) => {
      value?.tasks?.forEach((el: any) => {
        if (Number(el.task_step) === this.step) {
          this.stepStatus = el.task_status;
          this.taskId = el.task_id;
        }
      });
    });

    this.sb = this.clientsService.taskInfo.subscribe(value => this.taskInfo = value);
    this.sb = this.clientsService.lastAction.subscribe(value => this.lastAction = value);
  }

  ngOnDestroy(): void {
    this.sb.unsubscribe();
  }

  nextStep(): void {
    const reqBody = {
      task_number: this.route.snapshot.queryParams.step,
      task_id: Number(this.route.snapshot.queryParams.id),
      body: this.stepForm.value.files,
    };
    this.clientsService.completeTaskStep(reqBody).subscribe((val) => {
      this.router.navigate([], {
        queryParams: {
          ...this.route.snapshot.queryParams,
          step: val.current_task.task_step,
          id: val.current_task.task_id
        },
      });
      this.stepForm.reset();
      this.clientsService.contractInfo.next(val);
      this.clientsService.lastAction.next(val.body.history?.array[val.body.history.array.length - 1]);
      this.clientsService.taskHistory.next(val.body.history);
    });
  }
}
