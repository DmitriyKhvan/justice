import {Component, OnInit } from '@angular/core';
import {MainService} from '../../../../services/main.service';
declare var $: any;
@Component({
  selector: 'app-chambers-decision-step',
  templateUrl: './chambers-decision-step.component.html',
  styleUrls: ['./chambers-decision-step.component.scss']
})
export class ChambersDecisionStepComponent implements OnInit {
  constructor(public mainService: MainService) { }

  ngOnInit(): void {}

  logger(evt: any, field: any): void {
    console.log(field, evt);
  }
  logger2(evt: any): void {
    console.log('2', evt);
  }
}
