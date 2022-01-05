import { Component, Input, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-file-downloader',
  template: `
    <div
      class="fileList"
      *ngFor="
        let file of this.formData.data.files.length
          ? this.formData.data.files
          : this.formData.data.appealFiles
      "
      (click)="downloadFile(file.id, file.name)"
    >
      <i class="icon-attach mr-1"></i>
      <div class="file-field__list_text ml-1">
        {{ file.name }}
      </div>
    </div>
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
    `,
  ],
})
export class FileDownloaderComponent implements OnInit {
  constructor(public fileUploadService: FileUploadService) {}

  @Input() formData: any = null;

  ngOnInit(): void {}

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
}
