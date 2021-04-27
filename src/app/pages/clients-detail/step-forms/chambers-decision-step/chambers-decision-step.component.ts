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

  selectedOpinion: any;

  opinion = [
    { id: 1, label: 'Одобрить' },
    { id: 2, label: 'Отказать' },
    { id: 3, label: 'Пересмотреть' },
    { id: 4, label: 'Проверить' },
  ];

  ngOnInit(): void {}

  logger(evt: any): void {
    console.log(evt);
  }
}
