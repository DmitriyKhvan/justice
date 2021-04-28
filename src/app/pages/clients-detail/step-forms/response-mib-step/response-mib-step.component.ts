import { Component, OnInit } from '@angular/core';
import {MainService} from '../../../../services/main.service';

@Component({
  selector: 'app-response-mib-step',
  templateUrl: './response-mib-step.component.html',
  styleUrls: ['./response-mib-step.component.scss']
})
export class ResponseMibStepComponent implements OnInit {

  constructor(public mainService: MainService) { }

  selectedOpinion: any;

  opinion = [
    { id: 1, label: 'Дело возбуждено' },
    { id: 2, label: 'Отказано в возбуждении' },
  ];

  ngOnInit(): void {
  }

}
