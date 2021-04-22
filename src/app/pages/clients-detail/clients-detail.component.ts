import {
  ContentChildren,
  QueryList,
  Component,
  DoCheck,
  OnInit, OnChanges, Output, EventEmitter,
} from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';
import {ActivatedRoute, Router, RoutesRecognized} from '@angular/router';
import { MainService } from '../../services/main.service';

declare var $: any;

@Component({
  selector: 'app-clients-detail',
  templateUrl: './clients-detail.component.html',
  styleUrls: ['./clients-detail.component.scss'],
})
export class ClientsDetailComponent implements OnInit, DoCheck {
  currentStep!: any;

  steps!: any;

  show = false;
  counter = 1;

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
    this.route.queryParams.subscribe((val) => {
      this.currentStep = val.step;
    });
    // console.log(this.route);

    this.fileUploadService.currentUploaderFiles.subscribe((data) => {
      this.uploadFiles = data;
    });

    this.mainService.previousUrl.subscribe((val) => {
      this.previousUrl = val;
    });
    this.mainService.currentUrl.subscribe((val) => {
      this.currentUrl = val;
    });

    const steps = document.querySelectorAll('.step');
    this.steps = steps;
    steps.forEach((step, i) => {
      step.setAttribute('stepNumber', String(i + 1));
    });

    // $('.outDocDate').datepicker({
    //   // minDate: new Date(),
    //   inline: false,
    //   todayButton: new Date(),
    //   autoClose: true,
    //   dateFormat: 'dd.mm.yyyy',
    //   navTitles: {
    //     days: 'MM, <span>yyyy</span>',
    //     months: 'yyyy',
    //     years: 'yyyy1 - yyyy2',
    //   },
    //   // timepicker: true,
    //   // timeFormat: 'hh:ii AA',
    //   // onSelect: function onSelect(fd: string, date: any, inst: object): void {
    //   //   setTaskDeadline(date);
    //   // },
    // });

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

  goToBack(): void {
    this.router.navigate(['clients/list'], {
      queryParams: { mfo: this.route.snapshot.queryParams.mfo },
    });
  }

  nextStep(): void {
    this.currentStep++;
    if (this.currentStep > this.steps.length) {
      this.currentStep = this.steps.length;
    }
    this.router.navigate([], {
      queryParams: { ...this.route.snapshot.queryParams, step: this.currentStep },
    });
  }
  prevStep(): void {
    this.currentStep--;
    if (this.currentStep < 1) {
      this.currentStep = 1;
    }
    this.router.navigate([], {
      queryParams: { ...this.route.snapshot.queryParams, step: this.currentStep },
    });
  }

  logger(pld: any): void {
    console.log(pld);
  }
}
