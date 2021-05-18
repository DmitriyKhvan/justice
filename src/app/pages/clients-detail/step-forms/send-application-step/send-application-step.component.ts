import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FileUploadService } from '../../../../services/file-upload.service';
import { ClientsDetailComponent } from '../../clients-detail.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../../../../services/main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from '../../../../services/clients.service';
declare var $: any;
@Component({
  selector: 'app-send-application-step',
  templateUrl: './send-application-step.component.html',
  styleUrls: ['./send-application-step.component.scss'],
})
export class SendApplicationStepComponent implements OnInit {
  @Input() step!: any;
  @Output() status: EventEmitter<any> = new EventEmitter();

  stepStatus = 0;

  taskId!: any;

  disabled = true;

  selectedOpinion: any;

  taskInfo: any;

  uploadedFiles: any = [];

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
    private route: ActivatedRoute
  ) {}

  appForm!: FormGroup;

  ngOnInit(): void {
    this.appForm = new FormGroup({
      outDocNumber: new FormControl('', Validators.required),
      outDocDate: new FormControl('', Validators.required),
      comment: new FormControl(''),
    });

    // console.log(this.appForm.get('outDocDate')?.errors?.required);

    this.route.queryParams.subscribe((value) => {
      this.clientsService
        .contractDetails(value.contract)
        .subscribe((value1) => {
          this.stepStatus = value1.tasks.find(
            (el: any) => el.task_step === this.step
          )?.task_status;
          this.taskId = value1.tasks.find(
            (el: any) => el.task_step === this.step
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

    this.fileUploadService.currentUploaderFiles.subscribe((data) => {
      this.uploadedFiles = data;
    });
  }

  nextStep(): void {
    if (this.stepStatus === 0 || this.stepStatus === -1) {
      const uploadFiles: Array<object> = [];
      this.fileUploadService.currentUploaderFiles.subscribe((data) => {
        data.forEach((el) => {
          uploadFiles.push({
            id: el.fileId,
            name: el.fileName,
            type: el.fileType,
          });
        });
      });
      const reqBody = {
        task_id: this.taskId,
        task_number: this.step,
        add_info: this.appForm.value.comment,
        body: uploadFiles,
      };
      this.complete(reqBody);
      this.fileUploadService.UploaderFiles.next([]);
    } else if (this.stepStatus === 2) {
      const reqBody = {
        task_id: this.taskId,
        task_number: this.step,
        main_law_decision: this.selectedOpinion,
        main_law_info: this.appForm.value.comment,
      };
      // console.log(reqBody);
      this.complete(reqBody);
    } else if (this.stepStatus === 3) {
      const reqBody = {
        task_id: this.taskId,
        task_number: this.step,
        out_doc_number: this.appForm.value.outDocNumber,
        out_doc_date: '12.05.2021',
      };
      // console.log(reqBody);
      this.complete(reqBody);
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
      this.appForm.reset();
      this.taskId = val.current_task.task_id;
      this.stepStatus = val.current_task.task_status;
      this.taskInfo = val;
      // this.step = val.current_task.task_step;
      this.router.navigate([], {
        queryParams: {
          ...this.route.snapshot.queryParams,
          step: val.current_task.task_step,
        },
      });
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

  getBtnStatus(): any {
    if (this.stepStatus === 0 || this.stepStatus === -1) {
      return !this.uploadedFiles.length;
    } else if (this.stepStatus === 3) {
      return (
        this.appForm.get('outDocNumber')?.errors?.required &&
        this.appForm.get('outDocDate')?.errors?.required
      );
    }
  }

  logger(pld: any): void {
    console.log(pld);
  }
}
