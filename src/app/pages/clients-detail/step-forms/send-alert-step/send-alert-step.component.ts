import { Component, OnInit } from '@angular/core';
import {FileUploadService} from '../../../../services/file-upload.service';
import {ClientsDetailComponent} from '../../clients-detail.component';

@Component({
  selector: 'app-send-alert-step',
  templateUrl: './send-alert-step.component.html',
  styleUrls: ['./send-alert-step.component.scss']
})
export class SendAlertStepComponent implements OnInit {

  constructor(public fileUploadService: FileUploadService, public clientDetail: ClientsDetailComponent) { }

  ngOnInit(): void {
  }



}
