import { Component, OnInit } from '@angular/core';
import {MainService} from '../../../../services/main.service';

@Component({
  selector: 'app-outstanding-auction-step',
  templateUrl: './outstanding-auction-step.component.html',
  styleUrls: ['./outstanding-auction-step.component.scss']
})
export class OutstandingAuctionStepComponent implements OnInit {

  constructor(public mainService: MainService) { }

  selectedOpinion: any;

  opinion = [
    { id: 1, label: 'Дело возбуждено' },
    { id: 2, label: 'Отказано в возбуждении' },
  ];

  ngOnInit(): void {
  }

}
