import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss'],
})
export class UploadFilesComponent implements OnInit {
  @Output() onAdd = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  @Input() title: any = 'Прикрепить скан документа';
  @Input() formTemplate: any = null;
  @Input() allFiles: any[] = [];

  selectedFiles?: FileList;
  progressInfos: any = null;
  message: string[] = [];
  fileInfos?: Observable<any>;
  tempFiles: any[] = [];

  constructor(private uploadService: FileUploadService) {}

  ngOnInit(): void {}

  showTooltip(evt: any): void {
    evt.target.nextElementSibling.classList.add('tooltip-active');
  }

  hideTooltip(evt: any): void {
    evt.preventDefault();
    evt.target.offsetParent.classList.remove('tooltip-active');
  }

  async uploadFiles(event: any): Promise<void> {
    this.message = [];
    // this.progressInfos = {};
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      for (let i = 1; i < this.selectedFiles.length; i++) {
        this.tempFiles.push(this.selectedFiles[i]);
      }
    }

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        await this.upload(i, this.selectedFiles[i]);
        this.tempFiles.splice(0, 1);
      }
    }
  }

  upload(idx: number, file: File): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      this.progressInfos = { value: 0, fileId: null, fileName: file.name };
      if (file) {
        this.uploadService.upload(file).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progressInfos.value = Math.round(
                (100 * event.loaded) / event.total
              );
            } else if (event instanceof HttpResponse) {
              this.progressInfos.fileId = event.body.file_details[0].id;

              this.onAdd.emit({
                id: event.body.file_details[0].id,
                name: file.name,
              });

              this.progressInfos = null;
              const msg = 'Uploaded the file successfully: ' + file.name;
              this.message.push(msg);
              resolve(true);
            }
          },
          (err: any) => {
            this.progressInfos.value = 0;
            const msg = 'Could not upload the file: ' + file.name;
            this.message.push(msg);
            reject(err);
          }
        );
      }
    });
  }

  deleteFile(id: number): void {
    // this.progressInfos = this.progressInfos.filter(
    //   (file) => file.fileId !== id
    // );
    this.onDelete.emit(id);
  }
}
