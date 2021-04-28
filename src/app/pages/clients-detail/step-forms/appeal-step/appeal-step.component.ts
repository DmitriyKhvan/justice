import { Component, OnInit } from '@angular/core';
import {MainService} from '../../../../services/main.service';

@Component({
  selector: 'app-appeal-step',
  templateUrl: './appeal-step.component.html',
  styleUrls: ['./appeal-step.component.scss']
})
export class AppealStepComponent implements OnInit {

  constructor(public mainService: MainService) { }

  selectedOpinion: any;

  opinion = [
    { id: 1, label: 'Одобрить' },
    { id: 2, label: 'Отказать' },
    { id: 3, label: 'Пересмотреть' },
    { id: 4, label: 'Проверить' },
  ];


  ngOnInit(): void {
  }

}
