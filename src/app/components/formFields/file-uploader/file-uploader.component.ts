import {Component, Input, OnInit} from '@angular/core';
import { FileUploadService } from '../../../services/file-upload.service';
import { ClientsDetailComponent } from '../../../pages/clients-detail/clients-detail.component';

@Component({
  selector: 'app-file-uploader',
  template: `
    <div class="file_field">
      <div class="file-field__title mb-1">{{ title }}</div>
      <div class="file-field__list mb-2">
        <div
          *ngFor="let item of uploadFiles; index as i"
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
                <button class="btn btn-filled-white">Да</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <label class="file-field__uploadbtn mb-2">
        Добавить файл
        <input
          type="file"
          multiple
          (change)="fileUploadService.poster($event)"
        />
      </label>
    </div>
  `,
  styles: [],
})
export class FileUploaderComponent implements OnInit {
  constructor(
    public fileUploadService: FileUploadService
  ) // public clientDetail: ClientsDetailComponent
  {}

  @Input() title: any = 'Прикрепить скан документа';

  uploadFiles!: Array<any>;

  ngOnInit(): void {
    this.fileUploadService.currentUploaderFiles.subscribe((data) => {
      this.uploadFiles = data;
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
}
