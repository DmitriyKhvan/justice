import {Component, Input, OnInit} from '@angular/core';
import { MainService } from '../../../../services/main.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../../../../services/clients.service';
import { FileUploadService } from '../../../../services/file-upload.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-chambers-decision-step',
  templateUrl: './chambers-decision-step.component.html',
  styleUrls: ['./chambers-decision-step.component.scss'],
})
export class ChambersDecisionStepComponent implements OnInit {
  @Input() step!: any;

  stepStatus = 0;
  taskId!: any;
  taskInfo: any;

  // delayReason =

  constructor(
    public mainService: MainService,
    public clientsService: ClientsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  selectedOpinion: any;

  opinion = [
    { id: 1, label: 'Одобрить' },
    { id: 2, label: 'Отказать' },
    { id: 3, label: 'Пересмотреть' },
    { id: 4, label: 'Проверить' },
  ];

  stepForm!: FormGroup;

  ngOnInit(): void {
    this.stepForm = new FormGroup({
      task_number: new FormControl(''),
      task_id: new FormControl(''),
      in_doc_number: new FormControl({ value: '', disabled: false }, Validators.required),
      in_doc_date: new FormControl({ value: '25.05.2021', disabled: false }, Validators.required),
      files: new FormControl({ value: [], disabled: false }, Validators.required),
      to_court: new FormControl({ value: true, disabled: false }, Validators.required),
      reason: new FormControl({ value: '', disabled: false }, Validators.required),
      add_info: new FormControl({ value: '', disabled: false }, Validators.required),
      activation_date: new FormControl({ value: '', disabled: false }, Validators.required),
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
          if (this.taskId) {
            this.clientsService
              .getTask(this.taskId, this.step)
              .subscribe((value2) => {
                this.taskInfo = value2;
              });
          }
        });
    });
  }

  logger(evt: any): void {
    console.log(evt);
  }

  nextStep(): void {
    if (this.stepStatus === 0 ) {
      this.stepForm.patchValue({task_number: this.step});
      this.stepForm.patchValue({task_id: this.taskId});
      this.complete(this.stepForm.value);
    }
  }

  complete(body: any): void {
    this.clientsService.completeTaskStep(body).subscribe((val: any) => {
      console.log(val);
      this.router.navigate([], {
        queryParams: {
          ...this.route.snapshot.queryParams,
          step: val.current_task.task_step,
        },
      });
      this.stepForm.reset();
      this.taskId = val.current_task.task_id;
      this.stepStatus = val.current_task.task_status;
      this.taskInfo = val;
      // this.step = val.current_task.task_step;
      // this.router.navigate([], {
      //   queryParams: {
      //     ...this.route.snapshot.queryParams,
      //     step: val.current_task.task_step,
      //   },
      // });
      // this.status.emit(this.stepStatus);
    });
  }
}
