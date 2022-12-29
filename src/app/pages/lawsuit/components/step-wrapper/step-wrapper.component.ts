import { Component, OnInit } from '@angular/core';
import { LawsuitService } from 'src/app/services/lawsuit.service';

@Component({
  selector: 'app-step-wrapper',
  templateUrl: './step-wrapper.component.html',
  styleUrls: ['./step-wrapper.component.scss'],
})
export class StepWrapperComponent implements OnInit {
  constructor(public lawsuitService: LawsuitService) {}

  ngOnInit(): void {}
}
