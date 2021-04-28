import { Component, OnInit } from '@angular/core';
import {MainService} from '../../../../services/main.service';

@Component({
  selector: 'app-accept-property-step',
  templateUrl: './accept-property-step.component.html',
  styleUrls: ['./accept-property-step.component.scss']
})
export class AcceptPropertyStepComponent implements OnInit {

  constructor(public mainService: MainService) { }

  selectedOpinion: any;

  opinion = [
    { id: 1, label: 'Дело возбуждено' },
    { id: 2, label: 'Отказано в возбуждении' },
  ];

  ngOnInit(): void {
  }

}
