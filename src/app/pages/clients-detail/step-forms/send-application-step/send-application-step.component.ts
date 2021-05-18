import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
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
export class SendApplicationStepComponent implements OnInit, AfterContentInit {
  @Input() step!: any;

  stepStatus = 0;

  taskId!: any;

  disabled = false;

  selectedOpinion: any;

  taskInfo: any;

  opinion = [
    { id: 3, label: 'Одобрить' },
    { id: -1, label: 'Отклонить' },
  ];

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
      outDate: new FormControl(''),
      inDate: new FormControl(''),
      comment: new FormControl(''),
    });

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

          console.log('step', this.step);
          console.log('status', this.stepStatus);
          console.log('taskId', this.taskId);
          console.log('details', value1);
          if (this.taskId) {
            this.clientsService
              .getTask(this.taskId, this.step)
              .subscribe((value2) => {
                console.log('val', value2);
                this.taskInfo = value2;
              });
          }
        });
    });
    console.log('init');
  }
  ngAfterContentInit(): void {
    console.log('id', this.taskId);
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
      console.log(reqBody);
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
      this.step = val.current_task.task_step;
      console.log(val);
    });
  }

  setClass(pld: string): any {
    if (pld === 'text') {
      return `text-${
        this.classByStatus.find((el) => el.key === this.stepStatus)?.value
      }`;
    }
    // return pld === 'text' ? `text-${this.classByStatus.find(el => el.key === this.stepStatus)?.value}` : '';
  }

  getStatusText(): any {
    return this.statusDict.find((el) => el.key === this.stepStatus)?.value;
  }
}
