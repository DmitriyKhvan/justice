import { Component, DoCheck, OnInit } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-clients-detail',
  templateUrl: './clients-detail.component.html',
  styleUrls: ['./clients-detail.component.scss'],
})
export class ClientsDetailComponent implements OnInit, DoCheck {
  show = false;

  constructor(
    public clientsService: ClientsService,
    public fileUploadService: FileUploadService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  tasks: Array<any> = [];

  ngOnInit(): void {
    this.route.queryParams.subscribe((val) => {
      this.clientsService.currentStep = val.step;
    });
    this.clientsService.taskList.subscribe((list) => {
      this.tasks = list;
    });

    // this.clientsService.contractDetails(this.route.snapshot.queryParams.contract).subscribe(value => {
    //   this.clientsService.contractInfo.next(value);
    //   this.clientsService.taskList.next(value.tasks.map((el: any) => el.task_step));
    //   this.clientsService.taskList.subscribe(list => {
    //     this.tasks = list;
    //   });
    // });
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

  logger(evt: any): void {}
}
