import { Component, OnInit } from '@angular/core';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import * as moment from 'moment';

@Component({
  selector: 'app-stop-process-message',
  templateUrl: './stop-process-message.component.html',
  styleUrls: ['./stop-process-message.component.scss'],
})
export class StopProcessMessageComponent implements OnInit {
  leftDays!: any;

  constructor(public lawsuitService: LawsuitService) {}

  ngOnInit(): void {
    this.leftDays =
      moment(this.lawsuitService.contract.renewalDate, 'DD.MM.YYYY').diff(
        moment(),
        'days'
      ) + 1;
  }
}
