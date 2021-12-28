import { Component, Input, OnInit } from '@angular/core';
import { FileUploadService } from '../../../../services/file-upload.service';
import { ClientsService } from '../../../../services/clients.service';
import { FileUploaderComponent } from '../../../../components/formFields/file-uploader/file-uploader.component';
import { ActivatedRoute, Router } from '@angular/router';
import { parseJson } from '@angular/cli/utilities/json-file';
import { MainService } from '../../../../services/main.service';

@Component({
  selector: 'app-send-alert-step',
  templateUrl: './send-alert-step.component.html',
  styleUrls: ['./send-alert-step.component.scss'],
})
export class SendAlertStepComponent implements OnInit {
  @Input() step!: any;

  stepStatus = 0;

  taskId!: any;

  uploadFiles = [{ id: '', name: '', type: '' }];

  isSelected = false;

  constructor(
    public mainService: MainService,
    public fileUploadService: FileUploadService,
    public clientsService: ClientsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
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

          this.clientsService
            .getTask(this.taskId, this.step)
            .subscribe((value2) => {
              this.uploadFiles = value2.body.files;
            });
        });
    });
  }

  nextStep(): void {
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
      task_number: this.step,
      task_id: this.taskId,
      body: uploadFiles,
    };
    this.clientsService.completeTaskStep(reqBody).subscribe((val) => {
      this.router.navigate([], {
        queryParams: {
          ...this.route.snapshot.queryParams,
          step: val.current_task.task_step,
        },
      });
    });
    // this.clientsService
    //   .contractDetails(this.route.snapshot.queryParams.contract)
    //   .subscribe((value) => {
    //
    //   });
    this.fileUploadService.UploaderFiles.next([]);
  }

  logger(evt: any): any {}
}
