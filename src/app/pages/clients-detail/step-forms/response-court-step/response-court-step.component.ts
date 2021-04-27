import { Component, OnInit } from '@angular/core';
import {MainService} from '../../../../services/main.service';

@Component({
  selector: 'app-response-court-step',
  templateUrl: './response-court-step.component.html',
  styleUrls: ['./response-court-step.component.scss']
})
export class ResponseCourtStepComponent implements OnInit {

  constructor(public mainService: MainService) { }

  ngOnInit(): void {
  }

}
