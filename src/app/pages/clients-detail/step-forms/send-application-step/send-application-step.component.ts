import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input, OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FileUploadService } from '../../../../services/file-upload.service';
import { ClientsDetailComponent } from '../../clients-detail.component';
import {FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import { MainService } from '../../../../services/main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from '../../../../services/clients.service';
import {Subscription} from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-send-application-step',
  templateUrl: './send-application-step.component.html',
  styleUrls: ['./send-application-step.component.scss'],
})
export class SendApplicationStepComponent implements OnInit, OnDestroy {
  @Input() step!: any;
  @Output() status: EventEmitter<any> = new EventEmitter();

  stepStatus = 0;

  taskId!: any;

  taskInfo: any;

  classByStatus = [
    {
      key: 0,
      value: '',
    },
    {
      key: 1,
      value: 'success',
    },
    {
      key: 2,
      value: 'warning',
    },
    {
      key: 3,
      value: 'success',
    },
    {
      key: -1,
      value: 'danger',
    },
  ];

  statusDict = [
    {
      key: 0,
      value: 'Актив',
    },
    {
      key: 1,
      value: 'Выполнено',
    },
    {
      key: 2,
      value: 'В ожидании',
    },
    {
      key: 3,
      value: 'Одобрено',
    },
    {
      key: -1,
      value: 'Отклонено',
    },
  ];

  constructor(
    public mainService: MainService,
    public clientsService: ClientsService,
    public fileUploadService: FileUploadService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  sendFilesForm!: FormGroup;

  mainLawForm!: FormGroup;

  completeAppForm!: FormGroup;

  private sb!: Subscription | undefined;

  ngOnInit(): void {
    // this.sendFilesForm = new FormGroup({
    //   files: new FormControl([], Validators.required),
    //   add_info: new FormControl(''),
    // });

    this.sendFilesForm = this.fb.group({
      files: [[], Validators.required],
      add_info: ['']
    });

    this.mainLawForm = this.fb.group({
      main_law_decision: [null, Validators.required],
      main_law_info: ['']
    });

    this.completeAppForm = this.fb.group({
      out_doc_number: ['', Validators.required],
      out_doc_date: ['', Validators.required],
      files: [[], Validators.required],
    });

    this.subscribeMainLawDecision();

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

  ngOnDestroy(): void {
    this.sb?.unsubscribe();
  }

  private subscribeMainLawDecision(): void {
    const decision = this.mainLawForm.get('main_law_decision');
    const info = this.mainLawForm.get('main_law_info');
    this.sb = decision?.valueChanges.subscribe(val => {
      console.log(val);
      if (val === null || val === -1) {
        const validators: ValidatorFn[] = [
          Validators.required,
        ];
        info?.setValidators(validators);
      } else {
        info?.clearValidators();
      }
      info?.updateValueAndValidity();
    });
  }

  nextStep(): void {
    if (this.stepStatus === 0 || this.stepStatus === -1) {
      const reqBody = {
        task_number: String(this.step),
        task_id: this.taskId,
        add_info: this.sendFilesForm.value.add_info,
        body: this.sendFilesForm.value.files,
      };
      this.complete(reqBody);
      this.sendFilesForm.reset();
    } else if (this.stepStatus === 2) {
      const reqBody = {
        task_id: this.taskId,
        task_number: String(this.step),
        main_law_decision: this.mainLawForm.value.main_law_decision,
        main_law_info: this.mainLawForm.value.main_law_info,
      };
      // console.log(reqBody);
      this.complete(reqBody);
      this.mainLawForm.reset();
    } else if (this.stepStatus === 3) {
      const reqBody = {
        task_id: this.taskId,
        task_number: String(this.step),
        out_doc_number: this.completeAppForm.value.out_doc_number,
        out_doc_date: this.completeAppForm.value.out_doc_date,
        files: this.completeAppForm.value.files
      };
      // console.log(reqBody);
      this.complete(reqBody);
      this.completeAppForm.reset();
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

      this.taskId = val.current_task.task_id;
      this.stepStatus = val.current_task.task_status;
      this.taskInfo = val;
      // this.step = val.current_task.task_step;
      this.status.emit(this.stepStatus);
    });
  }

  setClass(pld: string): any {
    return `${pld}-${
      this.classByStatus.find((el) => el.key === this.stepStatus)?.value
    }`;
  }

  getStatusText(): any {
    return this.statusDict.find((el: any) => el.key === this.stepStatus)?.value;
  }
}
