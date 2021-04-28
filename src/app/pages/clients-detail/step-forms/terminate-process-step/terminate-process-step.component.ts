import { Component, OnInit } from '@angular/core';
import {MainService} from '../../../../services/main.service';

@Component({
  selector: 'app-terminate-process-step',
  templateUrl: './terminate-process-step.component.html',
  styleUrls: ['./terminate-process-step.component.scss']
})
export class TerminateProcessStepComponent implements OnInit {

  constructor(public mainService: MainService) { }

  ngOnInit(): void {
  }

}
