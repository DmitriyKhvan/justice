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
  show = false;

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
      // this.clientsService
      //   .contractDetails(val.contract)
      //   .subscribe((value) => {
      //     console.log(value);
      //   });
    });

    this.fileUploadService.currentUploaderFiles.subscribe((data) => {
      this.uploadFiles = data;
    });
  }

  ngDoCheck(): void {}

  goToBack(): void {
    this.router.navigate(['clients/list'], {
      queryParams: { mfo: this.route.snapshot.queryParams.mfo },
    });
  }

  showHistory(): void {
    this.router.navigate(['clients/history'], {
      queryParams: { ...this.route.snapshot.queryParams },
    });
  }

  logger(evt: any): void {
    console.log('emitted', evt);
  }
}
