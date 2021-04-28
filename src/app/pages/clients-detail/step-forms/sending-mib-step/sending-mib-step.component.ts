import { Component, OnInit } from '@angular/core';
import {MainService} from '../../../../services/main.service';

@Component({
  selector: 'app-sending-mib-step',
  templateUrl: './sending-mib-step.component.html',
  styleUrls: ['./sending-mib-step.component.scss']
})
export class SendingMibStepComponent implements OnInit {

  constructor(public mainService: MainService) { }

  selectedOpinion: any;

  opinion = [
    { id: 1, label: 'Дело возбуждено' },
    { id: 2, label: 'Отказано в возбуждении' },
    { id: 3, label: 'Пересмотреть' },
    { id: 4, label: 'Проверить' },
  ];

  ngOnInit(): void {
  }

}
