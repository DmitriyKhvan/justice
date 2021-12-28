import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { FileUploadService } from '../../../services/file-upload.service';

@Component({
  selector: 'app-file-uploader',
  template: `
    <!-- <pre>

    {{ fileUploadService.allUploadFiles | json }}

    {{ uploadFilesCount }}
  </pre
    > -->
    <div *ngIf="!this.formData; else fileList" class="file_field">
      <div class="file-field__title mb-1">{{ title }}</div>
      <div class="file-field__list mb-2">
        <!-- {{ uploadFilesCount }}
        <pre>
        {{ fileUploadService.allUploadFiles | json }}
        </pre
        > -->
        <!-- <div
          *ngFor="
            let item of uploadFilesCount
              ? fileUploadService.allUploadFiles.slice(0, -uploadFilesCount)
              : fileUploadService.allUploadFiles.slice(0);
            index as i
          "
          class="file-field__list_item py-1"
        >
          <i class="icon-attach mr-1"></i>
          <div class="file-field__list_text ml-1">
            {{ item.fileName }}
          </div>
          <div class="position-relative">
            <i class="icon-close_2 ml-1" (click)="showTooltip($event)"></i>
            <div class="tooltip tooltip-right">
              <div class="tooltip-content">Удалить файл?</div>
              <div class="tooltip-action">
                <button
                  class="btn btn-outlined-white mx-1"
                  (click)="hideTooltip($event)"
                >
                  Нет
                </button>
                <button
                  class="btn btn-filled-white"
                  (click)="deleteFile(item.fileName, 'allUploadFiles')"
                >
                  Да
                </button>
              </div>
            </div>
          </div>
        </div> -->

        <div
          *ngFor="let item of currentUploadFiles; index as i"
          class="file-field__list_item py-1"
        >
          <svg
            viewBox="0 0 36 36"
            class="circular-chart default"
            *ngIf="item.fileUploaded < 100"
          >
            <path
              class="circle-bg"
              d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            ></path>
            <path
              class="circle"
              attr.stroke-dasharray="{{ item.fileUploaded }}, 100"
              d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            ></path>
          </svg>
          <i *ngIf="item.fileUploaded === 100" class="icon-attach mr-1"></i>
          <div class="file-field__list_text ml-1">
            {{ item.fileName }}
          </div>
          <div class="position-relative">
            <i class="icon-close_2 ml-1" (click)="showTooltip($event)"></i>
            <div class="tooltip tooltip-right">
              <div class="tooltip-content">Удалить файл?</div>
              <div class="tooltip-action">
                <button
                  class="btn btn-outlined-white mx-1"
                  (click)="hideTooltip($event)"
                >
                  Нет
                </button>
                <button
                  class="btn btn-filled-white"
                  (click)="deleteFile(item.fileName, 'currentUploadFiles')"
                >
                  Да
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <label
        class="file-field__uploadbtn mb-2"
        [class]="formTemplate ? 'readonly' : ''"
      >
        <ng-container
          *ngIf="currentUploadFiles.length; then elseBtnText; else btnText"
        >
        </ng-container>
        <ng-template #btnText> Добавить файл </ng-template>
        <ng-template #elseBtnText> Добавить еще один файл </ng-template>
        <!-- accept="image/jpeg, image/jpg, application/pdf" -->
        <input
          [disabled]="formTemplate"
          type="file"
          multiple
          (input)="changed(); fileUploadService.poster($event)"
        />
      </label>
    </div>

    <ng-template #fileList>
      <div
        class="fileList"
        *ngFor="let file of this.formData.data.files"
        (click)="downloadFile(file.id, file.name)"
      >
        <i class="icon-attach mr-1"></i>
        <div class="file-field__list_text ml-1">
          {{ file.name }}
        </div>
      </div>
    </ng-template>
  `,
  styles: [
    `
      .fileList {
        display: flex;
        align-items: center;
        cursor: pointer;
      }
      .fileList:hover {
        background: rgba(16, 39, 74, 0.1);
      }
      .fileList i {
        font-size: 24px;
      }

      .readonly {
        opacity: 0.3;
        border: 1px dashed #10274a;
      }
    `,
  ],
})
export class FileUploaderComponent implements OnInit, OnDestroy {
  constructor(
    public fileUploadService: FileUploadService // public clientDetail: ClientsDetailComponent
  ) {}

  @Input() title: any = 'Прикрепить скан документа';
  @Input() formData: any = null;
  @Input() formTemplate: any = null;

  @Output() fileSelected: EventEmitter<any> = new EventEmitter();

  acceptList = [];

  currentUploadFiles: Array<any> = [];
  // allUploadFiles: any[] = [];
  uploadFilesCount: number = 0;

  ngOnInit(): void {
    // console.log(
    //   'this.fileUploadService.currentUploaderFiles',
    //   this.fileUploadService.currentUploaderFiles
    // );

    // выяснить почему два раза запускается
    this.fileUploadService.currentUploaderFiles.subscribe((data) => {
      // this.fileUploadService.allUploadFiles = [];

      this.currentUploadFiles = data;

      this.currentUploadFiles.forEach((i) => {
        this.uploadFilesCount++;
        this.fileUploadService.allUploadFiles.push(i);
      });
    });
  }

  downloadFile(id: number, filename: string | null = null) {
    this.fileUploadService.downloadFile(id).subscribe((response: any) => {
      let dataType = response.type;

      let downloadLink = document.createElement('a');
      let url = window.URL.createObjectURL(
        new Blob([response], { type: dataType })
      );
      downloadLink.href = url;
      // var page = window.open(url);
      // page?.print();
      if (filename) downloadLink.setAttribute('download', filename);
      document.body.appendChild(downloadLink);
      downloadLink.click();
      window.URL.revokeObjectURL(url);
      downloadLink.remove();
    });
  }

  showTooltip(evt: any): void {
    evt.target.nextElementSibling.classList.add('tooltip-active');
  }

  hideTooltip(evt: any): void {
    evt.preventDefault();
    evt.target.offsetParent.classList.remove('tooltip-active');
    // console.dir(evt.target.offsetParent);
  }

  changed(): void {
    this.uploadFilesCount = 0;
    // this.uploadFiles.length
    //   ? this.fileSelected.emit(true)
    //   : this.fileSelected.emit(false);
  }

  deleteFile(fileName: any, flag: string): void {
    // console.log('fileName', fileName);
    // console.log(' this.uploadFilesCount', this.uploadFilesCount);
    // console.log('this.allUploadFiles', this.fileUploadService.allUploadFiles);
    // console.log('this.currentUploadFiles', this.currentUploadFiles);
    // debugger;

    if (flag === 'allUploadFiles') {
      this.fileUploadService.allUploadFiles.splice(
        this.fileUploadService.allUploadFiles.findIndex(
          (el) => el.fileName === fileName
        ),
        1
      );
    } else {
      this.uploadFilesCount--;
      this.currentUploadFiles.splice(
        this.currentUploadFiles.findIndex((el) => el.fileName === fileName),
        1
      );
      this.fileUploadService.allUploadFiles.splice(
        this.fileUploadService.allUploadFiles.findIndex(
          (el) => el.fileName === fileName
        ),
        1
      );
    }

    // console.log(this.uploadFiles.findIndex(el => el.fileId === fileId));
  }

  ngOnDestroy(): void {
    this.fileUploadService.UploaderFiles.next([]);
    this.fileUploadService.allUploadFiles = [];
    this.uploadFilesCount = 0;
  }
}
