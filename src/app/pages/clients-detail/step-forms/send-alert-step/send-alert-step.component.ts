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
      // console.log(value);

      if (this.taskId) {
        // this.id.emit(this.taskId);
        // this.clientsService
        //   .getTask(this.taskId, this.step)
        //   .subscribe((value2) => {
        //     this.taskInfo = value2;
        //     if (value2.body.history) {
        //       this.lastAction = value2.body.history.array[value2.body.history.array.length - 1];
        //     }
        //   });
      }
    });

    this.sb = this.clientsService
      .taskInfo.subscribe((value2) => {
        this.taskInfo = value2;
        // console.log(value2);
        if (value2.body?.history) {
          this.lastAction =
            value2.body.history?.array[value2.body.history.array.length - 1];
        }
      });
  }

  ngOnDestroy(): void {
    this.sb.unsubscribe();
  }

  nextStep(): void {
    const reqBody = {
      task_number: String(this.step),
      task_id: this.taskId,
      body: this.stepForm.value.files,
    };
    this.clientsService.completeTaskStep(reqBody).subscribe((val) => {
      this.router.navigate([], {
        queryParams: {
          ...this.route.snapshot.queryParams,
          step: val.current_task.task_step,
        },
      });
      this.stepForm.reset();
      this.stepStatus = val.current_task.task_status;
    });
  }
}
