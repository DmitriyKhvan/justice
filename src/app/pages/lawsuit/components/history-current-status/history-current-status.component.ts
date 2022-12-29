import { Component, OnInit } from '@angular/core';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import { PopUpInfoService } from 'src/app/services/pop-up-watch-form.service';

@Component({
  selector: 'app-history-current-status',
  templateUrl: './history-current-status.component.html',
  styleUrls: [
    '../history-actions/history-actions.component.scss',
    './history-current-status.component.scss',
  ],
})
export class HistoryCurrentStatusComponent implements OnInit {
  constructor(
    public lawsuitService: LawsuitService,
    private popUpInfoService: PopUpInfoService
  ) {}

  ngOnInit(): void {}

  popUpStepStatus(statusInfo: any) {
    this.popUpInfoService.popUpStepStatusInfo(true, statusInfo);
  }
}
