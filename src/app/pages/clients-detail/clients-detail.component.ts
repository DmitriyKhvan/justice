import { Component, DoCheck, OnInit } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../../services/main.service';

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

  previousUrl = '';
  currentUrl = '';

  constructor(
    public mainService: MainService,
    public fileUploadService: FileUploadService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  uploadFiles!: Array<any>;

  ngOnInit(): void {
    this.fileUploadService.currentUploaderFiles.subscribe((data) => {
      this.uploadFiles = data;
    });

    this.mainService.previousUrl.subscribe((val) => {
      this.previousUrl = val;
    });
    this.mainService.currentUrl.subscribe((val) => {
      this.currentUrl = val;
    });

    $('.outDocDate').datepicker({
      // minDate: new Date(),
      inline: false,
      todayButton: new Date(),
      autoClose: true,
      dateFormat: 'dd.mm.yyyy',
      navTitles: {
        days: 'MM, <span>yyyy</span>',
        months: 'yyyy',
        years: 'yyyy1 - yyyy2'
      }
      // timepicker: true,
      // timeFormat: 'hh:ii AA',
      // onSelect: function onSelect(fd: string, date: any, inst: object): void {
      //   setTaskDeadline(date);
      // },
    });

    // console.log(this.route);
  }

  ngDoCheck(): void {}

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

  goToBack(): void {
    this.router.navigate(['clients/list'], {queryParams: {mfo: this.route.snapshot.queryParams.mfo}});
  }
}
