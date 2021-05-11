import {
  ContentChildren,
  QueryList,
  Component,
  DoCheck,
  OnInit,
  OnChanges,
  Output,
  EventEmitter,
  AfterContentInit,
} from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { MainService } from '../../services/main.service';
import { ClientsService } from '../../services/clients.service';
import { StepComponent } from '../../components/stepper/step/step.component';

declare var $: any;

@Component({
  selector: 'app-clients-detail',
  templateUrl: './clients-detail.component.html',
  styleUrls: ['./clients-detail.component.scss'],
})
export class ClientsDetailComponent implements OnInit, DoCheck {
  counter = 1;

  // currentStep!: any;

  // steps!: any;

  show = false;

  // prevUrl: any;
  // currentUrl = '';

  constructor(
    public clientsService: ClientsService,
    public mainService: MainService,
    public fileUploadService: FileUploadService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  uploadFiles!: Array<any>;

  ngOnInit(): void {
    this.route.queryParams.subscribe((val) => {
      this.clientsService.currentStep = val.step;

      this.clientsService
        .contractDetails(val.contract)
        .subscribe((value) => {
          this.router.navigate([], {
            queryParams: {
              ...this.route.snapshot.queryParams,
              step: value.tasks[0].task,
            },
          });
        });
    });
    // console.log(this.route);

    this.fileUploadService.currentUploaderFiles.subscribe((data) => {
      this.uploadFiles = data;
    });

    // this.mainService.previousUrl.subscribe((val) => {
    //   this.prevUrl = val;
    // });
    // this.mainService.currentUrl.subscribe((val) => {
    //   this.currentUrl = val;
    // });

    // const steps = document.querySelectorAll('.step');
    // this.steps = steps;
    // steps.forEach((step, i) => {
    //   step.setAttribute('stepNumber', String(i + 1));
    // });
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

  // nextStep(): void {
  //   if (this.clientsService.currentStep > this.steps.length) {
  //     this.clientsService.currentStep++;
  //     this.clientsService.currentStep = this.steps.length;
  //   }
  //   this.router.navigate([], {
  //     queryParams: {
  //       ...this.route.snapshot.queryParams,
  //       step: this.clientsService.currentStep,
  //     },
  //   });
  // }
  // prevStep(): void {
  //   this.clientsService.currentStep--;
  //   if (this.clientsService.currentStep < 1) {
  //     this.clientsService.currentStep = 1;
  //   }
  //   this.router.navigate([], {
  //     queryParams: {
  //       ...this.route.snapshot.queryParams,
  //       step: this.clientsService.currentStep,
  //     },
  //   });
  // }

  logger(pld: any): void {
    console.log(pld);
  }

  showHistory(): void {
    // console.log(this.route.snapshot.queryParams);

    this.router.navigate(['clients/history'], {
      queryParams: { ...this.route.snapshot.queryParams },
    });
  }
}
