import { Component, Input, OnInit } from '@angular/core';
import { ClientsService } from '../../../../services/clients.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../../../../services/main.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-send-alert-step',
  templateUrl: './send-alert-step.component.html',
  styleUrls: ['./send-alert-step.component.scss'],
})
export class SendAlertStepComponent implements OnInit {
  @Input() step!: any;
  stepStatus = 0;
  taskId: any;
  taskInfo: any;

  constructor(
    public mainService: MainService,
    public clientsService: ClientsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  stepForm!: FormGroup;
  disabled = false;

  ngOnInit(): void {
    this.stepForm = new FormGroup({
      files: new FormControl([], Validators.required),
    });

    this.route.queryParams.subscribe((value) => {
      this.clientsService
        .contractDetails(value.contract)
        .subscribe((value1) => {
          this.stepStatus = value1.tasks.find(
            (el: any) => Number(el.task_step) === this.step
          )?.task_status;
          this.taskId = value1.tasks.find(
            (el: any) => Number(el.task_step) === this.step
          )?.task_id;

          this.clientsService
            .getTask(this.taskId, this.step)
            .subscribe((value2) => {
              this.taskInfo = value2;
              if (this.stepStatus === 1) {
                this.disabled = true;
                this.stepForm.controls.files.setValue(value2.body.files);
                this.stepForm.controls.files.disable();
              }
            });
        });
    });
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
      this.taskId = val.current_task.task_id;
      this.stepStatus = val.current_task.task_status;
    });
  }
}
