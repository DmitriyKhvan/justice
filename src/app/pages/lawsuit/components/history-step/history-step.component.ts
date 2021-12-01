import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LawsuitService } from 'src/app/services/lawsuit.service';

@Component({
  selector: 'app-history-step',
  templateUrl: './history-step.component.html',
  styleUrls: ['./history-step.component.scss'],
})
export class HistoryStepComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public lawsuitService: LawsuitService
  ) {}

  ngOnInit(): void {}
}
