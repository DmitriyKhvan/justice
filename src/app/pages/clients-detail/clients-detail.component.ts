import {Component, DoCheck, OnInit} from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';

declare var $: any;

@Component({
  selector: 'app-clients-detail',
  templateUrl: './clients-detail.component.html',
  styleUrls: ['./clients-detail.component.scss'],
})
export class ClientsDetailComponent implements OnInit, DoCheck {
  show = false;
  counter = 1;
  // counter2 = 1;

  constructor(public fileUploadService: FileUploadService) {}

  uploadFiles!: Array<any>;

  ngOnInit(): void {
    this.fileUploadService.currentUploaderFiles.subscribe((data) => {
      this.uploadFiles = data;
    });
  }

  ngDoCheck(): void {

  }

  showTooltip(evt: any): void {
    evt.target.nextElementSibling.classList.add('tooltip-active');
  }

  hideTooltip(evt: any): void {
    evt.preventDefault();
    evt.target.offsetParent.classList.remove('tooltip-active');
    // console.dir(evt.target.offsetParent);
  }

  loadFiles(evt: any): void {
    if (!evt.target.files.length) {
      return;
    }

    const files = Array.from(evt.target.files);

    files.forEach((file) => {
      // const reader = new FileReader();

      // reader.onload = (ev: any) => {
      //   console.log(ev.target.result);
      //   evt.target.insertAdjacentHTML('afterend', `<iframe src="${ev.target.result}"></iframe>`);
      // };
      // // @ts-ignore
      // reader.readAsDataURL(file);
    });

    // console.log(files);
  }
}
