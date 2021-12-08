import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LawsuitService } from 'src/app/services/lawsuit.service';
import { PopUpInfoService } from 'src/app/services/pop-up-watch-form.service';

@Component({
  selector: 'app-history-step',
  templateUrl: './history-step.component.html',
  styleUrls: ['./history-step.component.scss'],
})
export class HistoryStepComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private popUpInfoService: PopUpInfoService,
    public lawsuitService: LawsuitService
  ) {}

  ngOnInit(): void {}

  popUpStepInfo(step: any) {
    this.popUpInfoService.openPopUpHistoryStep(true, step);
  }
}
